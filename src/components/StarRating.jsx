import { Star } from "lucide-react";

export default function StarRating({ rating = 0, count }) {
  const full = Math.round(rating);
  return (
    <span className="star-row">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} strokeWidth={0} fill={i < full ? "#ff8a3d" : "#e6e6e6"} />
      ))}
      {count != null && <span className="star-count">({count})</span>}
    </span>
  );
}
