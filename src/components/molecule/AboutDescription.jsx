import { useTranslation } from "react-i18next";
import aboutImage from "../../assets/images/aboutImage.jpeg";
import aboutImage2 from "../../assets/images/aboutImage2.jpeg";
import { motion } from "framer-motion";

export default function AboutDescription() {
  const { t } = useTranslation("about");
  return (
    <div className=" relative flex flex-col bg-about-back bg-cover bg-no-repeat bg-center mt-20">
      <div className=" absolute top-0 w-full h-full bg-my-color/90"></div>
      {/* Description Section */}
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center  max-w-[1300px] mx-auto z-10">
        <div className="ml-4 justify-self-center">
          <div className="border-8 rounded-2xl shadow-lg shadow-gray-500">
            <div className="shadow-inner-shadow shadow-white/20 p-5">
              <img
                src={aboutImage}
                alt="Bouncing Image"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col h-full gap-7 justify-center"
        >
          <h1 className="text-5xl font-bold">{t("about.firstText.title")}</h1>
          <p className="text-2xl text-gray-200">
            {t("about.firstText.description")}
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="grid grid-cols-1 2md:grid-cols-2 max-w-[1300px] mx-auto gap-12 items-center p-8 mt-20 mb-8 border-b pb-20 z-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col h-full gap-7 justify-center"
        >
          <h2 className="text-4xl font-bold">{t("about.secondText.title")}</h2>
          <p className="text-xl text-gray-200">
            {t("about.secondText.description")}
          </p>
        </motion.div>
        <div className="ml-4 justify-self-center">
          <div className="border-8 rounded-2xl shadow-lg shadow-gray-500">
            <div className="shadow-inner-shadow shadow-white/20 p-5">
              <img
                src={aboutImage2}
                alt="Bouncing Image"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
