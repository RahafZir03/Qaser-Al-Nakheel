import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAllPools } from "../../api/endpoints/pool";
import { useTranslation } from "react-i18next";
import PoolBookingForm from "../molecule/PoolBookingForm";

export default function PoolShowcase() {
  const { t, i18n } = useTranslation("restaurant");
  const [pools, setPools] = useState([]);
  const [expandedPools, setExpandedPools] = useState({});
  useEffect(() => {
    async function fetchPoolsData() {
      const response = await getAllPools();
      setPools(response.data);
    }
    fetchPoolsData();
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const hoverEffect = {
    whileHover: {
      scale: 1.05,
      backgroundColor: "rgba(255,255,255,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const toggleFacilities = (id) => {
    setExpandedPools((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className=" text-white py-20 px-6 sm:px-12 max-w-[1300px] mx-auto">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-16"
        >
          {t("pool.poolsSection.title")}
        </motion.h2>

        <div className="grid gap-12 xl:grid-cols-2">
          {pools.map((pool, index) => (
            <motion.div
              key={pool.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-sec-color-100/5 rounded-2xl shadow-lg border-2 border-sec-color-100 "
            >
              <div className="relative h-72 sm:h-96 w-full">
                <img
                  src={pool.images.find((img) => img.main)?.image_name_url}
                  alt={pool.name.en}
                  className="absolute rounded-t-2xl inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-t-2xl bg-black/40 backdrop-blur-[1px]"></div>
                <motion.div
                  className="absolute bottom-0 p-6 w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-sm italic text-white/70">
                    {pool.pool_type === "indoor"
                      ? t("pool.poolsSection.type.indoor")
                      : t("pool.poolsSection.type.outdoor")}
                  </p>
                  <div className="flex md:flex-row flex-col items-center relative">
                    <h3 className="text-3xl font-bold mb-2">
                      {pool.name[i18n.language || "en"]}
                    </h3>
                    <PoolBookingForm pool={pool.id} />
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <p className="text-sm mb-5">
                  {pool.description[i18n.language || "en"]}
                </p>
                <div className="grid 2xmobile:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {[
                    {
                      label: "pool.poolsSection.info.size",
                      value: pool.size,
                    },
                    {
                      label: "pool.poolsSection.info.depth",
                      value: pool.depth,
                    },
                    {
                      label: "pool.poolsSection.info.capacity",
                      value: `${pool.max_capacity} guests`,
                    },
                    {
                      label: "pool.poolsSection.info.open",
                      value: pool.opening_hours,
                    },
                    {
                      label: "Rate",
                      value: `NIS ${pool.hourly_rate}/hr`,
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={hoverEffect.whileHover}
                      className="bg-zinc-400 p-3 rounded-lg text-center"
                    >
                      <span className="block text-white/80">
                        {t(item.label)}
                      </span>
                      {item.value}
                    </motion.div>
                  ))}
                </div>
                {pool.facilities && pool.facilities.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() => toggleFacilities(pool.id)}
                      className="text-sm underline text-white/80 mb-4"
                    >
                      {expandedPools[pool.id]
                        ? t("pool.poolsSection.facilities.hide")
                        : t("pool.poolsSection.facilities.show")}
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedPools[pool.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <h4 className="text-lg font-semibold mb-4">
                            {t("pool.poolsSection.facilities.title")}
                          </h4>
                          <div className="grid 2xmobile:grid-cols-2 md:grid-cols-3 gap-4">
                            {pool.facilities.map((facility, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"
                                title={
                                  facility.description[i18n.language || "en"]
                                }
                              >
                                <img
                                  src={facility.image}
                                  alt={facility.name[i18n.language || "en"]}
                                  className="w-10 h-10 object-contain"
                                />
                                <div>
                                  <p className=" font-medium">
                                    {facility.name[i18n.language || "en"]}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
