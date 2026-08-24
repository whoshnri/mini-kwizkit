import { headers } from"next/headers";
import { getRubricApiUrl } from"@/lib/rubric-api-url";

export type ApiActionResult<T = null> = {
 status: number;
 message: string;
 metadata: T;
};

async function buildRequestHeaders(
  auth = false,
  contentType = "application/json",
  schoolId?: string
) {
 const requestHeaders: Record<string, string> = {};

 if (contentType) {
 requestHeaders["Content-Type"] = contentType;
 }

 if (schoolId) {
  requestHeaders["x-rubric-school"] = schoolId;
 }

 if (auth) {
 const incoming = await headers();
 const cookie = incoming.get("cookie");
 if (cookie) {
 requestHeaders.Cookie = cookie;
 }
 }

 return requestHeaders;
}

function withSchoolQuery(path: string, schoolId?: string) {
  if (!schoolId) return path;
  return `${path}${path.includes("?") ? "&" : "?"}schoolId=${encodeURIComponent(schoolId)}`;
}

export async function rubricApiFetch<T = any>(
 path: string,
 options: {
 method?:"GET"|"POST"|"DELETE";
 body?: unknown;
 auth?: boolean;
 formData?: FormData;
 schoolId?: string;
 } = {}
): Promise<T> {
 const { method ="GET", body, auth = false, formData, schoolId } = options;

 try {
 const response = await fetch(`${getRubricApiUrl()}${withSchoolQuery(path, schoolId)}`, {
 method,
 headers: await buildRequestHeaders(auth, formData ?"":"application/json", schoolId),
 body: formData ?? (body ? JSON.stringify(body) : undefined),
 cache:"no-store",
 });

 const payload = await response.json().catch(() => null);
 if (!payload || typeof payload !== "object") {
 return { ok: false, error: "Something went wrong. Please try again." } as T;
 }
 return payload as T;
 } catch (error) {
 console.error("[rubric-api-client]", error);
 return { ok: false, error: "Something went wrong. Please try again." } as T;
 }
}

export async function rubricApiRequest<T>(
 path: string,
 options: {
 method?:"GET"|"POST"|"DELETE";
 body?: unknown;
 auth?: boolean;
 } = {}
): Promise<ApiActionResult<T>> {
 const { method ="GET", body, auth = false } = options;

 try {
 const response = await fetch(`${getRubricApiUrl()}${path}`, {
 method,
 headers: await buildRequestHeaders(auth),
 body: body ? JSON.stringify(body) : undefined,
 cache:"no-store",
 });

 const payload = (await response.json().catch(() => null)) as ApiActionResult<T> | null;

 if (!payload || typeof payload.status !=="number") {
 return {
 status: response.status || 500,
 message:"Unexpected API response.",
 metadata: null as T,
 };
 }

 return payload;
 } catch {
 return {
 status: 503,
 message:`Rubric API is unavailable at ${getRubricApiUrl()}. Start rubric-api and retry.`,
 metadata: null as T,
 };
 }
}

export async function rubricApiGet<T>(path: string, auth = false) {
 return rubricApiRequest<T>(path, { method:"GET", auth });
}

export async function rubricApiPost<T>(
 path: string,
 body: unknown,
 auth = false
) {
 return rubricApiRequest<T>(path, { method:"POST", body, auth });
}

export async function rubricApiFormData<T>(
 path: string,
 formData: FormData,
 auth = true,
 schoolId?: string
) {
 return rubricApiFetch<T>(path, { method:"POST", formData, auth, schoolId });
}
