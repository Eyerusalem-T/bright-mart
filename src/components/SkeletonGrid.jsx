export default function SkeletonGrid({ count = 8 }) {
  return (
    <div className="b-skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="b-skeleton" key={i} />
      ))}
    </div>
  );
}
