/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { deleteRoomType, roomTypeData } from '../../api/endpoints/room';
import { toast } from 'react-toastify';
import AddRoomTypeModal from '../../components/molecule/AddRoomType';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


export default function RoomType() {
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomType, setRoomType] = useState({});
  const lang = useSelector((state) => state.language.lang);
  const { t, i18n } = useTranslation();

  const openModal = (id) => {
    if (!id) {
      setSelectedRoomType(null)
    } else {
      setSelectedRoomType(id)
    }
    setIsModalOpen(true)
  }

  useEffect(() => {
    async function getRoomTypeData() {
      const responce = await roomTypeData();
      setRoomType(responce.data);
    }
    getRoomTypeData()
  }, [])
  const handleDeleteRoom = async (typeId) => {
    const response = await deleteRoomType(typeId);
    setRoomType((prevServices) => prevServices.filter(roomType => roomType.id !== typeId));
    toast.success(response.data.message);
  };
  return (
    <div className="p-6 bg-admin-color text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">{t("headerRoomType")}</h2>

      <div className="bg-admin-color p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => openModal(null)} className="bg-green-500 text-white px-4 py-2 rounded inline-block">
            {t("headerRooms")}

          </button>
        </div>

        <table className="w-full text-left text-sm text-gray-400 border">
          <thead className="bg-admin-color text-white">
            <tr>
              <th className="p-3">{t("roomTable.title")}</th>
              <th className="p-3">{t("roomTable.description")}</th>
              <th className="p-3">{t("roomTable.roomNumber")}</th>
              <th className="p-3">{t("roomTable.action")}</th>
            </tr>
          </thead>
          <tbody>
            {roomType.length > 0 ? (
              roomType.map((room, index) => (
                <tr key={index} className="border-b border-gray-600 ">
                  <td className="p-3">{lang === "ar" ? room.name.ar : room.name.en}</td>
                  <td className="p-3">{lang === "ar" ? room.description.ar : room.description.en}</td>
                  <td className="p-3">{room.room_count}</td>
                  <td className="p-3 flex gap-2">
                    <button className="text-red-500" onClick={() => openModal(room.id)}>✏️</button>
                    <button className="text-red-500" onClick={() => handleDeleteRoom(room.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-400">No rooms available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddRoomTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roomTypeId={selectedRoomType} />
    </div>
  );
} 