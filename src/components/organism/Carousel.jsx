import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import familyHall from "../../assets/images/familyHall.jpg";
import companyHall from "../../assets/images/companyHall.jpg";
import { useTranslation } from "react-i18next";

const textContainer = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.3 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const { t } = useTranslation("halls");
  const images = [
    {
      src: familyHall,
      title: t("family.title"),
      subtitle: t("family.subtitle"),
      description: t("family.description"),
      buttonText: t("family.buttonText"),
    },
    {
      src: companyHall,
      title: t("company.title"),
      subtitle: t("company.subtitle"),
      description: t("company.description"),
      buttonText: t("company.buttonText"),
    },
  ];


  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative lg:h-[820px] h-[500px] w-full group px-4 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={clsx(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out",
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          )}
        >
          <img
            src={image.src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />

          <AnimatePresence mode="wait">
            {index === current && (
              <motion.div
                key={index}
                variants={textContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={clsx(
                  "absolute left-10 top-1/4 md:top-1/3 z-30 max-w-md space-y-4",
                  image.darkBackground ? "text-white" : "text-black"
                )}
              >
                <div>
                  <motion.h2
                    variants={textItem}
                    className="text-3xl md:text-4xl font-bold"
                  >
                    {image.title}
                  </motion.h2>
                  <motion.h3
                    variants={textItem}
                    className="text-2xl md:text-4xl font-bold"
                  >
                    {image.subtitle}
                  </motion.h3>
                </div>
                <motion.p
                  variants={textItem}
                  className="text-base md:text-lg text-opacity-80"
                >
                  {image.description}
                </motion.p>
                <motion.button
                  variants={textItem}
                  className={clsx(
                    "border-2 px-8 py-4 mt-4 text-base transition-all duration-300 font-semibold hover:bg-[#BD8448] hover:border-[#BD8448]",
                    image.darkBackground
                      ? "border-white text-white hover:text-black"
                      : "border-black text-black hover:text-white"
                  )}
                >
                  {image.buttonText}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute z-30 bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(
              "w-3 h-3 rounded-full",
              index === current
                ? "bg-white ring-2 ring-[#BD8448]"
                : "bg-gray-400"
            )}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group"
      >
        <span className="p-4 transition-all duration-300 group-hover:bg-black/30 hover:bg-black/70">
          <svg
            className="w-4 h-4 text-white/0 group-hover:text-white/60 hover:text-white transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group"
      >
        <span className="p-4 transition-all duration-300 group-hover:bg-black/30 hover:bg-black/70">
          <svg
            className="w-4 h-4 text-white/0 group-hover:text-white/60 hover:text-white transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
