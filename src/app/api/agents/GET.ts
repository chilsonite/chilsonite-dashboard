// API endpoint: GET /api/agents
export default async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const query = url.search;
  const res = await fetch(`${process.env.CICADA_API_URL}/api/agents${query}`, {
    headers: { Cookie: request.headers.get("cookie") || "" },
  });
  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
