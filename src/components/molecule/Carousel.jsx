/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkButton from "../atoms/LinkButton";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      <div className="relative h-[700px] overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full object-cover"
          >
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${currentIndex}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center z-10 justify-center text-white px-4 text-center">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {slides[currentIndex].text}
              </motion.h2>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-4 max-w-4xl mt-7 text-xl"
              >
                {slides[currentIndex].description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-10"
              >
                <LinkButton
                  link={slides[currentIndex].link}
                  text={slides[currentIndex].buttonText}
                  size="large"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none"
      >
        <svg
          className="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 6 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none"
      >
        <svg
          className="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 6 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
