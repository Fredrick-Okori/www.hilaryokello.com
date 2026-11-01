// Receives Content-Security-Policy violation reports (see next.config.js) and
// logs them to the Vercel function logs.
export async function POST(request: Request) {
  const body = await request.text().catch(() => "");

  console.warn("[csp-report]", body.slice(0, 2000));

  return new Response(null, { status: 204 });
}
