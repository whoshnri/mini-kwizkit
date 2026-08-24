import { FileText } from"lucide-react";

type EmptyStateProps = {
 hasTests: boolean;
 onCreate: () => void;
};

const EmptyState = ({ hasTests, onCreate }: EmptyStateProps) => (
 <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] py-16 text-center">
 <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)]">
 <FileText size={40} className="text-[var(--rubric-muted)]"/>
 </div>
 <h3 className="mb-2 text-lg font-medium text-[var(--foreground)]">
 {hasTests ?"No tests match your search":"No CBT tests yet"}
 </h3>
 <p className="mb-6 text-sm text-[var(--muted)]">
 {hasTests
 ?"Try a different name, subject, or difficulty"
 :"Create a test, invite participants by email, or share an open link."}
 </p>
 {!hasTests && (
 <button onClick={onCreate} className="rubric-button-primary mx-auto">
 Create first test
 </button>
 )}
 </div>
);

export default EmptyState;