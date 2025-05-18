/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { createRestaurantReservation } from "../../api/endpoints/restaurant";
function RestaurantReservationForm({ restId }) {
  const formRef = useRef(null);
  const { t } = useTranslation("restaurant");

  const formik = useFormik({
    initialValues: {
      reservation_date: null,
      number_of_guests: "",
    },
    validationSchema: Yup.object({
      reservation_date: Yup.date().required(
        t("booking.form.errors.reservation_date_required")
      ),
      number_of_guests: Yup.number()
        .required(t("booking.form.errors.guests_required"))
        .min(1, t("booking.form.errors.guests_min")),
    }),
    onSubmit: async (values) => {
      const tzOffset = values.reservation_date.getTimezoneOffset() * 60000;
      const localDate = new Date(
        values.reservation_date - tzOffset
      ).toISOString();

      const payload = {
        reservation_date: localDate,
        rest_id: restId,
        number_of_guests: values.number_of_guests,
        is_walk_in: false,
      };
      const response = await createRestaurantReservation(payload);
      
      toast.success(response.data.message);
      formik.resetForm();
    },
  });

  return (
    <form
      ref={formRef}
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 z-10 mt-10 border border-sec-color-100  2xmobile:grid-cols-2 md:grid-cols-3 gap-4 rounded px-8 py-4 shadow-md shadow-sec-color-200/20 items-center text-black bg-my-color max-h-[290px] overflow-y-auto"
    >
      <div className="flex items-center gap-4">
        <DatePicker
          selected={formik.values.reservation_date}
          onChange={(date) => formik.setFieldValue("reservation_date", date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText={t("booking.form.reservationDate")}
          className="p-2 rounded bg-white placeholder:text-gray-600 placeholder:text-sm"
        />
      </div>

      <input
        type="number"
        name="number_of_guests"
        placeholder={t("booking.form.numberOfGuests")}
        onChange={formik.handleChange}
        value={formik.values.number_of_guests}
        className="p-2 bg-white placeholder:text-gray-600 placeholder:text-sm rounded"
      />

      <button
        type="submit"
        className="bg-gray-800 hover:bg-gray-700 transition text-white py-2 px-4 rounded 2xmobile:col-span-2 md:col-span-1"
      >
        {t("booking.form.submit")}
      </button>

      {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
        <div className="text-red-300 text-center 2xmobile:col-span-2 lg:col-span-4">
          <p>{Object.values(formik.errors)[0]}</p>
        </div>
      )}
    </form>
  );
}

export default RestaurantReservationForm;
