import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] py-16">
      <div className="max-w-lg px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--rubric-muted)]">
          404
        </p>
        <h1 className="text-4xl font-semibold text-[var(--foreground)]">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-[var(--muted)]">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/auth" className="rubric-button-primary mt-8 inline-flex">
          Go to sign in
        </Link>
      </div>
    </div>
  );
}
