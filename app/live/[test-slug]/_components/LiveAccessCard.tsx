"use client";

import Image from "next/image";
import {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { PiEnvelopeSimple } from "react-icons/pi";
import {
  requestLiveAccessOtp,
  verifyLiveAccessOtp,
} from "@/app/actions/liveTestOps";
import { ArrowLeftIcon } from "@phosphor-icons/react";

type LiveAccessCardProps = {
  testSlug: string;
  test: {
    name: string;
    description: string | null;
    subject: string;
    questionsCount: number;
    duration: number;
    ownerName: string;
    requiresAccessPassword: boolean;
  };
};

export default function LiveAccessCard({ testSlug, test }: LiveAccessCardProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [accessPassword, setAccessPassword] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      if (step === "email") {
        const response = await requestLiveAccessOtp(testSlug, email);

        if (response.status !== 200) {
          setError(response.message);
          return;
        }

        setEmail(response.metadata.email);
        setStep("otp");
        setMessage(response.message);
        return;
      }

      if (test.requiresAccessPassword && !accessPassword.trim()) {
        setError("Enter the access password for this test.");
        return;
      }

      const response = await verifyLiveAccessOtp(
        testSlug,
        email,
        otp,
        test.requiresAccessPassword ? accessPassword : undefined
      );

      if (response.status !== 200 || !response.metadata) {
        setError(response.message);
        return;
      }

      window.localStorage.setItem(
        `liveAttempt:${testSlug}`,
        JSON.stringify({
          attemptId: response.metadata.attemptId,
          studentId: response.metadata.studentId,
          email: response.metadata.email,
          studentName: response.metadata.studentName,
          verifiedAt: new Date().toISOString(),
        })
      );

      router.push(`/live/${testSlug}/setup`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] p-4 text-[var(--foreground)]">
      <section className="w-full max-w-lg rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-sm md:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Image
            src="/logo.svg"
            alt="Rubric"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
            {step === "email" ? 1 : 2} of 2
          </span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2">
          {["Email", "Code"].map((label, index) => {
            const activeIndex = step === "email" ? 0 : 1;
            const isActive = index === activeIndex;
            const isDone = index < activeIndex;
            return (
              <div
                key={label}
                className={`h-1.5 rounded-full ${
                  isActive || isDone
                    ? "bg-[var(--foreground)]"
                    : "bg-[var(--border)]"
                }`}
                aria-label={`${label} step`}
              />
            );
          })}
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
            {test.name}
          </h1>
          <p className="mt-2 text-base text-[var(--muted)]">
            Authenticate your attempt to continue.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 transition-shadow hover:shadow-sm">
          <p className="text-base font-semibold text-[var(--foreground)]">
            {test.subject}
          </p>

          {test.description && (
            <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
              {test.description}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-xl bg-[var(--surface-strong)] p-3">
              <p className="font-semibold text-[var(--foreground)]">
                {test.questionsCount}
              </p>
              <p className="mt-1 text-xs text-[var(--rubric-muted)]">Questions</p>
            </div>
            <div className="rounded-xl bg-[var(--surface-strong)] p-3">
              <p className="font-semibold text-[var(--foreground)]">
                {test.duration > 0 ? test.duration : "—"}
              </p>
              <p className="mt-1 text-xs text-[var(--rubric-muted)]">
                {test.duration > 0 ? "Minutes" : "Untimed"}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {step === "email" ? (
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[var(--rubric-muted)]">
                Email address
              </span>
              <div className="relative">
                <PiEnvelopeSimple className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--rubric-muted)]" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--background)] px-4 pl-12 text-lg text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                  placeholder="student@example.com"
                />
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <OtpInput value={otp} onChange={setOtp} />
              {test.requiresAccessPassword && (
                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-[var(--rubric-muted)]">
                    Access password
                  </span>
                  <input
                    required
                    type="password"
                    value={accessPassword}
                    onChange={(event) => setAccessPassword(event.target.value)}
                    className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--background)] px-4 text-lg text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
                    placeholder="Enter test password"
                    autoComplete="off"
                  />
                </label>
              )}
            </div>
          )}

          {message && (
            <p className="text-center text-sm text-[var(--muted)]">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center text-sm text-[var(--rubric-danger)]">
              {error}
            </p>
          )}

          <div className="flex items-center gap-2">
            {step === "otp" && (
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setMessage(null);
                  setError(null);
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-2 text-[var(--muted)] transition hover:border-[var(--foreground)]/25 hover:text-[var(--foreground)]"
              >
                <ArrowLeftIcon size={28} />
              </button>
            )}
            <button
              disabled={submitting || (step === "otp" && otp.length < 6)}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Checking..."
                : step === "email"
                  ? "Continue"
                  : "Verify and continue"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? "");

  function setDigit(index: number, digit: string) {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join("").slice(0, 6));

    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  }

  return (
    <div className="mx-auto grid max-w-fit grid-cols-6 gap-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          aria-label={`Digit ${index + 1}`}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          value={digit}
          onPaste={handlePaste}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onChange={(event) => {
            const nextDigit = event.target.value.replace(/\D/g, "").slice(-1);
            setDigit(index, nextDigit);
          }}
          className="h-12 w-12 rounded-full border border-[var(--border)] bg-[var(--background)] text-center text-lg font-semibold text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
        />
      ))}
    </div>
  );
}
