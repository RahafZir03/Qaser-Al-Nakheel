/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEdit, FaEye, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiPriceTag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function AdminRoomCard({
  room,
  handleViewRoom,
  handleRoomActive,
  handleDeleteRoom,
  handleSpecialPrice,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { t, i18n } = useTranslation();

  const handleConfirmDelete = () => {
    handleDeleteRoom(room.id);
    setShowConfirm(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-800 border border-sec-color-100 p-4 transition-transform hover:scale-[1.01] duration-300 min-w-[200px]">
      <div className="flex flex-col xl:flex-row  gap-4">

        <div className="w-full xl:w-[250px] flex-shrink-0">
          <img
            src={room.RoomImages?.[0]?.image_name_url}
            alt="Room"
            className="w-full h-[250px] object-cover rounded-xl"
          />
        </div>


        <div className="flex flex-col justify-between w-full overflow-auto">
          <div className="text-white space-y-2 min-w-[200px]">
            <h2 className="text-xl font-bold tracking-tight break-words">
              {t('all_rooms.room_no')}: {room.room_no}
            </h2>

            <div className="flex flex-col gap-1 text-sm mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold whitespace-nowrap">{t('all_rooms.category')}:</span>
                <span className="break-words">{room.category?.[i18n.language] || t('all_rooms.not_available')}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold whitespace-nowrap">{t('all_rooms.type')}:</span>
                <span className="break-words">{room.RoomType?.name?.[i18n.language] || t('all_rooms.not_available')}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold whitespace-nowrap">{t('all_rooms.rating')}:</span>
                <span className="break-words text-md flex items-center gap-2">{room?.averageRating} <FaStar className="text-amber-400 text-lg" /></span>
              </div>
             {room?.RoomPricings?.length > 0 && (
  <div className="mt-2">
    <div className="grid grid-cols-3 gap-2 text-white text-xs">
      {room.RoomPricings.map((pricing) => (
        <div
          key={pricing.id}
          className="bg-sec-color-100 px-2 py-1 rounded-lg text-center"
          title={pricing.day_of_week} // Tooltip يظهر عند الوقوف على العنصر
        >
          {pricing.price} NIS
        </div>
      ))}
    </div>
  </div>
)}
            </div>
          </div>

          {/* الأزرار - تم تحسين التنسيق */}
          <div className="flex flex-wrap items-center justify-between mt-4 gap-3 text-sm">
            <button
              onClick={() => handleRoomActive(room.id)}
              className={`px-4 py-1 rounded font-medium transition duration-200 whitespace-nowrap ${room.isActive
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
            >
              {room.isActive ? t('all_rooms.active') : t('all_rooms.inactive')}
            </button>

            <div className="flex gap-2 flex-wrap justify-end">
              <button
                onClick={() => handleViewRoom(room.id)}
                className="text-blue-400 hover:text-blue-600 flex items-center"
                title={t('all_rooms.view_details')}
              >
                <FaEye size={20} />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="text-red-500 hover:text-red-700 flex items-center"
                title={t('all_rooms.delete')}
              >
                <MdDelete size={20} />
              </button>
              <Link
                to={`/admin/updateroom/${room.id}`}
                className="text-blue-500 hover:text-blue-700 flex items-center"
                title={t('all_rooms.edit')}
              >
                <FaEdit size={20} />
              </Link>
              <button
                onClick={() => handleSpecialPrice(room.id)}
                className="text-green-600 hover:text-green-800 flex items-center"
                title={t('all_rooms.special_price')}
              >
                <GiPriceTag size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm text-center">
            <p className="mb-4">{t('all_rooms.confirm_delete')}</p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                {t('all_rooms.yes_delete')}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
              >
                {t('all_rooms.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}