import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function MenuSection({ image, subtitle, title, description }) {
  const { t } = useTranslation("restaurant");
  return (
    <section className="relative flex flex-col text-white mt-20">
      {/* Description Section */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-[1300px] mx-auto z-10">
        {/* Image Container */}
        <div className="ml-4 justify-self-center">
          <div className="border-8 rounded-2xl shadow-lg shadow-gray-500">
            <div className="shadow-inner-shadow shadow-white/20 p-5">
              <motion.img
                whileHover={{ scale: 1.02 }}
                src={image}
                alt="Menu Section"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col h-full gap-7 justify-center"
        >
          <h4 className="text-sec-color-100 text-md font-semibold">
            {t(subtitle)}
          </h4>
          <h3 className="text-4xl font-bold"> {t(title)}</h3>
          <p className="text-xl text-gray-200"> {t(description)}</p>
        </motion.div>
      </div>
    </section>
  );
}
