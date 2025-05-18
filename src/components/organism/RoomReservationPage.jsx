import { useTranslation } from "react-i18next";
import ReservationForm from "./ReservationForm";
import RenderStars from "../atoms/RenderStars";

/* eslint-disable react/prop-types */
export default function RoomReservationPage({ roomData }) {
  const { t, i18n } = useTranslation("roomAndBooking");

  if (!roomData) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  const lang = i18n.language || "en";

  return (
    <div className="max-w-[1400px] mx-auto mt-10 p-8 text-[#333]">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <div
            className="flex items-center gap-5"
            title={`${
              i18n.language === "en" ? "Number of reviews" : "عدد التقييمات"
            } : ${roomData.ratingCount}`}
          >
            <h1 className="text-3xl font-semibold">
              {roomData.RoomType.name[lang]} - {roomData.room_no}
            </h1>
            <RenderStars ratingNumber={roomData.averageRating} size={"big"} />
          </div>
          <p>{t("roomAndBooking.singleRoom.description")}</p>

          <p className="text-gray-700">{roomData.RoomType.description[lang]}</p>

          <ul className="space-y-2 list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li>
              {t("roomAndBooking.singleRoom.capacity")}: {roomData.capacity}
            </li>
            <li>
              {t("roomAndBooking.adults")}: {roomData.adult_guests}
            </li>
            <li>
              {t("roomAndBooking.children")}: {roomData.child_guests}
            </li>
            <li>
              {t("roomAndBooking.bath")}: {roomData.num_of_baths}
            </li>
            <li>
              {t("roomAndBooking.size")}: {roomData.room_length} m²
            </li>
            <li>
              {t("roomAndBooking.beds")}: {roomData.bed_type[lang]}
            </li>
            <li>
              {t("roomAndBooking.category")}: {roomData.category[lang]}
            </li>
          </ul>

          <h2 className="text-2xl font-semibold border-b pb-2">
            {t("roomAndBooking.amenities")}
          </h2>
          <div className="grid 2xmobile:grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
            {roomData.Services.map((service) => (
              <div
                key={service.id}
                className="flex gap-3 items-center space-x-2"
              >
                <img
                  src={service.image}
                  alt={service.name[lang]}
                  className="w-6 h-6"
                />
                <span>{service.name[lang]}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <h2 className="text-2xl font-semibold mt-6 border-b pb-2">
            {t("roomAndBooking.pricing")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {roomData.RoomPricings.map((price) => (
              <div
                key={price.id}
                className="bg-white shadow rounded p-4 border"
              >
                <h3 className="font-semibold capitalize">
                  {t(`roomAndBooking.${price.day_of_week}`)}
                </h3>
                <p className="text-lg text-[#bfa276] font-bold">
                  NIS {price.price}
                </p>
              </div>
            ))}
          </div>

          {/* Special Offers */}
          {roomData.SpecialPricings.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 border-b pb-2">
                {t("roomAndBooking.specialOffers")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                {roomData.SpecialPricings.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white border-l-4 border-[#bfa276] p-4 rounded shadow-sm"
                  >
                    <h3 className="font-semibold text-[#bfa276]">
                      {offer.name[lang]}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {offer.description[lang]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(offer.start_date).toLocaleDateString()} -{" "}
                      {new Date(offer.end_date).toLocaleDateString()}
                    </p>
                    <p className="font-bold mt-1">NIS {offer.price}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Section - Reservation Form */}
        <ReservationForm
          roomId={roomData.id}
          roomPricings={roomData.RoomPricings}
          specialPricings={roomData.SpecialPricings}
        />
      </div>

      {/* Room Gallery */}
      {roomData.RoomImages && roomData.RoomImages.length > 0 && (
        <div className="w-full mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t("roomAndBooking.gallery")}
          </h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <img
                src={
                  roomData.RoomImages.find((img) => img.main)?.image_name_url
                }
                alt="Main Room"
                className="w-full max-h-[400px] lg:max-h-[600px] object-cover rounded-lg"
              />
            </div>

            <div className="lg:w-[400px] grid grid-cols-2 gap-4 overflow-x-auto lg:overflow-y-auto">
              {roomData.RoomImages.filter((img) => !img.main).map(
                (image, index) => (
                  <img
                    key={index}
                    src={image.image_name_url}
                    alt={`Room ${index + 2}`}
                    className="w-48 h-48 object-cover rounded-lg flex-shrink-0"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
