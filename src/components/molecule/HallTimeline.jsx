/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const HallTimeline = ({ reservations, selectedDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const isHourReserved = (hour) => {
    return reservations.some((res) => {
      const start = dayjs.utc(res.start_time);
      const end = dayjs.utc(res.end_time);
      return (
        start.hour() <= hour &&
        end.hour() > hour &&
        dayjs.utc(start).isSame(dayjs.utc(selectedDate), "day")
      );
    });
  };

  return (
    <motion.div
      className="grid grid-cols-4 2md:grid-cols-6 xl:grid-cols-8 max-w-[800px] xl:max-w-[1300px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {hours.map((hour) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (hour % 8) / 10 }}
          key={hour}
          className={` text-center rounded-md flex justify-center border items-center xmobile:text-lg 2md:text-xl xmobile:font-bold transition-all duration-300
            ${
              isHourReserved(hour)
                ? "bg-red-400 text-white m-2 2md:m-3 p-2 2md:p-6"
                : "bg-zinc-900 text-sec-color-200 border-amber-300 p-3 xmobile:p-5 2md:p-8 m-1"
            }`}
        >
          {hour}:00
        </motion.div>
      ))}
    </motion.div>
  );
};
