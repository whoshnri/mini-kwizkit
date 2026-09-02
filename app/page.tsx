import { redirect } from "next/navigation";
import { RubricButton } from "@/components/site/RubricButton";
import { getSessionUser } from "@/lib/get-session-user";

export default async function HomePage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <section className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          AI-Enabled Online Examination &amp; Proctoring System
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--muted)] sm:text-lg">
          Create and manage online exams, monitor candidates in real time, and
          streamline proctored assessments with confidence.
        </p>
        <div className="mt-8">
          <RubricButton href="/auth" size="lg">
            Continue to login
          </RubricButton>
        </div>
      </section>
    </main>
  );
}
