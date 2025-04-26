import { useTranslation } from "react-i18next";
import video from "../../assets/videos/qasr_Alnahkeel.mp4";
export default function VideoSection() {
  const { t } = useTranslation("home");
  return (
    <div className="flex flex-col items-center text-center mt-32 max-w-[1300px] mx-auto px-4 pb-32">
      <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">
        {t("home.videoSection.title")}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
        {t("home.videoSection.description")}
      </p>

      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700 transition-all">
        <video
          controls
          className="w-full h-auto object-cover hover:brightness-110 duration-300"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
