export function liveStreamRoomId(testId: string) {
 return`test-${testId}`;
}

export function liveStudentParticipantId(studentId: string) {
 return`student-${studentId}`;
}

export function liveProctorParticipantId(userId: string) {
 return`proctor-${userId}`;
}

export function parseStudentIdFromParticipantIdentity(identity: string) {
 if (!identity.startsWith("student-")) return null;
 return identity.slice("student-".length);
}
