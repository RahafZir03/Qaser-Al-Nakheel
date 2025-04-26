/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const meals = [
  {
    titleKey: "pool.facilites.first.title",
    descriptionKey: "pool.facilites.first.description",
  },
  {
    titleKey: "pool.facilites.second.title",
    descriptionKey: "pool.facilites.second.description",
  },
  {
    titleKey: "pool.facilites.third.title",
    descriptionKey: "pool.facilites.third.description",
  },
];

const FacilityCard = ({ titleKey, descriptionKey, t }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-sec-color-100/10 backdrop-blur-md p-6 rounded-md shadow-xl text-white border border-white/10 transition duration-300"
  >
    <h4 className="text-2xl font-bold mb-2">{t(titleKey)}</h4>
    <p className="text-lg font-medium leading-relaxed text-white/90">
      {t(descriptionKey)}
    </p>
  </motion.div>
);

export default function PoolFacilites() {
  const { t } = useTranslation("restaurant");

  return (
    <section className="py-16 px-4 text-white max-w-[1300px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {t("pool.facilites.title")}
        </h2>
        <p className="text-sec-color-100 text-sm mt-2 italic">
          {t("pool.facilites.subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 2md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {meals.map((meal) => (
          <FacilityCard key={meal.titleKey} {...meal} t={t} />
        ))}
      </div>
    </section>
  );
}
