/* eslint-disable react/prop-types */
import { LuExternalLink } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function LinkButton({ link, text, size }) {
  const sizeClass =
    size === "large" ? " text-xl px-8 py-3" : "text-base px-5 py-3";
  return (
    <Link
      to={link}
      className={`${sizeClass} group max-w-fit flex justify-center items-center gap-2 bg-sec-color-100 hover:bg-sec-color-200 hover:text-black text-gray-100 font-semibold rounded transition`}
    >
      {text}
      <LuExternalLink className="rotate-90 group-hover:-rotate-90 transition duration-100" />
    </Link>
  );
}
