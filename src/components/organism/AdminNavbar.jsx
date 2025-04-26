/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { TfiMenu } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../features/langData/langSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function AdminNavbar({
  sidebarSize,
  setSidebarSize,
  isHalfScreen,
}) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.lang);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const changeSize = () => {
    setSidebarSize(sidebarSize === "big" ? "small" : "big");
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    dispatch(setLanguage(newLang));
  };

  return (
    <nav
      className={`bg-[#191c24] z-10 h-[70px] w-full flex items-center justify-between fixed shadow-lg shadow-[#22222277] px-4 pr-4 ${
        sidebarSize === "big"
          ? isHalfScreen
            ? ""
            : "clc-width-244"
          : sidebarSize === "small"
          ? isHalfScreen
            ? ""
            : "clc-width-70 "
          : ""
      } transition-all ease-in-out duration-200`}
    >
      <div className="flex items-center gap-6">
        {isHalfScreen && (
          <h1 className="text-gray-100 font-bold px-1 py-1 tracking-wide text-xl md:text-2xl">
            HR
          </h1>
        )}
        <button
          type="button"
          className="text-white text-2xl"
          onClick={changeSize}
        >
          <TfiMenu />
        </button>
      </div>
      <div className="flex justify-center items-center gap-7">
        <Link
          to="/"
          className="text-xl flex items-center gap-3 font-bold text-white hover:text-sec-color transition-colors duration-200"
        >
          <FaArrowRightArrowLeft />
          <span>Home</span>
        </Link>
        <button
          onClick={toggleLanguage}
          className="relative w-24 h-12 bg-gray-700 rounded-full p-1"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            className={`w-10 h-10 rounded-full bg-white hover:bg-sec-color-100 font-bold transition-colors duration-200 hover:text-white text-black flex items-center justify-center shadow-md absolute top-1 ${
              language === "ar" ? "right-1" : "left-1"
            }`}
          >
            {language.toUpperCase()}
          </motion.div>
        </button>
      </div>
    </nav>
  );
}
