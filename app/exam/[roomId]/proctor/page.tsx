import { redirect } from"next/navigation";

export default async function LegacyExamProctorPage({
 params,
}: {
 params: Promise<{ roomId: string }>;
}) {
 const { roomId } = await params;
 redirect(`/live/${roomId}/proctor`);
}
