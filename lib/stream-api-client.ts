
type StreamTokenPayload = {
 token: string;
 roomId: string;
 participantId: string;
 name: string;
};

type StreamTokenResponse = {
 status: number;
 message: string;
 metadata: StreamTokenPayload | null;
};

let cachedStudentToken:
 | {
 key: string;
 response: StreamTokenResponse;
 expiresAt: number;
 }
 | null = null;

export async function fetchStudentStreamToken(
 testSlug: string,
 attemptId: string
): Promise<StreamTokenResponse> {
 const cacheKey =`${testSlug}:${attemptId}`;
 if (
 cachedStudentToken?.key === cacheKey &&
 cachedStudentToken.expiresAt > Date.now()
 ) {
 return cachedStudentToken.response;
 }

 const response = await fetch("/api/stream/token/student", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ testSlug, attemptId }),
 cache:"no-store",
 });

 const payload = (await response.json().catch(() => ({
 status: response.status || 500,
 message:"Unexpected API response.",
 metadata: null,
 }))) as StreamTokenResponse;

 if (payload.status === 200 && payload.metadata) {
 cachedStudentToken = {
 key: cacheKey,
 response: payload,
 expiresAt: Date.now() + 45_000,
 };
 }

 return payload;
}

export function clearStudentStreamTokenCache() {
 cachedStudentToken = null;
}
