/* eslint-disable react/prop-types */
import { FaBookReader, FaVectorSquare } from "react-icons/fa";
import { LiaBathSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { MdOutlineBedroomChild } from "react-icons/md";
import { Link } from "react-router-dom";
import RenderStars from "../atoms/RenderStars";

export default function RoomCard({ room, roomType }) {
  const { t, i18n } = useTranslation("roomAndBooking");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const cleanDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const tomorrowOnly = cleanDate(tomorrow);

  const specialPrice = room.SpecialPricings?.find((sp) => {
    const start = cleanDate(new Date(sp.start_date));
    const end = cleanDate(new Date(sp.end_date));
    return tomorrowOnly >= start && tomorrowOnly <= end;
  });
  const tomorrowName = tomorrow
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const normalPrice = room.RoomPricings?.find(
    (rp) => rp.day_of_week.toLowerCase() === tomorrowName
  );

  const price = specialPrice ? specialPrice.price : normalPrice?.price;
  const isSpecial = !!specialPrice;

  const formattedEndDate = isSpecial
    ? new Date(specialPrice.end_date).toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      )
    : null;
  return (
    <div>
      <div
        key={room.id}
        className="bg-white shadow border border-gray-200 group overflow-hidden"
      >
        <div className="relative">
          <img
            src={`${room.RoomImages[0].image_name_url}`}
            alt={room.room_no}
            className="w-full h-60 object-cover group-hover:scale-105 ease-out transition duration-500"
          />
          <span className="absolute top-4 right-4 font-serif bg-[#9e8559] shadow shadow-gray-600 text-white px-4 py-1 text-sm text-center">
            {i18n.language === "ar" && t("roomAndBooking.Night") + "/"}
            {price} NIS
            {i18n.language === "en" && "/" + t("roomAndBooking.Night")}
            {isSpecial && (
              <span className="block text-[10px] mt-1 text-yellow-300">
                ({t("roomAndBooking.specialOffer")} -{" "}
                {t("roomAndBooking.fromTomorrow")}{" "}
                {formattedEndDate &&
                  `${t("roomAndBooking.until")} ${formattedEndDate}`}
                )
              </span>
            )}
          </span>
        </div>
        <div className="text-left p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold flex gap-1 items-center mb-2 text-gray-700">
              <MdOutlineBedroomChild />
              {roomType.name[i18n.language] || roomType.name.en} -{" "}
              {room.room_no}
            </h3>
            <div
              className="flex items-center gap-1 justify-center"
              title={`${
                i18n.language === "en" ? "Number of reviews" : "عدد التقييمات"
              } : ${room.ratingCount}`}
            >
              <RenderStars ratingNumber={room.averageRating} />
            </div>
          </div>
          <div className="flex items-center text-gray-600 text-xs gap-4 mb-4">
            <span className="flex items-center gap-1">
              <FaVectorSquare className="w-4 h-4" /> {room.room_length}{" "}
              {t("roomAndBooking.ft")}
            </span>
            <span className="flex items-center gap-1">
              <IoPeopleOutline className="w-5 h-5" /> {room.capacity}{" "}
              {t("roomAndBooking.guests")}
            </span>
            <span className="flex items-center gap-1">
              <LiaBathSolid className="w-5 h-5" /> {room.num_of_baths}{" "}
              {t("roomAndBooking.bath")}
            </span>
          </div>
          <Link
            to={`/rooms/roomdetails/${room.id}`}
            className="text-sm font-semibold flex gap-1 items-center text-gray-700 border-b-2 border-transparent hover:border-gray-800 transition"
          >
            {t("roomAndBooking.readMore")} <FaBookReader />
          </Link>
        </div>
      </div>
    </div>
  );
}
