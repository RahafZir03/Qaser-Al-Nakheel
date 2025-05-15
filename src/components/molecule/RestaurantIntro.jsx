/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Clock, Users, UtensilsCrossed } from "lucide-react";
import RestaurantReservationForm from "../organism/RestaurantReservationForm";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getRestaurantById } from "../../api/endpoints/restaurant";
import RenderStars from "../atoms/RenderStars";
export const RestaurantIntro = ({ image, restId }) => {
  const { i18n } = useTranslation("restaurant");
  const currentLang = i18n.language;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        const response = await getRestaurantById(restId);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    }
    fetchRestaurantData();
  }, [restId]);

  if (!restaurant) {
    return (
      <section className="flex items-center justify-center h-[600px] bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative h-[600px] flex flex-col items-center justify-center bg-my-color overflow-hidden">
      <img
        src={
          restaurant.images?.find((img) => img.main)?.image_name_url || image
        }
        alt="Restaurant background"
        className="absolute w-full h-full object-cover opacity-30"
      />
      <div className="absolute w-full h-full bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-[1300px] text-white text-center px-4"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          {restaurant.name?.[currentLang]}
        </h1>

        <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto">
          {restaurant.description?.[currentLang]}
        </p>

        <div className="flex flex-col gap-4 items-center text-sm text-sec-color-100">
          <div
            className="flex items-center gap-1 justify-center"
            title={`${
              i18n.language === "en" ? "Number of reviews" : "عدد التقييمات"
            } : ${restaurant.ratingCount}`}
          >
            <p className="">
              {i18n.language === "en" ? "Users Rating" : "تقييم المستخدمين"} :
            </p>
            <RenderStars ratingNumber={restaurant.averageRating} />
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>
              {currentLang === "ar"
                ? `ساعات العمل: ${restaurant.Opening_hours}`
                : `Opening Hours: ${restaurant.Opening_hours}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={18} />
            <span>
              {currentLang === "ar"
                ? `نوع المطبخ: ${restaurant.Cuisine_type?.ar}`
                : `Cuisine Type: ${restaurant.Cuisine_type?.en}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>
              {currentLang === "ar"
                ? `السعة: ${restaurant.capacity} أشخاص`
                : `Capacity: ${restaurant.capacity} People`}
            </span>
          </div>
        </div>
      </motion.div>

      <RestaurantReservationForm restId={restId} />
    </section>
  );
};
