/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { createHallReservation } from "../../api/endpoints/booking";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const BookingFormForHall = ({ hallId, selectedDate }) => {
  const { t } = useTranslation("hall");

  const formik = useFormik({
    initialValues: {
      details: "",
      start_hour: "",
      end_hour: "",
    },
    validationSchema: Yup.object({
      details: Yup.string().required("مطلوب"),
      start_hour: Yup.number().min(0).max(23).required("مطلوب"),
      end_hour: Yup.number()
        .min(Yup.ref("start_hour"), "يجب أن يكون بعد وقت البدء")
        .max(24)
        .required("مطلوب"),
    }),
    onSubmit: async (values) => {
      const data = {
        hall_id: hallId,
        details: values.details,
        start_time: `${selectedDate.toISOString().split("T")[0]}T${String(
          values.start_hour
        ).padStart(2, "0")}:00:00Z`,
        end_time: `${selectedDate.toISOString().split("T")[0]}T${String(
          values.end_hour
        ).padStart(2, "0")}:00:00Z`,
      };
      const response = await createHallReservation(data);
      toast.success(response.data.message);
    },
  });

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-sec-color-100"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-100 mb-10">
        {t("hallbooking.formTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Details Field */}
        <div className="md:col-span-2">
          <label className="block text-gray-100 font-semibold mb-2">
            {t("hallbooking.details")}
          </label>
          <input
            type="text"
            name="details"
            placeholder={t("hallbooking.detailsPlaceholder")}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sec-color-100 focus:outline-none text-gray-900 transition"
            onChange={formik.handleChange}
            value={formik.values.details}
          />
          {formik.touched.details && formik.errors.details && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
          )}
        </div>

        {/* Start Hour */}
        <div>
          <label className="block text-gray-100 font-semibold mb-2">
            {t("hallbooking.fromHour")}
          </label>
          <input
            type="number"
            name="start_hour"
            min="0"
            max="23"
            placeholder="16"
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sec-color-100 focus:outline-none text-gray-900 transition"
            onChange={formik.handleChange}
            value={formik.values.start_hour}
          />
          {formik.touched.start_hour && formik.errors.start_hour && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.start_hour}
            </p>
          )}
        </div>

        {/* End Hour */}
        <div>
          <label className="block text-gray-100 font-semibold mb-2">
            {t("hallbooking.toHour")}
          </label>
          <input
            type="number"
            name="end_hour"
            min="1"
            max="24"
            placeholder="20"
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sec-color-100 focus:outline-none text-gray-900 transition"
            onChange={formik.handleChange}
            value={formik.values.end_hour}
          />
          {formik.touched.end_hour && formik.errors.end_hour && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.end_hour}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          type="submit"
          className="bg-sec-color-100 hover:bg-sec-color-200 transition text-white font-bold py-3 px-10 rounded shadow-lg text-lg"
        >
          {t("hallbooking.confirm")}
        </button>
      </div>
    </motion.form>
  );
};
