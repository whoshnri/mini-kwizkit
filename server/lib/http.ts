export async function readBody<T>(request: Request): Promise<T> {
  return (await request.json().catch(() => ({}))) as T;
}

export function asJson(result: { status: number; message: string; metadata?: unknown }, httpStatus?: number) {
  return Response.json(result, { status: httpStatus ?? 200 });
}
