import { notFound, redirect } from"next/navigation";
import { getProctorMonitorContext } from"@/app/actions/streamOps";
import { getSessionUser } from"@/lib/get-session-user";
import LiveProctorClient from"./LiveProctorClient";

export default async function LiveProctorPage({
 params,
}: {
 params: Promise<{"test-slug": string }>;
}) {
 const {"test-slug": testSlug } = await params;
 const context = await getProctorMonitorContext(testSlug);

 if (!context) {
 const user = await getSessionUser();
 if (!user) {
 redirect(`/auth?next=${encodeURIComponent(`/live/${testSlug}/proctor`)}`);
 }
 notFound();
 }

 return (
 <LiveProctorClient
 testSlug={context.test.slug}
 testName={context.test.name}
 subjectName={context.test.subject?.name ??"No subject"}
 durationMinutes={context.test.duration ?? 0}
 roomId={context.roomId}
 participantId={context.participantId}
 proctorName={context.proctor.name}
 requireWebcam={context.requireWebcam ?? context.test.requireWebcam ?? false}
 requireMic={context.requireMic ?? context.test.requireMic ?? false}
 />
 );
}
