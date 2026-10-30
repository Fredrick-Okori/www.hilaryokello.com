// Server-side reCAPTCHA (Google Cloud) verification via the Assessment API.
// Only import from server code: it reads secret environment variables.

const MIN_SCORE = 0.5;

export type RecaptchaResult = { ok: true } | { ok: false; reason: string };

export async function verifyRecaptcha(
  token: string,
  expectedAction: string,
): Promise<RecaptchaResult> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const projectId = process.env.RECAPTCHA_PROJECT_ID;
  const apiKey = process.env.RECAPTCHA_API_KEY;

  if (!siteKey || !projectId || !apiKey) {
    // Lets the forms work locally before keys exist; never in production.
    if (process.env.NODE_ENV !== "production") return { ok: true };

    return { ok: false, reason: "reCAPTCHA is not configured" };
  }

  if (!token) return { ok: false, reason: "missing token" };

  let res: Response;

  try {
    res = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: { token, expectedAction, siteKey } }),
        cache: "no-store",
      },
    );
  } catch {
    return { ok: false, reason: "assessment request failed" };
  }

  if (!res.ok) return { ok: false, reason: `assessment HTTP ${res.status}` };

  const assessment = (await res.json()) as {
    tokenProperties?: { valid?: boolean; action?: string };
    riskAnalysis?: { score?: number };
  };

  if (!assessment.tokenProperties?.valid) {
    return { ok: false, reason: "invalid token" };
  }
  if (assessment.tokenProperties.action !== expectedAction) {
    return { ok: false, reason: "action mismatch" };
  }
  if ((assessment.riskAnalysis?.score ?? 0) < MIN_SCORE) {
    return { ok: false, reason: "low score" };
  }

  return { ok: true };
}
