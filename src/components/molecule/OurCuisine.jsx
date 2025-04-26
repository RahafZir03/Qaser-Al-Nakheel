/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SectionTitle = ({ labelKey, titleKey }) => {
  const { t } = useTranslation("restaurant");

  return (
    <div className="text-center space-y-2 mb-10">
      <p className="text-sm uppercase text-sec-color-100">{t(labelKey)}</p>
      <h2 className="font-semibold text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
        {t(titleKey)}
      </h2>
    </div>
  );
};

export default function OurCuisine({ labelKey, titleKey, images }) {
  return (
    <section className="max-w-[1300px] mx-auto py-12 px-4 text-white">
      <SectionTitle labelKey={labelKey} titleKey={titleKey} />

      <div className="grid grid-cols-1 slg:grid-cols-3 mt-20 slg:mt-40 slg:h-[400px] max-w-[1100px] mx-auto justify-center gap-7">
        {images.map((img, index) => (
          <motion.img
            key={index}
            whileHover={{ scale: 1.05 }}
            src={img.src}
            alt={img.alt}
            className={`w-full max-w-[350px] aspect-square rounded-xl shadow-lg mx-auto ${
              img.offset ? img.offset : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}
