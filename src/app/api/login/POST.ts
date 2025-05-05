// API endpoint: POST /api/login
export default async function POST({ request }: { request: Request }) {
  const body = await request.text();
  const res = await fetch(`${process.env.CICADA_API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") || "",
    },
    body,
  });
  const text = await res.text();
  const headers = new Headers({ "Content-Type": "application/json" });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) headers.set("Set-Cookie", setCookie);
  return new Response(text, { status: res.status, headers });
}
