"use client";

import { type RefObject, useEffect } from"react";

export function useChatAutoScroll(
 containerRef: RefObject<HTMLElement | null>,
 scrollKey: string | number | null | undefined,
 position:"top"|"bottom"="bottom"
) {
 useEffect(() => {
 if (scrollKey === null || scrollKey === undefined) {
 return;
 }

 const node = containerRef.current;
 if (!node) {
 return;
 }

 const frame = requestAnimationFrame(() => {
 node.scrollTop = position ==="top"? 0 : node.scrollHeight;
 });

 return () => cancelAnimationFrame(frame);
 }, [containerRef, scrollKey, position]);
}
