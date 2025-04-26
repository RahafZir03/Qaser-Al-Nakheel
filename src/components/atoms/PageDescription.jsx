/* eslint-disable react/prop-types */

import i18next from "i18next";
import { FaArrowRight } from "react-icons/fa";

export default function PageDescription({ title, description, targetRef }) {
  const handleClick = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="px-5 py-20 flex text-center text-white flex-col justify-center items-center gap-10 bg-my-color">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg font-normal max-w-5xl">{description}</p>
      <button
        onClick={handleClick}
        className="group text-xl px-8 py-3 max-w-fit flex justify-center items-center gap-2 bg-sec-color-100 hover:bg-sec-color-200 hover:text-black text-gray-100 font-semibold rounded transition"
      >
        {i18next.language === "en" ? "View our halls" : "استعرض قاعاتنا"}
        <FaArrowRight className="group-hover:rotate-90 transition duration-100" />
      </button>
    </div>
  );
}
