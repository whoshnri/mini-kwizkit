"use client";

import { useState } from "react";
import { PiMagnifyingGlass, PiPlus } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/app/SessionContext";
import { Test } from "@/lib/test";
import NewTest from "./components/NewTest";
import SettingsModal from "./components/SettingsModal";
import TestCard from "./tests/components/TestCard";
import SkeletonLoader from "./tests/components/SkeletonLoader";
import ErrorDisplay from "./tests/components/ErrorDisplay";
import { toast } from "react-hot-toast";
import EmptyState from "./tests/components/EmptyState";
import DeleteModal from "./tests/components/DeleteModal";
import { deleteTest } from "@/app/actions/testOps";
import { fetchTests } from "@/app/actions/fetchUserTests";
import { DashboardButton, DashboardField, fieldClass } from "./components/primitives";
import { DashboardSelect } from "./components/DashboardDropdown";

function getSubjectName(test: Test) {
  if (typeof test.subject === "string") return test.subject;
  return test.subjectName || test.subject?.name || "";
}

function testsFromResponse(res: unknown): Test[] {
  if (Array.isArray(res)) return res as Test[];
  if (res && typeof res === "object" && "tests" in res) {
    const tests = (res as { tests?: Test[] }).tests;
    return Array.isArray(tests) ? tests : [];
  }
  return [];
}

export default function TestList() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isNewTestModalOpen, setNewTestModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { session, loading: sessionLoading } = useSession();
  const {
    data: tests = [],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["userTests", session?.id],
    enabled: Boolean(session?.id),
    queryFn: async () => {
      const res = await fetchTests(session!.id);
      if (res && typeof res === "object" && "error" in res && (res as { error?: string }).error) {
        throw new Error(String((res as { error: string }).error));
      }
      return testsFromResponse(res);
    },
  });
  const error = queryError ? (queryError as Error).message : "";

  const handleDelete = async () => {
    if (!selectedTestId) return;
    setDeleting(true);
    const res = await deleteTest(selectedTestId);
    setDeleting(false);
    if (res.status === 200) {
      toast.success("Test deleted successfully!");
      setDeleteModalOpen(false);
      await refetch();
    } else {
      toast.error("Failed to delete test.");
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedTestId(id);
    setDeleteModalOpen(true);
  };

  const openSettingsModal = (id: string) => {
    setSelectedTestId(id);
    setSettingsModalOpen(true);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedTestId("");
  };

  const filteredTests = tests.filter(
    (test) =>
      (test.name.toLowerCase().includes(search.toLowerCase()) ||
        getSubjectName(test).toLowerCase().includes(search.toLowerCase())) &&
      (filter === "all" || test.difficulty === filter)
  );

  if (sessionLoading || !session?.id || loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="space-y-8 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">AI-Powered Online Examination and AI-Proctoring System</h1>
          <p className="mt-1 text-sm text-[var(--rubric-muted)]">
            Create, share, and proctor assessments.
          </p>
        </div>
        <DashboardButton onClick={() => setNewTestModalOpen(true)}>
          <PiPlus className="h-5 w-5" />
          New test
        </DashboardButton>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardField label="Search">
          <div className="relative">
            <PiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--rubric-muted)]" />
            <input
              type="text"
              placeholder="Search tests or subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${fieldClass} pl-12`}
            />
          </div>
        </DashboardField>
        <DashboardField label="Difficulty">
          <DashboardSelect
            value={filter}
            onValueChange={setFilter}
            options={[
              { value: "all", label: "All difficulty" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />
        </DashboardField>
      </section>

      {filteredTests.length === 0 ? (
        <EmptyState
          hasTests={tests.length > 0}
          onCreate={() => setNewTestModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTests.map((test, index) => (
            <TestCard
              key={test.id}
              test={test}
              index={index}
              onSettingsClick={openSettingsModal}
              onDeleteClick={openDeleteModal}
            />
          ))}
        </div>
      )}

      {isNewTestModalOpen && (
        <NewTest
          setNewTest={setNewTestModalOpen}
          onCreated={() => {
            void refetch();
          }}
        />
      )}
      {isSettingsModalOpen && (
        <SettingsModal
          testId={selectedTestId}
          setShowSettingsModal={setSettingsModalOpen}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onDelete={handleDelete}
        deleting={deleting}
      />
    </div>
  );
}
