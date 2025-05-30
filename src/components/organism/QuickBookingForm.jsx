/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { roomTypeData } from "../../api/endpoints/room";
import { createBookingByRoomType } from "../../api/endpoints/booking";
import { toast } from "react-toastify";
import { useRef } from "react";

function QuickBookingForm() {
  const [roomTypes, setRoomTypes] = useState([]);
  const formRef = useRef(null);
  const { t, i18n } = useTranslation("home");

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await roomTypeData();
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      type: "",
      adult_guests: "",
      child_guests: "",
      check_in_date: null,
      check_out_date: null,
    },
    validationSchema: Yup.object({
      type: Yup.string().required(t("booking.form.errors.roomTypeRequired")),
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
      formData.append("type", values.type);
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

  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      formRef.current?.scrollTo({
        top: formRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [formik.submitCount, formik.errors]);

  return (
    <form
      ref={formRef}
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 2xmobile:grid-cols-2 max-h-[390px] border border-sec-color-100 overflow-y-auto lg:grid-cols-6 gap-4 rounded px-8 py-4 shadow-md items-center flex-wrap text-black bg-my-color"
    >
      <select
        name="type"
        onChange={formik.handleChange}
        value={formik.values.type}
        className="p-2 rounded bg-white lg:w-32 max-h-11 flex justify-center items-center lg:col-span-1 2xmobile:col-span-2"
      >
        <option value="">{t("booking.form.selectRoomType")}</option>
        {roomTypes.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name[i18n.language || room.name.en]}
          </option>
        ))}
      </select>
      <div className="flex 2xmobile:flex-row flex-col gap-4 w-fit 2xmobile:col-span-2">
        <DatePicker
          selected={formik.values.check_in_date}
          onChange={(date) => formik.setFieldValue("check_in_date", date)}
          placeholderText={t("booking.form.checkIn")}
          className="p-2 rounded bg-white placeholder:text-gray-600 placeholder:text-sm w-32"
          dateFormat="yyyy-MM-dd"
        />

        <DatePicker
          selected={formik.values.check_out_date}
          onChange={(date) => formik.setFieldValue("check_out_date", date)}
          placeholderText={t("booking.form.checkOut")}
          className="p-2 rounded bg-white placeholder:text-gray-600 placeholder:text-sm w-32"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="flex gap-4 2xmobile:flex-row flex-col 2xmobile:col-span-2">
        <input
          type="number"
          name="adult_guests"
          placeholder={t("booking.form.adults")}
          onChange={formik.handleChange}
          value={formik.values.adult_guests}
          className="p-2 bg-white placeholder:text-gray-600 placeholder:text-sm w-32"
        />

        <input
          type="number"
          name="child_guests"
          placeholder={t("booking.form.children")}
          onChange={formik.handleChange}
          value={formik.values.child_guests}
          className="p-2 bg-white placeholder:text-gray-600 placeholder:text-sm w-32"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 border border-sec-color-100 hover:bg-gray-700 transition text-white py-2 px-4 rounded lg:col-span-1 2xmobile:col-span-2"
      >
        {t("booking.form.submit")}
      </button>
      {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
        <div className="text-red-300 lg:col-span-6 2xmobile:col-span-2">
          <p>{Object.values(formik.errors)[0]}</p>
        </div>
      )}
    </form>
  );
}

export default QuickBookingForm;
