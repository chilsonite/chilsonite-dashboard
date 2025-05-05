// API endpoint: GET /api/me
export default async function GET({ request }: { request: Request }) {
  const res = await fetch(`${process.env.CICADA_API_URL}/api/me`, {
    headers: { Cookie: request.headers.get("cookie") || "" },
  });
  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
