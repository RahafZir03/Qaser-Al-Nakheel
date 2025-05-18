import { useState } from "react";
import video from "../../assets/videos/qasr_Alnahkeel.mp4";
import backgroundImage from "../../assets/images/Video-banner.jpg"; // الصورة التي تشبه التصميم
import i18next from "i18next";

export default function HeroVideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-[100vh] w-full bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-30 transition mb-6"
          aria-label="Play Video"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-3xl md:text-6xl font-bold drop-shadow-lg">
          {i18next.language === "en"
            ? "Experience Our Hotel Amenities"
            : "استمتع بمرافق فندقنا"}
        </h2>
      </div>
      {isOpen && (
        <div
          className=" absolute top-0 inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-7xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              className="w-full h-full rounded shadow-2xl"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-10 aspect-square bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-2 rounded-full shadow-md"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
