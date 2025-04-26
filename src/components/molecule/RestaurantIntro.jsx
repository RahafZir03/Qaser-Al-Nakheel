/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

import { Clock, Users, UtensilsCrossed } from "lucide-react";
import RestaurantReservationForm from "../organism/RestaurantReservationForm";
import { useTranslation } from "react-i18next";
export const RestaurantIntro = ({
  titleKey,
  descKey,
  openKey,
  cuisineKey,
  capacityKey,
  image,
  restId,
}) => {
  const { t } = useTranslation("restaurant");

  return (
    <section className="relative h-[600px] flex flex-col items-center justify-center bg-my-color overflow-hidden">
      <img
        src={image}
        alt="Restaurant background"
        className="absolute w-full h-full object-cover opacity-30"
      />
      <div className="absolute w-full h-full bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-[1300px] text-white text-center"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          {t(titleKey)}
        </h1>
        <p className="text-base md:text-lg mb-6">{t(descKey)}</p>

        <div className="flex flex-col gap-4 items-center text-sm text-sec-color-100">
          <div className="flex items-center gap-2">
            <Clock size={18} /> <span>{t(openKey)}</span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={18} /> <span>{t(cuisineKey)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} /> <span>{t(capacityKey)}</span>
          </div>
        </div>
      </motion.div>

      <RestaurantReservationForm restId={restId} />
    </section>
  );
};
