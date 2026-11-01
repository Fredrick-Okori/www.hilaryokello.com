// Server-only: WhatsApp Business (Meta Cloud API) messages sent from the
// booking number. Business-initiated messages must use a template approved
// in WhatsApp Manager; see WHATSAPP_* in .env.example.

const GRAPH_VERSION = "v21.0";

export type WhatsAppResult = "sent" | "not_configured" | `failed: ${string}`;

// Sends the "booking received" template to `to` (digits incl. country code).
// Template body parameters, in order: name, event type, event date.
export async function sendBookingConfirmation(
  to: string,
  params: { name: string; eventType: string; date: string },
): Promise<WhatsAppResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const template = process.env.WHATSAPP_BOOKING_TEMPLATE || "booking_received";
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";

  if (!token || !phoneNumberId) return "not_configured";

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to.replace(/\D/g, ""),
          type: "template",
          template: {
            name: template,
            language: { code: language },
            components: [
              {
                type: "body",
                parameters: [params.name, params.eventType, params.date].map(
                  (text) => ({ type: "text", text }),
                ),
              },
            ],
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );

    if (res.ok) return "sent";
    const body = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;

    return `failed: ${body?.error?.message ?? `HTTP ${res.status}`}`.slice(
      0,
      300,
    ) as WhatsAppResult;
  } catch (err) {
    return `failed: ${err instanceof Error ? err.message : "request error"}`;
  }
}
