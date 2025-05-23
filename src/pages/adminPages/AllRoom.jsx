/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRoomsNotAllData, getRoomById, toggleActive, deleteRoomById } from "../../api/endpoints/room";
import { toast } from "react-toastify";
import RoomModal from "../../components/organism/RoomModal";
import { useTranslation } from 'react-i18next';
import SpecialPrice from "../../components/molecule/SpecialPrice";
import AdminRoomCard from "../../components/molecule/AdminRoomCard";
import PaginationRounded from "../../components/molecule/PaginationRounded";

export default function AllRoom() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSpecialOpen, setIsSpecialOpen] = useState(false);
    const [selectedRoomIdForSpecial, setSelectedRoomIdForSpecial] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const isArabic = i18n.language === "ar";

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await getAllRoomsNotAllData({
                searchQuery,
                page,
                limit: 6
            });

            console.log("Rooms from API:", response.data.rooms);
            if (response?.data?.rooms && Array.isArray(response.data.rooms)) {
                setFilteredRooms(response.data.rooms);
                setTotalCount(response.data.totalPages);
                setError(null);
            } else {
                setError(t('all_rooms.no_data_error'));
                setFilteredRooms([]);
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setError(error.response?.data?.message || error.message || t('all_rooms.fetch_error'));
            setFilteredRooms([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
    fetchRooms();
}, [page, searchQuery]);

    const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
        setSearchQuery("");
        setPage(1);
        setIsSearchActive(false);
        return;
    }

    setSearchQuery(inputValue.trim()); // ← فقط الآن نحدّث searchQuery الفعلي
    setPage(1);
    setIsSearchActive(true);
};
    const handleClearSearch = () => {
    setInputValue("");
    setSearchQuery("");
    setPage(1);
    setIsSearchActive(false);
};

    const handleViewRoom = async (roomId) => {
        const response = await getRoomById(roomId);
        setSelectedRoom(response.data);
    };

    const handleRoomActive = async (roomId) => {
        const response = await toggleActive(roomId);
        toast.success(response.data.message);
        if (response.status === 200) {
            setFilteredRooms(prevRooms =>
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
            setFilteredRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
        }
    };

    const handleSpecialPrice = (roomId) => {
        setSelectedRoomIdForSpecial(roomId);
        setIsSpecialOpen(true);
    };

    return (
        <div className="p-4 md:p-8 bg-admin-color">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h1 className="text-2xl font-semibold text-white">{t('all_rooms.title')}</h1>
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center max-w-sm mx-auto">
                        <label htmlFor="simple-search" className="sr-only">{t('all_rooms.search')}</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('all_rooms.search_placeholder')}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">{t('all_rooms.search')}</span>
                        </button>
                        {isSearchActive && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="p-2.5 ms-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
                            >
                                {t('all_rooms.clear_search')}
                            </button>
                        )}
                    </form>

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

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="ml-4 text-white">{t('all_rooms.loading')}</span>
                </div>
            ) : filteredRooms.length === 0 && !isSearchActive ? (
                <div className="text-center text-gray-400 p-8">
                    {t('all_rooms.no_rooms')}
                </div>
            ) : filteredRooms.length === 0 && isSearchActive ? (
                <div className="text-center text-gray-400 p-8">
                    {t('all_rooms.no_results_for')} &quot;{searchQuery}&quot;
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRooms.map((room) => (
                        <AdminRoomCard
                            key={room.id}
                            room={room}
                            handleViewRoom={handleViewRoom} // تم تمرير الدالة هنا
                            handleRoomActive={handleRoomActive}
                            handleDeleteRoom={handleDeleteRoom}
                            handleSpecialPrice={handleSpecialPrice}
                            isArabic={isArabic}
                        />
                    ))}
                </div>
            )}

            {selectedRoom &&
                <RoomModal room={selectedRoom.room} onClose={() => setSelectedRoom(null)} />
            }
            {isSpecialOpen && (
                <SpecialPrice
                    isOpen={isSpecialOpen}
                    onClose={() => {
                        setIsSpecialOpen(false);
                        setSelectedRoomIdForSpecial(null);
                    }}
                    roomId={selectedRoomIdForSpecial}
                />
            )}
            {/* Pagination */}
            {!loading && totalCount > 1 && (
                <div className="mt-6 flex justify-center">
                    <PaginationRounded
                        count={totalCount}
                        page={page}
                        onChange={(e, value) => {
                            setPage(value);
                        }}
                        theme="dark"
                    />
                </div>
            )}
        </div>
    );
}