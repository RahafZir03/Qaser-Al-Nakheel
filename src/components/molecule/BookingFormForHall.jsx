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
      customer_name: "",
      start_hour: "",
      end_hour: "",
      phone: "",
    },
    validationSchema: Yup.object({
      customer_name: Yup.string().required("مطلوب"),
      phone: Yup.string().required("مطلوب"),
      start_hour: Yup.number().min(0).max(23).required("مطلوب"),
      end_hour: Yup.number()
        .min(Yup.ref("start_hour"), "يجب أن يكون بعد وقت البدء")
        .max(24)
        .required("مطلوب"),
    }),
    onSubmit: async (values) => {
      const data = {
        hall_id: hallId,
        customer_name: values.customer_name,
        phone: values.phone,
        start_time: `${selectedDate.toISOString().split("T")[0]}T${String(
          values.start_hour
        ).padStart(2, "0")}:00:00Z`,
        end_time: `${selectedDate.toISOString().split("T")[0]}T${String(
          values.end_hour
        ).padStart(2, "0")}:00:00Z`,
      };

      console.log("Booking Data:", data);
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
      className="bg-gray-800 via-sec-color-100 to-my-color text-white p-8 rounded-lg max-w-[1300px] mx-auto shadow-2xl border border-sec-color-100"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("hallbooking.formTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">
            {t("hallbooking.customerName")}
          </label>
          <input
            type="text"
            name="customer_name"
            className="w-full text-gray-900 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            onChange={formik.handleChange}
            value={formik.values.customer_name}
          />
          {formik.touched.customer_name && formik.errors.customer_name && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.customer_name}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            {t("hallbooking.phoneNumber")}
          </label>
          <input
            type="text"
            name="phone"
            className="w-full px-4 py-2 border text-gray-900  rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            {t("hallbooking.fromHour")}
          </label>
          <input
            type="number"
            name="start_hour"
            min="0"
            max="23"
            className="w-full px-4 py-2 border text-gray-900  rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            onChange={formik.handleChange}
            value={formik.values.start_hour}
          />
          {formik.touched.start_hour && formik.errors.start_hour && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.start_hour}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            {t("hallbooking.toHour")}
          </label>
          <input
            type="number"
            name="end_hour"
            min="1"
            max="24"
            className="w-full px-4 py-2 border text-gray-900  rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
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

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-sec-color-100 hover:bg-sec-color-200 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300"
        >
          {t("hallbooking.confirm")}
        </button>
      </div>
    </motion.form>
  );
};
