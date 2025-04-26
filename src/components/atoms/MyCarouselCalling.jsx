import mainImage from "../../assets/images/hombac.jpeg";
import restaurantImage from "../../assets/images/de3.jpeg";
import hallImage from "../../assets/images/family2.jpeg";
import poolImage from "../../assets/images/poolImage.jpeg";
import { useTranslation } from "react-i18next";
import Carousel from "../molecule/Carousel";
export const MyCarousel = () => {
  const { t } = useTranslation("home");
  const slides = [
    {
      image: mainImage,
      text: t("home.upperSection.main.title"),
      description: t("home.upperSection.main.description"),
      link: "/rooms/allRooms",
      buttonText: t("home.upperSection.main.button"),
      showForm:"roomBooking",
    },
    {
      image: restaurantImage,
      text: t("home.upperSection.restaurant.title"),
      description: t("home.upperSection.restaurant.description"),
      link: "/restaurant",
      buttonText: t("home.upperSection.restaurant.button"),
    },
    {
      image: hallImage,
      text: t("home.upperSection.hall.title"),
      description: t("home.upperSection.hall.description"),
      link: "/halls",
      buttonText: t("home.upperSection.hall.button"),
    },
    {
      image: poolImage,
      text: t("home.upperSection.pool.title"),
      description: t("home.upperSection.pool.description"),
      link: "/pool",
      buttonText: t("home.upperSection.pool.button"),
    },
  ];
  return <Carousel slides={slides} />;
};
