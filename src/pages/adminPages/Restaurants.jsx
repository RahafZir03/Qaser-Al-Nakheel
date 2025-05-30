import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllRestaurants, deleteRestaurant } from "../../api/endpoints/restaurant";
import i18next from "i18next";
import { FaEllipsisV } from "react-icons/fa";
import AddRestaurantModal from "../../components/molecule/AddRestaurant";
import RestaurantImage from "../../components/molecule/Restaurantimage";
import UpdateRestaurantModal from "../../components/molecule/UpdateRestaurant";
import { CiCircleRemove } from "react-icons/ci";
import { PlusIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function RestaurantTable() {
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showUpdateRestuarantModal, setShowUpdateRestaurantModal] = useState(false);
    const { t } = useTranslation("restaurants");
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".dropdown-menu")) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchRestaurant = async () => {
        try {
            const res = await getAllRestaurants();
            setRestaurant(res.data);
        } catch {
            toast.error(t("restaurant.failed"));
            setRestaurant([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRestaurant = async (restaurantId) => {
        if (!window.confirm(t("restaurant.Cdelete"))) return;

        try {
            await deleteRestaurant(restaurantId);
            setRestaurant((prev) => prev.filter((restaurant) => restaurant.id !== restaurantId));
            toast.success(t("restaurant.deletesuccess"));
        } catch (error) {
            console.error("Error deleting restaurant:", error);
            toast.error(t("restaurant.deletefailed"));
        }
    };

    useEffect(() => {
        fetchRestaurant();
    }, []);

    return (
        <div className="p-4 md:p-8 bg-admin-color">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-white">{t("restaurant.list")}</h1>
                <button
                    onClick={() => {
                        setShowAddRestaurantModal(true);
                        setOpenDropdownId(null);
                    }}
                    className="text-white bg-sec-color-100 flex hover:bg-sec-color-200 focus:outline-none focus:ring-2 focus:ring-sec-color-200 focus:ring-opacity-50 rounded-lg px-4 py-2 transition duration-150"
                >
                    <PlusIcon /> {t("restaurant.addres")}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6  p-4 rounded-lg">
                {loading ? (
                    <div className="col-span-full text-center text-white">{t("restaurant.load")}</div>
                ) : restaurant.length === 0 ? (
                    <div className="col-span-full text-center text-white">{t("restaurant.nores")}</div>
                ) : (
                    restaurant.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-800 text-white border border-sec-color-100 transform transition-all duration-500 hover:scale-[1.02] w-full"
                        >
                            <img
                                src={
                                    restaurant.images.find((img) => img.main)?.image_name_url ||
                                    restaurant.images[0]?.image_name_url
                                }
                                alt="restaurant"
                                className="w-full h-64 object-cover rounded-t-3xl"
                            />
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-white">
                                        {restaurant.name[i18next.language || "en"]}
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setOpenDropdownId(openDropdownId === restaurant.id ? null : restaurant.id)
                                        }
                                        className="text-white"
                                    >
                                        <FaEllipsisV className="text-xl" />
                                    </button>
                                </div>
                                <p className="text-white  mb-1 text-lg">
                                     <strong >{restaurant.name[i18next.language || "en"]}</strong>
                                </p>
                                <p className="text-white text-lg mb-1">
                                     <strong>{t("restaurant.hours")}:</strong> {restaurant.Opening_hours}
                                </p>
                                <p className="text-white text-lg mb-1">
                                    <strong>{t("restaurant.cuisine")}:</strong> {restaurant.Cuisine_type?.[i18next.language || "en"]}
                                </p>
                                <p className="text-white text-lg mb-2">
                                     <strong>{t("restaurant.rating")}:</strong> {restaurant.averageRating}
                                </p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => {
                                            setSelectedRestaurant(restaurant);
                                            setShowModal(true);
                                            setOpenDropdownId(null);
                                        }}
                                        className="mt-2 inline-block px-6 py-2 bg-sec-color-100 hover:bg-sec-color-200 text-white rounded-full transition shadow-lg"
                                    >
                                        🔍 {t("restaurant.view")}
                                    </button>
                                </div>
                            </div>

                            {openDropdownId === restaurant.id && (
                                <div className={`dropdown-menu absolute top-20 z-50 ${i18next.language === "ar" ? "left-4" : "right-4"} bg-zinc-700 text-white rounded-xl shadow-xl w-52 p-3 space-y-2 animate-fade-in`}>
                                    <button
                                        onClick={() => {
                                            setSelectedRestaurant(restaurant);
                                            setShowImageModal(true);
                                            setOpenDropdownId(null);
                                        }}
                                        className="w-full text-left hover:bg-sec-color-100 px-3 py-2 rounded-lg"
                                    >
                                        🖼️ {t("restaurant.image")}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedRestaurant(restaurant);
                                            setShowUpdateRestaurantModal(true);
                                            setOpenDropdownId(null);
                                        }}
                                        className="w-full text-left hover:bg-sec-color-100 px-3 py-2 rounded-lg"
                                    >
                                        ✏️{t("restaurant.edit")}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRestaurant(restaurant.id)}
                                        className="w-full text-left text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg"
                                    >
                                        🗑️{t("restaurant.delete")}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>


            {showModal && selectedRestaurant && (
                <div className="fixed inset-0 z-[130] bg-black text-white bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-admin-color relative shadow-lg max-w-4xl max-h-[90vh] rounded-lg w-full border border-sec-color-100">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 left-4 text-gray-700 hover:text-red-500 z-10 bg-white/80 rounded-full w-10 h-10 p-1 flex items-center justify-center transition"
                        >
                            <CiCircleRemove className="text-4xl" />
                        </button>
                        <div className="max-h-[90vh] relative shadow-lg p-6 overflow-y-auto">
                            <img
                                src={
                                    selectedRestaurant.images.find((img) => img.main)?.image_name_url ||
                                    selectedRestaurant.images[0]?.image_name_url
                                }
                                alt="صورة المطعم"
                                className="w-full h-64 object-cover rounded mb-4 border border-sec-color-100"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <h3 className="text-2xl font-bold mb-4 text-white text-center col-span-full">
                                    {selectedRestaurant.name.ar} / {selectedRestaurant.name.en}
                                </h3>
                                <p >
                                    <strong className="text-sec-color-100">{t("restaurant.cuisine")}:</strong> {selectedRestaurant.Cuisine_type.en} / {selectedRestaurant.Cuisine_type.ar}
                                </p>
                                <p>
                                    <strong className="text-sec-color-100">{t("restaurant.capacity")}:</strong> {selectedRestaurant.capacity}
                                </p>
                                <p>
                                    <strong className="text-sec-color-100">{t("restaurant.hours")}:</strong> {selectedRestaurant.Opening_hours}
                                </p>
                                <p>
                                    <strong className="text-sec-color-100">{t("restaurant.rating")}:</strong> ⭐ {selectedRestaurant.averageRating} (
                                    {selectedRestaurant.ratingCount} )
                                </p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-sec-color-100">{t("restaurant.description")}:</h4>
                                <p className="text-gray-200 whitespace-pre-line">
                                    {selectedRestaurant.description.ar}/ {selectedRestaurant.description.en}
                                </p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-sec-color-100 mb-2">{t("restaurant.additionalimages")}:</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {selectedRestaurant.images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={img.image_name_url}
                                            alt="صورة"
                                            className="w-full h-32 object-cover rounded border border-sec-color-100"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddRestaurantModal && (
                <AddRestaurantModal
                    onClose={() => setShowAddRestaurantModal(false)}
                    onAdded={() => fetchRestaurant()}
                />
            )}

            {showImageModal && selectedRestaurant && (
                <RestaurantImage
                    isOpen={showImageModal}
                    onClose={() => setShowImageModal(false)}
                    restaurantId={selectedRestaurant.id}
                    mainImageData={selectedRestaurant.images.find(img => img.main)?.id}
                    imageUrl={selectedRestaurant.images.find(img => img.main) || selectedRestaurant.images[0]}
                    secondaryImages={selectedRestaurant.images.filter(img => !img.main)}
                />
            )}

            {showUpdateRestuarantModal && selectedRestaurant && (
                <UpdateRestaurantModal
                    restaurantId={selectedRestaurant.id}
                    onClose={() => setShowUpdateRestaurantModal(false)}
                    onUpdated={() => fetchRestaurant()}
                />
            )}
        </div>
    );
}
