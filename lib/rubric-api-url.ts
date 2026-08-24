export function getRubricApiUrl() {
 return (
 process.env.RUBRIC_API_URL ??
 process.env.API_URL ??
 process.env.STREAM_API_URL ??
"http://localhost:3001"
 );
}

export function getPublicRubricApiUrl() {
 return (
 process.env.NEXT_PUBLIC_RUBRIC_API_URL ??
 process.env.NEXT_PUBLIC_API_URL ??
 process.env.NEXT_PUBLIC_WS_URL?.replace(/^ws/i,"http") ??
"http://localhost:3001"
 );
}

export function getRubricWsUrl() {
 return getPublicRubricApiUrl().replace(/^http/i,"ws");
}
