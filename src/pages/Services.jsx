import room3 from "../assets/images/room3.jpg";
import con2 from "../assets/images/con2.jpg";
import hall from "../assets/images/companyHall.jpg";
import restaurant from "../assets/images/de3.jpeg";
import { useEffect, useState } from "react";
import { serviceData } from "../api/endpoints/room";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LinkButton from "../components/atoms/LinkButton";

const sections = [
  {
    title: "services.section1Title",
    description: "services.section1Description",
    image: restaurant,
    buttonLink: "/restaurant",
    buttonText: "services.section1Button",
  },
  {
    title: "services.section2Title",
    description: "services.section2Description",
    image: con2,
    buttonLink: "/pool",
    buttonText: "services.section2Button",
  },
  {
    title: "services.section3Title",
    description: "services.section3Description",
    image: hall,
    buttonLink: "/halls",
    buttonText: "services.section3Button",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  const { t, i18n } = useTranslation("home");
  const [servicesData, setServicesData] = useState();

  useEffect(() => {
    async function fetchServicesData() {
      const response = await serviceData();
      setServicesData(response.data.rows);
    }
    fetchServicesData();
  }, []);

  return (
    <div className="bg-my-color text-white">
      <div className=" relative">
        <img
          src={room3}
          alt=""
          className="w-full max-h-[500px] object-cover "
        />
        <div className=" absolute top-0 w-full h-full bg-black/70 "></div>
        <h1 className=" absolute top-1/2 text-5xl font-bold transform origin-center text-center w-full">
          {t("services.pageTitle")}
        </h1>
      </div>
      <p className="text-[#878787] text-center text-4xl font-semibold my-20">
        {t("services.whyChooseUs")}
      </p>
      <div className=" relative z-10 overflow-hidden over">
        <img
          src={con2}
          alt=""
          className=" absolute top-80 w-full h-full -z-10 object-cover object-center"
        />
        <div className=" absolute top-80 w-full h-full -z-10 bg-black/80"></div>

        <div>
          <div className="flex justify-center items-center">
            <h1 className="text-5xl font-extrabold text-center max-w-3xl mb-16">
              {t("services.mainHeading")}
            </h1>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 border border-sec-color-100 md:grid-cols-2  slg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1300px] mx-auto bg-zinc-900 p-10 rounded-3xl"
          >
            {servicesData &&
              servicesData.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="flex flex-col border border-sec-color-100 justify-center items-center gap-5 p-6 rounded-2xl bg-zinc-800 text-white shadow-md hover:shadow-xl transition-shadow"
                >
                  <motion.img
                    src={service.image}
                    alt=""
                    className="w-24 h-24"
                    whileHover={{ rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="text-center flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-xl font-bold text-white">
                      {service.name[i18n.language || "en"]}
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed w-4/5">
                      {service.description[i18n.language || "en"]}
                    </p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
        <div className="my-28 px-4 max-w-[1300px] mx-auto flex flex-col gap-24">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid grid-cols-1 2md:grid-cols-2 max-w-screen-xl mx-auto gap-12 items-center px-4 py-12 border-b"
            >
              {/* صورة */}
              <div
                className={`${
                  index % 2 === 0 ? "order-1" : "order-1 2md:order-2"
                } justify-self-center w-full`}
              >
                <div className="border-8 rounded-2xl shadow-lg shadow-gray-500 w-full max-w-[500px] mx-auto">
                  <div className="shadow-inner-shadow shadow-white/20 p-5">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="rounded-xl object-cover w-full h-auto min-h-[400px]"
                    />
                  </div>
                </div>
              </div>

              {/* النص */}

              <div
                className={`${
                  index % 2 === 0 ? "order-2" : "order-2 2md:order-1"
                } justify-self-center`}
              >
                <div className="justify-self-center">
                  <h2
                    className={`text-3xl slg:text-4xl font-bold text-white mb-4 ${
                      i18n.language === "ar"
                        ? "text-right"
                        : "text-center 2md:text-left"
                    }`}
                  >
                    {t(section.title)}
                  </h2>
                  <div className="mt-2 mb-5 h-2 rounded-full w-1/5 bg-gradient-to-r from-white from-0% to-sec-color-100 to-60%"></div>
                  <p
                    className={`text-gray-200 text-lg slg:text-xl mb-10 mt-8 ${
                      i18n.language === "ar"
                        ? "text-right"
                        : "text-center 2md:text-left"
                    }`}
                  >
                    {t(section.description)}
                  </p>
                  <div
                    className={`${
                      i18n.language === "ar"
                        ? "text-right"
                        : "text-center 2md:text-left"
                    }`}
                  >
                    <LinkButton
                      link={section.buttonLink}
                      text={t(section.buttonText)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
