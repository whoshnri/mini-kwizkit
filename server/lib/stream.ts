export const PAGE_SIZE = 9;

export function isValidStreamRoomId(roomId: string) {
  return /^test-[a-z0-9_-]+$/i.test(roomId);
}

export function isValidParticipantId(participantId: string, role: "student" | "proctor") {
  if (role === "student") {
    return /^student-[a-z0-9_-]+$/i.test(participantId);
  }
  return /^proctor-[a-z0-9_-]+$/i.test(participantId);
}

export function liveStreamRoomId(testId: string) {
  return `test-${testId}`;
}

export function liveStudentParticipantId(studentId: string) {
  return `student-${studentId}`;
}

export function liveProctorParticipantId(userId: string) {
  return `proctor-${userId}`;
}

export function parseStudentIdFromParticipantIdentity(identity: string) {
  if (!identity.startsWith("student-")) return null;
  return identity.slice("student-".length);
}
