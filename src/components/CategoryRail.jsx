export default function CategoryRail({ categories, activeCategory, onSelect }) {
  return (
    <div className="b-categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`b-chip ${activeCategory === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat === "all" ? "All items" : cat}
        </button>
      ))}
    </div>
  );
}
