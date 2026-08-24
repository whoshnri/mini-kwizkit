export type ActionResult<T = null> = {
  status: number;
  message: string;
  metadata: T;
};

export function ok<T>(message: string, metadata: T, status = 200): ActionResult<T> {
  return { status, message, metadata };
}

export function fail<T = null>(
  status: number,
  message: string,
  metadata: T = null as T
): ActionResult<T> {
  return { status, message, metadata };
}
