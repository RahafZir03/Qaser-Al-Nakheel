import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { aboutStatisticsData } from "../../api/endpoints/dashboard";
import { motion } from "framer-motion";

import CountUp from "react-countup";

export default function StatisticsSection() {
  const { i18n } = useTranslation("about");
  const { ref, inView } = useInView({ triggerOnce: true });
  const [statisticsData, setStatisticsData] = useState([]);

  useEffect(() => {
    async function fetchStatisticsData() {
      const response = await aboutStatisticsData();
      setStatisticsData(response.data);
    }
    fetchStatisticsData();
  }, []);
  return (
    <div className="py-10 min-h-[400px] flex flex-col justify-center relative mt-20 text-center bg-about-statistics bg-center bg-no-repeat bg-cover">
      <div className=" absolute w-full h-full top-0 bg-black/70"></div>
      <h2 className="text-5xl font-bold mb-8 z-10">Hotel statistics</h2>
      <div className="grid grid-cols-2 slg:grid-cols-5 gap-6 max-w-[1300px] mx-auto z-10">
        {statisticsData.map((stat, index) => {
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={index}
              ref={ref}
              className="p-6 rounded-xl"
            >
              <div className="text-6xl font-bold text-sec-color-100">
                {inView && <CountUp end={stat.value} duration={2} />}
              </div>
              <div className="mt-4 text-2xl font-semibold">
                {stat.title[i18n.language || "en"]}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
