/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const AuthButton = ({ label, icon: Icon, roundedPosition, to, onClick }) => {
  // Determine rounded corners based on position and RTL
  const roundedClass = (() => {
    if (roundedPosition === "left") {
      return "rounded-s-lg rounded-e-none";
    }
    if (roundedPosition === "right") {
      return "rounded-e-lg rounded-s-none";
    }
    return "rounded-lg";
  })();

  const baseClasses = `
    group flex items-center gap-3 px-4 py-3 bg-white text-my-color 
    hover:text-white font-semibold ${roundedClass} relative 
    duration-300 overflow-hidden border border-gray-200
    hover:border-transparent shadow-sm hover:shadow-md
    transition-all
  `;

  const backgroundClasses = `
    absolute bg-sec-color-100 w-0 h-full top-0
    ${roundedPosition === "left" ? "end-0" : "start-0"} 
    group-hover:w-full opacity-0 group-hover:opacity-100 
    transition-all duration-500
  `;

  const content = (
    <>
      {/* Animated background */}
      <div className={backgroundClasses}></div>

      {/* Content */}
      <p className="z-10 font-bold whitespace-nowrap">{label}</p>
      <Icon className="w-5 h-5 min-w-5 min-h-5 z-10" />
    </>
  );

  return onClick ? (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  ) : (
    <Link to={to} className={baseClasses}>
      {content}
    </Link>
  );
};

export default AuthButton;
