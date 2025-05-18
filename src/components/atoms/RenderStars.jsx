/* eslint-disable react/prop-types */
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const RenderStars = ({ ratingNumber, size = "small" }) => {
  const rating = parseFloat(ratingNumber);

  if (isNaN(rating) || rating < 0 || rating > 5) {
    return null;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // تحديد الكلاس بناءً على الحجم
  const iconSizeClass = size === "big" ? "text-2xl" : "text-lg";

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar
          key={`full-${i}`}
          className={`text-yellow-500 ${iconSizeClass}`}
        />
      ))}
      {hasHalfStar && (
        <FaRegStarHalfStroke className={`text-yellow-500 ${iconSizeClass}`} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar
          key={`empty-${i}`}
          className={`text-yellow-500 ${iconSizeClass}`}
        />
      ))}
    </div>
  );
};

export default RenderStars;
