import { ProjectStatus, statusClass, statusLabel } from "@/lib/projects";

export default function StatusTag({ status }: { status: ProjectStatus }) {
  return (
    <span className={`tag ${statusClass[status]}`}>
      <span className="dot" />
      {statusLabel[status]}
    </span>
  );
}
