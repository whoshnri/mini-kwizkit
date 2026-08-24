import { getRubricApiUrl } from "@/lib/rubric-api-url";

export async function proxyAuthRequest(request: Request, pathname?: string) {
  const incoming = new URL(request.url);
  const path = pathname ?? incoming.pathname;
  const upstream = `${getRubricApiUrl()}${path}${incoming.search}`;

  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  const contentType = request.headers.get("content-type");
  const origin = request.headers.get("origin");
  const authorization = request.headers.get("authorization");

  if (cookie) headers.set("cookie", cookie);
  if (contentType) headers.set("content-type", contentType);
  if (origin) headers.set("origin", origin);
  if (authorization) headers.set("authorization", authorization);
  headers.set("x-forwarded-host", incoming.host);
  headers.set("x-forwarded-proto", incoming.protocol.replace(":", ""));

  const method = request.method.toUpperCase();
  const body =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

  const response = await fetch(upstream, {
    method,
    headers,
    body,
    redirect: "manual",
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
