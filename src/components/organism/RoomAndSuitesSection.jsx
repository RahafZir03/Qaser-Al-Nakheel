import { useEffect, useState } from "react";
import { getRoomsAndSuites } from "../../api/endpoints/mainPages";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../molecule/ImageCarousel";
import LinkButton from "../atoms/LinkButton";

export default function RoomAndSuitesSection() {
  const { t } = useTranslation("home");
  const [roomsImages, setRoomsImages] = useState([]);

  useEffect(() => {
    const fetchRoomsImages = async () => {
      try {
        const response = await getRoomsAndSuites();
        setRoomsImages(response.data.roomTypes);
      } catch (error) {
        console.error("Error fetching rooms images:", error);
      }
    };
    fetchRoomsImages();
  }, []);

  return (
    <div className=" text-white w-full flex flex-col items-center gap-8 pt-16 pb-10 bg-my-color overflow-hidden">
      <h2 className="text-5xl font-bold text-center z-20">
        {t("home.roomsSection.title")}
      </h2>
      <p className="text-lg font-semibold max-w-2xl z-20 px-4 text-center">
        {t("home.roomsSection.description")}
      </p>
      <div className="w-full max-w-[1300px] mb-16 mx-auto px-4">
        <ImageCarousel images={roomsImages} />
      </div>
      <LinkButton
        link="/rooms/allRooms"
        text={t("home.roomsSection.button")}
        size="large"
      />
    </div>
  );
}
