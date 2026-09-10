export default function EmptyState({ icon, title, message, compact = false }) {
  return (
    <div className="b-empty" style={compact ? { padding: "50px 10px" } : undefined}>
      <div className="b-empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
