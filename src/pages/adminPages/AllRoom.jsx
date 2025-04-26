/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRoomsNotAllData, getRoomById, toggleActive, deleteRoomById } from "../../api/endpoints/room";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import RoomModal from "../../components/organism/RoomModal";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { GiPriceTag } from "react-icons/gi";
import SpecialPrice from "../../components/molecule/SpecialPrice";

export default function AllRoom() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSpecialOpen, setIsSpecialOpen] = useState(false);
    const [selectedRoomIdForSpecial, setSelectedRoomIdForSpecial] = useState(null);


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getAllRoomsNotAllData();
                console.log(response.data);

                if (response && response.data && Array.isArray(response.data.rooms)) {
                    setRooms(response.data.rooms);
                } else {
                    setError(t('all_rooms.no_data_error'));
                    setRooms([]);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError(error.response?.data?.message || error.message || t('all_rooms.fetch_error'));
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [t]);

    const handleViewRoom = async (roomId) => {
        const response = await getRoomById(roomId);
        setSelectedRoom(response.data);
    };

    const handleRoomActive = async (roomId) => {
        const response = await toggleActive(roomId);
        toast.success(response.data.message);
        if (response.status === 200) {
            setRooms(prevRooms =>
                prevRooms.map(room =>
                    room.id === roomId ? { ...room, isActive: !room.isActive } : room
                )
            );
        }
    };

    const handleDeleteRoom = async (roomId) => {
        const response = await deleteRoomById(roomId);
        if (response.status === 200) {
            toast.success(response.data.message);
            setRooms(prevRooms =>
                prevRooms.filter(room => room.id !== roomId)
            );
        }
    };

    return (
        <div className="p-4 md:p-8 bg-admin-color">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 ">
                <h1 className="text-2xl font-semibold text-white">{t('all_rooms.title')}</h1>
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/admin/createroom")}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {t('all_rooms.create_new')}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500 text-white p-4 rounded mb-4">
                    {error}
                    <button
                        onClick={() => window.location.reload()}
                        className="ml-4 underline"
                    >
                        {t('all_rooms.retry')}
                    </button>
                </div>
            )}

            <div className="overflow-x-auto bg-admin-color p-4 rounded">
                <table className="min-w-full text-white border bg-admin-color">
                    <thead>
                        <tr className="border-b bg-admin-color text-left">
                            <th className="p-2">{t('all_rooms.room_no')}</th>
                            <th className="p-2">{t('all_rooms.category')}</th>
                            <th className="p-2">{t('all_rooms.type')}</th>
                            <th className="p-2">{t('all_rooms.status')}</th>
                            <th className="p-2">{t('all_rooms.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-2 text-center text-gray-400">
                                    <div className="flex justify-center items-center">
                                        <span className="mr-2">{t('all_rooms.loading')}</span>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : rooms.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-2 text-center text-gray-400">
                                    {t('all_rooms.no_rooms')}
                                </td>
                            </tr>
                        ) : (
                            rooms.map((room) => (
                                <tr key={room.id} className="border-b border-gray-700 text-sm ">
                                    <td className="p-2 flex items-center gap-2">
                                        <img
                                            src={room.RoomImages?.[0]?.image_name_url}
                                            alt="Room"
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        {room.room_no}
                                    </td>
                                    <td className="p-2">
                                        {room.category?.[i18n.language] || t('all_rooms.not_available')}
                                    </td>
                                    <td className="p-2">
                                        {room.RoomType?.name?.[i18n.language] || t('all_rooms.not_available')}
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleRoomActive(room.id)}
                                            className={`px-4 py-1 rounded font-medium transition duration-200 ${room.isActive
                                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                                : "bg-red-100 text-red-600 hover:bg-red-200"
                                                }`}
                                        >
                                            {room.isActive ? t('all_rooms.active') : t('all_rooms.inactive')}
                                        </button>
                                    </td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            onClick={() => handleViewRoom(room.id)}
                                            className="text-blue-400 hover:underline flex items-center"
                                            title={t('all_rooms.view_details')}
                                        >
                                            <FaEye className="mr-1 hover:text-green-500" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room.id)}
                                            className="text-blue-400 hover:underline flex items-center"
                                            title={t('all_rooms.delete')}
                                        >
                                            <MdDelete className=" text-red-600 hover:text-red-400 text-lg" />
                                        </button>
                                        <Link to={`/admin/updateroom/${room.id}`} className="hover:rotate-12">✏️</Link>
                                        <button onClick={() => { setSelectedRoomIdForSpecial(room.id); setIsSpecialOpen(true); }} className="text-green-600 hover:scale-110 transition">
                                            <GiPriceTag size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedRoom &&
                <RoomModal room={selectedRoom.room} onClose={() => setSelectedRoom(null)} />
            }
            {isSpecialOpen && (
                <SpecialPrice
                    isOpen={isSpecialOpen}
                    onClose={() => {
                        setIsSpecialOpen(false);
                        setSelectedRoomIdForSpecial();
                    }}
                    roomId={selectedRoomIdForSpecial}
                />
                
            )}

        </div>
    );
}