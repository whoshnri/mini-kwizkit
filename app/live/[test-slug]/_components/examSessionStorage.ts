type StoredExamProgress = {
 attemptId: string;
 answers: Record<string, string | number | null>;
 flagged: string[];
 currentIndex: number;
 savedAt: string;
};

function storageKey(testSlug: string) {
 return`liveExamProgress:${testSlug}`;
}

export function readExamProgress(testSlug: string, attemptId: string) {
 if (typeof window ==="undefined") return null;

 const raw = window.localStorage.getItem(storageKey(testSlug));
 if (!raw) return null;

 try {
 const parsed = JSON.parse(raw) as StoredExamProgress;
 if (parsed.attemptId !== attemptId) return null;
 return parsed;
 } catch {
 return null;
 }
}

export function writeExamProgress(testSlug: string, progress: StoredExamProgress) {
 if (typeof window ==="undefined") return;
 window.localStorage.setItem(storageKey(testSlug), JSON.stringify(progress));
}

export function clearExamProgress(testSlug: string) {
 if (typeof window ==="undefined") return;
 window.localStorage.removeItem(storageKey(testSlug));
}
