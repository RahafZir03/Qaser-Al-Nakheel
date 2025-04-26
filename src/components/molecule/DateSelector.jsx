/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const { t } = useTranslation("hall");
  return (
    <motion.div
      className="max-w-[1300px] mx-auto flex flex-col items-center mb-4 "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="text-lg font-medium mb-2 text-white">
        {t("hallbooking.selectDate")}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        className="border px-4 py-2 rounded-sm shadow-sm focus:outline-none ring-2 ring-sec-color-200 focus:ring-4 focus:ring-sec-color-100"
        calendarClassName="rtl"
      />
    </motion.div>
  );
};
