/* eslint-disable react/prop-types */
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const RenderStars = ({ ratingNumber }) => {
  if (typeof ratingNumber !== 'number' || ratingNumber < 0 || ratingNumber > 5) {
    return null;
  }

  const fullStars = Math.floor(ratingNumber);
  const hasHalfStar = ratingNumber % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="text-yellow-500 text-lg" />
      ))}
      {hasHalfStar && <FaRegStarHalfStroke className="text-yellow-500 text-lg" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} className="text-yellow-500 text-lg" />
      ))}
    </div>
  );
};

export default RenderStars;