/* eslint-disable react/prop-types */

import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBookingByRoomType } from "../../api/endpoints/booking";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import { ImSection } from "react-icons/im";
import { motion } from "framer-motion";

export default function BookingForm({ roomTypeId }) {
  const { t, i18n } = useTranslation("home");

  const formik = useFormik({
    initialValues: {
      adult_guests: "",
      child_guests: "",
      check_in_date: null,
      check_out_date: null,
    },
    validationSchema: Yup.object({
      check_in_date: Yup.date().required(
        t("booking.form.errors.check_in_required")
      ),
      check_out_date: Yup.date().required(
        t("booking.form.errors.check_out_required")
      ),
      adult_guests: Yup.number()
        .required(t("booking.form.errors.adult_guestsrequired"))
        .min(0),
      child_guests: Yup.number()
        .required(t("booking.form.errors.child_guestsrequired"))
        .min(0),
    }),
    onSubmit: async (values) => {
      const num_of_guests =
        parseInt(values.adult_guests) + parseInt(values.child_guests);

      const formData = new FormData();
      formData.append("type", roomTypeId);
      formData.append("num_of_guests", num_of_guests.toString());
      formData.append(
        "check_in_date",
        values.check_in_date?.toISOString().split("T")[0] || ""
      );
      formData.append(
        "check_out_date",
        values.check_out_date?.toISOString().split("T")[0] || ""
      );
      formData.append("payment_status", "pending");

      await createBookingByRoomType(formData);
      toast.success(t("booking.form.success"));
    },
  });

  const InputContainer = ({ label, children }) => (
    <div className="flex flex-col gap-1 text-white relative">
      <label className="text-xl font-semibold ">{label}</label>
      {children}
      <FaCalendarAlt
        className={`absolute top-[52px] ${
          i18n.language === "ar" ? "left-2" : "right-2"
        } text-white pointer-events-none`}
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      className="bg-my-color p-4 md:pb-14 w-full border-y border-gray-800 shadow-md shadow-my-color z-10 -mt-28 max-w-[1600px] mx-auto"
    >
      {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
        <div className="w-full text-red-500 text-center">
          <p>{Object.values(formik.errors)[0]}</p>
        </div>
      )}
      <h1 className="text-3xl font-bold text-white text-center my-5 flex items-center gap-4 w-full justify-center">
        <ImSection className="rotate-90 text-sec-color-100" />
        {t("booking.quickForm.title")}
        <ImSection className="rotate-90 text-sec-color-100" />
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 justify-center items-end w-full max-w-[400px] md:max-w-[800px] xl:max-w-[1500px] mx-auto"
      >
        {/* Check-in */}
        <InputContainer label={t("booking.form.checkIn")}>
          <DatePicker
            selected={formik.values.check_in_date}
            onChange={(date) => formik.setFieldValue("check_in_date", date)}
            placeholderText="yyyy-mm-dd"
            className="px-3 py-4 w-full border border-white bg-transparent text-white placeholder-white focus:outline-none"
            dateFormat="yyyy-MM-dd"
          />
        </InputContainer>

        {/* Check-out */}
        <InputContainer label={t("booking.form.checkOut")}>
          <DatePicker
            selected={formik.values.check_out_date}
            onChange={(date) => formik.setFieldValue("check_out_date", date)}
            placeholderText="yyyy-mm-dd"
            className="px-3 py-4 w-full border border-white bg-transparent text-white placeholder-white focus:outline-none"
            dateFormat="yyyy-MM-dd"
          />
        </InputContainer>

        {/* Guests - بالغين */}
        <div className="flex flex-col gap-1 text-white min-w-[120px]">
          <label className="text-xl font-semibold">
            {t("booking.form.adults")}
          </label>
          <input
            type="number"
            name="adult_guests"
            placeholder={t("booking.form.adults")}
            onChange={formik.handleChange}
            value={formik.values.adult_guests}
            className="w-full px-3 py-4 border border-white bg-transparent text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Guests - أطفال */}
        <div className="flex flex-col gap-1 text-white ">
          <label className="text-xl mb-2 font-semibold">
            {t("booking.form.children")}
          </label>
          <input
            type="number"
            name="child_guests"
            placeholder={t("booking.form.children")}
            onChange={formik.handleChange}
            value={formik.values.child_guests}
            className="w-full px-3 py-4 border border-white bg-transparent text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#c1a471] hover:bg-[#b0925c] md:col-span-2 xl:col-span-1 text-white font-semibold px-6 py-4 transition"
        >
          {t("booking.form.submit") || "Check Availability"}
        </button>
      </form>
    </motion.div>
  );
}
