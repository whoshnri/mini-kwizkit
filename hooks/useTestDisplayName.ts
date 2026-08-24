"use client";

import { useEffect, useState } from"react";
import { fetchTestForDashBySlug } from"@/app/actions/testOps";

const testNameCache = new Map<string, string>();

export function setCachedTestDisplayName(testSlug: string, testName: string) {
 if (testSlug && testName) {
 testNameCache.set(testSlug, testName);
 }
}

export function useTestDisplayName(testSlug: string | null) {
 const [testName, setTestName] = useState<string | null>(
 testSlug ? testNameCache.get(testSlug) ?? null : null
 );

 useEffect(() => {
 if (!testSlug) {
 setTestName(null);
 return;
 }

 const cached = testNameCache.get(testSlug);
 if (cached) {
 setTestName(cached);
 return;
 }

 let cancelled = false;

 void fetchTestForDashBySlug(testSlug).then((test) => {
 if (cancelled || !test?.name) {
 return;
 }

 testNameCache.set(testSlug, test.name);
 setTestName(test.name);
 });

 return () => {
 cancelled = true;
 };
 }, [testSlug]);

 return testName;
}
