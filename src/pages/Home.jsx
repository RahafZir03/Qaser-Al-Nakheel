import { MyCarousel } from "../components/atoms/MyCarouselCalling";
import DescriptionWithImage from "../components/molecule/DescriptionWithImage";
import { useTranslation } from "react-i18next";
import resptionImage from "../assets/images/descImage.jpeg";
import RoomAndSuitesSection from "../components/organism/RoomAndSuitesSection";

import FacilitiesSection from "../components/organism/FacilitiesSection";
import VideoSection from "../components/organism/VideoSection";
export default function Home() {
  const { t } = useTranslation("home");
  return (
    <div className=" text-white  bg-back-color">
      <MyCarousel />

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
