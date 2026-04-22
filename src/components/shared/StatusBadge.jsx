import "../shared/StatusBadge.css";

export default function StatusBadge({ status }) {
  return (
    <div className={`status-wrapper status-${status.toLowerCase()}`}>
      <div className="status-dot"></div>
      <span>{status}</span>
    </div>
  );
}
