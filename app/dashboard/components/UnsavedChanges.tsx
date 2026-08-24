"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  ConfirmationDialog,
  DashboardButton,
} from "@/app/dashboard/components/primitives";

type PendingNavigation =
  | { kind: "href"; href: string }
  | { kind: "reload" }
  | { kind: "action"; run: () => void }
  | null;

type SourceEntry = {
  dirty: boolean;
  onLeave?: () => void;
};

type UnsavedChangesContextValue = {
  isDirty: boolean;
  requestNavigate: (href: string) => void;
  confirmIfDirty: (action: () => void) => void;
  setSource: (id: string, entry: SourceEntry | null) => void;
};

const UnsavedChangesContext = createContext<UnsavedChangesContextValue | null>(
  null
);

function sameLocation(href: string) {
  const next = new URL(href, window.location.href);
  return (
    next.origin === window.location.origin &&
    next.pathname === window.location.pathname &&
    next.search === window.location.search &&
    next.hash === window.location.hash
  );
}

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function UnsavedChangesProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const sourcesRef = useRef(new Map<string, SourceEntry>());
  const allowNavRef = useRef(false);
  const [isDirty, setIsDirty] = useState(false);
  const [pending, setPending] = useState<PendingNavigation>(null);

  const refreshDirty = useCallback(() => {
    setIsDirty([...sourcesRef.current.values()].some((entry) => entry.dirty));
  }, []);

  const setSource = useCallback(
    (id: string, entry: SourceEntry | null) => {
      if (!entry) sourcesRef.current.delete(id);
      else sourcesRef.current.set(id, entry);
      refreshDirty();
    },
    [refreshDirty]
  );

  const discardSources = useCallback(() => {
    for (const entry of sourcesRef.current.values()) {
      entry.onLeave?.();
    }
    sourcesRef.current.clear();
    setIsDirty(false);
    setPending(null);
  }, []);

  const leaveAndGo = useCallback(
    (next: PendingNavigation) => {
      discardSources();
      allowNavRef.current = true;
      if (next?.kind === "action") {
        next.run();
        return;
      }
      if (next?.kind === "reload") {
        window.location.reload();
        return;
      }
      if (next?.kind === "href") {
        router.push(next.href);
      }
    },
    [discardSources, router]
  );

  const requestNavigate = useCallback(
    (href: string) => {
      if (allowNavRef.current || !isDirty || sameLocation(href)) {
        allowNavRef.current = false;
        router.push(href);
        return;
      }
      setPending({ kind: "href", href });
    },
    [isDirty, router]
  );

  const confirmIfDirty = useCallback(
    (action: () => void) => {
      if (!isDirty) {
        action();
        return;
      }
      setPending({ kind: "action", run: action });
    },
    [isDirty]
  );

  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty || allowNavRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!isDirty || allowNavRef.current) return;
      if (event.defaultPrevented || event.button !== 0) return;
      if (isModifiedClick(event)) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const href = `${url.pathname}${url.search}${url.hash}`;
      if (sameLocation(href)) return;

      event.preventDefault();
      event.stopPropagation();
      setPending({ kind: "href", href });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [isDirty]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!isDirty || allowNavRef.current || event.defaultPrevented) return;
      const isReloadKey =
        event.key === "F5" ||
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r");
      if (!isReloadKey) return;
      event.preventDefault();
      setPending({ kind: "reload" });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDirty]);

  return (
    <UnsavedChangesContext.Provider
      value={{ isDirty, requestNavigate, confirmIfDirty, setSource }}
    >
      {children}
      {pending && (
        <ConfirmationDialog
          title={
            pending.kind === "reload"
              ? "Reload without saving?"
              : "Leave without saving?"
          }
          description="You have unsaved changes. If you continue, those edits will be discarded."
          onClose={() => setPending(null)}
          footer={
            <>
              <DashboardButton
                variant="secondary"
                onClick={() => setPending(null)}
                className="flex-1"
              >
                Stay
              </DashboardButton>
              <DashboardButton
                variant="danger"
                onClick={() => leaveAndGo(pending)}
                className="flex-1"
              >
                {pending.kind === "reload" ? "Reload" : "Leave"}
              </DashboardButton>
            </>
          }
        />
      )}
    </UnsavedChangesContext.Provider>
  );
}

export function useUnsavedChanges(
  isDirty: boolean,
  options?: { onLeave?: () => void }
) {
  const id = useId();
  const context = useContext(UnsavedChangesContext);
  const onLeaveRef = useRef(options?.onLeave);
  onLeaveRef.current = options?.onLeave;

  useEffect(() => {
    if (!context) return;
    context.setSource(id, {
      dirty: isDirty,
      onLeave: () => onLeaveRef.current?.(),
    });
    return () => context.setSource(id, null);
  }, [context, id, isDirty]);
}

export function useRequestNavigate() {
  const context = useContext(UnsavedChangesContext);
  const router = useRouter();
  return context?.requestNavigate ?? ((href: string) => router.push(href));
}

export function useUnsavedGuard() {
  const context = useContext(UnsavedChangesContext);
  return {
    isDirty: context?.isDirty ?? false,
    confirmIfDirty: context?.confirmIfDirty ?? ((action: () => void) => action()),
  };
}
