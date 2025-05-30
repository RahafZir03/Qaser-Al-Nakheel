import { MyCarousel } from "../components/atoms/MyCarouselCalling";
import DescriptionWithImage from "../components/molecule/DescriptionWithImage";
import { useTranslation } from "react-i18next";
import resptionImage from "../assets/images/descImage.jpeg";
import RoomAndSuitesSection from "../components/organism/RoomAndSuitesSection";
import { motion } from "framer-motion";
import FacilitiesSection from "../components/organism/FacilitiesSection";
import VideoSection from "../components/organism/VideoSection";
import QuickBookingForm from "../components/organism/QuickBookingForm";

export default function Home() {
  const { t, i18n } = useTranslation("home");
  return (
    <div className=" text-white  bg-back-color">
      <MyCarousel />
      <div className="flex flex-col border-y mt-10 border-white pb-20 max-w-[1300px] mx-auto items-center z-10 justify-center text-white px-10 text-center">
        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-4 mt-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {t("home.title")}
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10"
        >
          <QuickBookingForm locale={i18n.language} />
          {/* my forom for booking in home page */}
        </motion.div>
      </div>
      <DescriptionWithImage
        image={resptionImage}
        title={t("home.resort.title")}
        description={t("home.resort.description")}
        buttonText={t("home.resort.button")}
        buttonLink="/aboutUs"
      />

      <FacilitiesSection />

      <RoomAndSuitesSection />

      <VideoSection />
    </div>
  );
}
