/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { CreateBookingByRoomId } from "../../api/endpoints/booking";
import { toast } from "react-toastify";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const isWithinSpecialPricing = (date, special) => {
  return (
    dayjs(date).isSameOrAfter(dayjs(special.start_date), "day") &&
    dayjs(date).isSameOrBefore(dayjs(special.end_date), "day")
  );
};

const ReservationForm = ({ roomId, roomPricings, specialPricings }) => {
  const { t } = useTranslation("roomAndBooking");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);

  const formik = useFormik({
    initialValues: {
      check_in_date: null,
      check_out_date: null,
      adult_guests: "",
      child_guests: "",
    },
    validationSchema: Yup.object({
      check_in_date: Yup.date().required(t("validation.required")),
      check_out_date: Yup.date()
        .min(Yup.ref("check_in_date"), t("validation.checkOutAfterCheckIn"))
        .required(t("validation.required")),
      adult_guests: Yup.number()
        .required(t("validation.required"))
        .min(1, t("validation.atLeastOneAdult")),
      child_guests: Yup.number()
        .required(t("validation.required"))
        .min(0, t("validation.minZero")),
    }),
    onSubmit: (values) => {
      setPendingValues(values);
      setShowConfirm(true);
    },
  });

  useEffect(() => {
    const { check_in_date, check_out_date } = formik.values;
    if (!check_in_date || !check_out_date) return;

    const start = dayjs(check_in_date);
    const end = dayjs(check_out_date);
    const days = [];

    for (let d = start; d.isBefore(end); d = d.add(1, "day")) {
      days.push(d);
    }

    let total = 0;

    days.forEach((date) => {
      const special = specialPricings.find((sp) =>
        isWithinSpecialPricing(date, sp)
      );

      if (special) {
        total += parseFloat(special.price); // سعر خاص لهذا اليوم
      } else {
        const day = date.format("dddd").toLowerCase();
        const pricing = roomPricings.find(
          (p) => p.day_of_week.toLowerCase() === day
        );
        if (pricing) {
          total += parseFloat(pricing.price); // سعر عادي لهذا اليوم
        }
      }
    });

    setTotalPrice(total);
  }, [
    formik.values.check_in_date,
    formik.values.check_out_date,
    roomPricings,
    specialPricings,
  ]);

  const handleFinalSubmit = async () => {
    console.log("Final Submitted:", pendingValues);
    pendingValues.room_id = roomId;
    const bookingData = {
      room_id: roomId,
      check_in_date: pendingValues.check_in_date,
      check_out_date: pendingValues.check_out_date,
      num_of_guests:
        parseInt(pendingValues.adult_guests) +
        parseInt(pendingValues.child_guests),
    };
    const response = await CreateBookingByRoomId(bookingData);
    console.log(response.data);
    if (response.status === 201) {
      toast.success(t(response.data.message));
    }
    setShowConfirm(false);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full lg:w-[400px] max-h-[600px] bg-my-color text-white p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold">
          {t("roomAndBooking.yourReservation")}
        </h2>

        <div>
          <label className="block mb-1">{t("roomAndBooking.checkIn")}</label>
          <input
            type="date"
            name="check_in_date"
            value={formik.values.check_in_date || ""}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded text-gray-900"
          />
          {formik.touched.check_in_date && formik.errors.check_in_date && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.check_in_date}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">{t("roomAndBooking.checkOut")}</label>
          <input
            type="date"
            name="check_out_date"
            value={formik.values.check_out_date || ""}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded text-gray-900"
          />
          {formik.touched.check_out_date && formik.errors.check_out_date && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.check_out_date}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">
            {t("roomAndBooking.adultGuests")}
          </label>
          <input
            type="number"
            name="adult_guests"
            min="1"
            value={formik.values.adult_guests}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded text-gray-900"
          />
          {formik.touched.adult_guests && formik.errors.adult_guests && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.adult_guests}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">
            {t("roomAndBooking.childGuests")}
          </label>
          <input
            type="number"
            name="child_guests"
            min="0"
            value={formik.values.child_guests}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded text-gray-900"
          />
          {formik.touched.child_guests && formik.errors.child_guests && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.child_guests}
            </div>
          )}
        </div>

        <div className="pt-2 text-sm">
          <strong>{t("roomAndBooking.yourPrice")}</strong>
          <div>
            {totalPrice > 0 && specialPricings.length > 0 && (
              <div className="text-xs text-green-300 mt-1">
                {t("roomAndBooking.specialOfferApplied")} :{" "}
                <strong>NIS {totalPrice.toFixed(2)}</strong>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#bfa276] text-white py-2 rounded mt-2 hover:bg-[#a89064] transition"
        >
          {t("roomAndBooking.bookYourStay")}
        </button>
      </form>

      {/* نافذة تأكيد بسيطة */}
      {showConfirm && (
        <div className="fixed inset-0 -top-[1000px] bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-[90%] max-w-md text-gray-800 space-y-4">
            <h3 className="text-lg font-semibold">
              {t("roomAndBooking.confirmBooking")}
            </h3>
            <p>
              {t("roomAndBooking.totalToPay")}:{" "}
              <strong>NIS {totalPrice.toFixed(2)}</strong>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                {t("roomAndBooking.cancel")}
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-2 bg-[#bfa276] text-white rounded hover:bg-[#a89064]"
              >
                {t("roomAndBooking.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationForm;
