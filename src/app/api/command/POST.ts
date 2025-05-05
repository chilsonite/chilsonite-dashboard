// New API route: POST /api/command -> proxy SSE to backend
export async function POST({ request }: { request: Request }) {
  const body = await request.text();
  const upstream = await fetch(`${process.env.CICADA_API_URL}/api/command`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") || "",
    },
    body,
  });
  // Forward status and headers (including SSE content-type)
  const headers = new Headers(upstream.headers);
  return new Response(upstream.body, { status: upstream.status, headers });
}
