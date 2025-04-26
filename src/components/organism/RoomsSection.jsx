/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import RoomCard from "../molecule/RoomCard";
import { useState } from "react";

export default function RoomsSection({
  rooms,
  roomType,
  onFilter,
  initialCheckIn,
  initialCheckOut,
}) {
  const { t } = useTranslation("roomAndBooking");

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate <= today) {
      setError(t("roomAndBooking.checkInMustBeInFuture"));
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError(t("roomAndBooking.invalidDateRange"));
      return;
    }

    setError("");
    onFilter(checkIn, checkOut);
  };

  return (
    <div className="bg-[#f6f0e8] py-20 px-4 text-center">
      <p className="text-sm tracking-widest text-gray-600 mb-2">
        {t("roomAndBooking.uniqueRooms")}
      </p>
      <h2 className="text-4xl font-bold mb-2">
        {t("roomAndBooking.roomsTitle")}
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-4 mt-10">
        {t("roomAndBooking.roomDescription")}
      </p>

      <div className="grid grid-cols-1 2xmobile:grid-cols-3 max-w-fit mx-auto justify-center gap-6 mb-4 items-end bg-my-color p-4">
        <div>
          <label className="block text-sm font-medium mb-3 text-white">
            {t("roomAndBooking.checkIn")}
          </label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="p-2 rounded border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-3 text-white">
            {t("roomAndBooking.checkOut")}
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="p-2 rounded border"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#c1a471] text-white px-4 py-2 rounded max-w-[130px] mx-auto hover:bg-[#b0925c]"
        >
          {t("applyFilter", { defaultValue: t("roomAndBooking.done") })}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mt-14">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard key={room.id} room={room} roomType={roomType} />
          ))
        ) : (
          <p className="text-gray-700 text-xl font-semibold w-full flex mx-auto justify-center text-center md:col-span-2 xl:col-span-3 ">
            {t("roomAndBooking.noAvailableRooms")}
          </p>
        )}
      </div>
    </div>
  );
}
