// New API route: POST /api/token -> proxy to backend
export async function POST({ request }: { request: Request }) {
  const body = await request.text();
  const res = await fetch(`${process.env.CICADA_API_URL}/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") || "",
    },
    body,
  });
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
