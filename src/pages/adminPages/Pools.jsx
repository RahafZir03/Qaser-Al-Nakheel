import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllPools, deletePool, deletePoolFacilities } from "../../api/endpoints/pool";
import i18next from "i18next";
import { FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import AddPoolModal from "../../components/molecule/AddPool";
import AddFacilityModal from "../../components/molecule/AddFacilitypool";

import PoolImage from "../../components/molecule/Poolimage";
import UpdatePoolModal from "../../components/molecule/UpdatePool";
import { CiCircleRemove } from "react-icons/ci";


import { PlusIcon } from "lucide-react";


export default function PoolsTable() {
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPool, setSelectedPool] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [showAddPoolModal, setShowAddPoolModal] = useState(false);
    const [showFacilityModal, setShowFacilityModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showUpdatePoolModal, setShowUpdatePoolModal] = useState(false);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".dropdown-menu")) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchPools = async () => {
        try {
            const res = await getAllPools();
            console.log(res.data.pools);
            setPools(res.data.pools);
        } catch {
            toast.error("فشل في تحميل القاعات");
            setPools([]);
        } finally {
            setLoading(false);
        }
    };


    const handleDeletePool = async (poolId) => {
        if (!window.confirm("هل أنت متأكد من حذف هذه القاعة؟")) return;

        try {
            await deletePool(poolId);
            setPools((prev) => prev.filter((pool) => pool.id !== poolId));
            toast.success("تم حذف القاعة بنجاح");
        } catch (error) {
            console.error("Error deleting pool:", error);
            toast.error("فشل في حذف القاعة");
        }
    };

    useEffect(() => {
        fetchPools();
    }, []);

    return (
        <div className="p-4 md:p-8 bg-admin-color">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-white">List of Pools</h1>

                <button
                    onClick={() => {
                        setShowAddPoolModal(true);
                        setOpenDropdownId(null);
                    }}
                    className="text-white bg-sec-color-100 flex hover:bg-sec-color-200 focus:outline-none focus:ring-2 focus:ring-sec-color-200 focus:ring-opacity-50 rounded-lg px-4 py-2 transition duration-150"
                >
                    <PlusIcon /> Add Pool
                </button>
            </div>


            <div className={`grid ${pools.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} gap-8 transition-all duration-500`}>
                {loading ? (
                    <div className="col-span-full text-center text-white">Loading...</div>
                ) : pools.length === 0 ? (
                    <div className="col-span-full text-center text-white">There are no pools</div>
                ) : (
                    pools.map((pool) => (
                        <div
                            key={pool.id}
                            className={`relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 transform transition-all duration-500 hover:scale-[1.02] ${pools.length <= 2 ? "col-span-full" : ""
                                } animate-fade-in`}
                        >
                            <img
                                src={
                                    pool.images.find((img) => img.main)?.image_name_url ||
                                    pool.images[0]?.image_name_url
                                }
                                alt="pool photo"
                                className="w-full h-64 object-cover rounded-t-3xl"
                            />

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-white">
                                        {pool.name[i18next.language || "en"]}
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setOpenDropdownId(openDropdownId === pool.id ? null : pool.id)
                                        }
                                        className="text-white"
                                    >
                                        <FaEllipsisV className="text-xl" />
                                    </button>
                                </div>

                                <p className="text-white mb-2 text-base">
                                    💵 <strong>Entry Price:</strong> {pool.hourly_rate} ILS
                                </p>
                                <p className="text-white mb-2 text-base">
                                    📏 <strong>Size:</strong> {pool.size}
                                </p>
                                <p className="text-white mb-2 text-base">
                                    ⭐ <strong>Rating:</strong> {pool.averageRating}
                                </p>
                                <p className="text-white mb-2 text-base">
                                    🟢 <strong>Status:</strong> {pool.status === "available" ? "Available" : "Not available"}
                                </p>

                                <div className="mt-4">
                                    <button
                                        onClick={() => {
                                            setSelectedPool(pool);
                                            setShowModal(true);
                                            setOpenDropdownId(null);
                                        }}
                                        className="mt-2 inline-block px-6 py-2 bg-sec-color-100 hover:bg-sec-color-200 text-white rounded-full transition shadow-lg"
                                    >
                                        🔍 View Details
                                    </button>
                                </div>
                            </div>

                            {/* DropDown */}
                            {openDropdownId === pool.id && (
                                <div className={`dropdown-menu absolute top-20 z-50 ${i18next.language === "ar" ? "left-4" : "right-4"} bg-zinc-700 text-white rounded-xl shadow-xl w-52 p-3 space-y-2 animate-fade-in`}>
                                    <button onClick={() => {
                                        setSelectedPool(pool);
                                        setShowFacilityModal(true);
                                        setOpenDropdownId(null);
                                    }} className="w-full text-left hover:bg-sec-color-100 px-3 py-2 rounded-lg">
                                        ➕ Add Facility
                                    </button>
                                    <button onClick={() => {
                                        setSelectedPool(pool);
                                        setShowImageModal(true);
                                        setOpenDropdownId(null);
                                    }} className="w-full text-left hover:bg-sec-color-100 px-3 py-2 rounded-lg">
                                        🖼️ Pool Images
                                    </button>
                                    <button onClick={() => {
                                        setSelectedPool(pool);
                                        setShowUpdatePoolModal(true);
                                        setOpenDropdownId(null);
                                    }} className="w-full text-left hover:bg-sec-color-100 px-3 py-2 rounded-lg">
                                        ✏️ Edit
                                    </button>
                                    <button onClick={() => handleDeletePool(pool.id)} className="w-full text-left text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg">
                                        🗑️ Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Modal يدوي لتفاصيل القاعة */}
            {showModal && selectedPool && (
                <div className="fixed inset-0 z-[100] bg-black text-white bg-opacity-50 flex items-center justify-center">
                    <div className="bg-my-color relative shadow-lg max-w-4xl max-h-[90vh] rounded-lg w-full  ">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 left-4 text-gray-700 hover:text-red-500 z-10 bg-white/80 rounded-full w-10 h-10 p-1 flex items-center justify-center transition"
                        >
                            <CiCircleRemove className="text-4xl " />
                        </button>
                        <div className="  max-h-[90vh] relative shadow-lg p-6 overflow-y-auto">
                            {/* عنوان */}


                            {/* صورة رئيسية */}
                            <img
                                src={
                                    selectedPool.images.find((img) => img.main)?.image_name_url ||
                                    selectedPool.images[0]?.image_name_url
                                }
                                alt="صورة القاعة"
                                className="w-full h-64 object-cover rounded mb-4"
                            />

                            {/* معلومات عامة */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <h3 className="text-2xl font-bold mb-4 text-white text-center ">
                                    {selectedPool.name.ar} / {selectedPool.name.en}
                                </h3>
                                <p>
                                    <strong>الحالة:</strong>{" "}
                                    {selectedPool.status === "available"
                                        ? "متاحة"
                                        : "غير متاحة"}
                                </p>
                                <p>
                                    <strong>النوع:</strong> {selectedPool.pool_type}
                                </p>
                                <p>
                                    <strong>السعة:</strong> {selectedPool.max_capacity}
                                </p>
                                <p>
                                    <strong>سعر الدخول</strong> {selectedPool.hourly_rate} ر.س
                                </p>
                                <p>
                                    <strong>الأبعاد:</strong> {selectedPool.size}
                                </p>
                                <p>
                                    <strong>التقييم:</strong> ⭐ {selectedPool.averageRating} (
                                    {selectedPool.ratingCount} تقييم)
                                </p>
                            </div>

                            {/* الوصف */}
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-sec-color-100">
                                    الوصف:
                                </h4>
                                <p className="text-gray-200 whitespace-pre-line">
                                    {selectedPool.description.ar}
                                </p>
                            </div>


                            {/* المرافق */}
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-sec-color-100 mb-2">
                                    المرافق:
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {selectedPool.facilities.map((facility) => (
                                        <div
                                            key={facility.id}
                                            className="border border-gray-600 rounded-xl p-4 flex items-start gap-4 relative bg-zinc-700 shadow-sm hover:shadow-md transition"
                                        >
                                            {/* صورة المرفق */}
                                            {facility.image && (
                                                <img
                                                    src={facility.image}
                                                    alt={facility.name.ar}
                                                    className="w-14 h-14 object-cover rounded-lg border border-gray-500"
                                                />
                                            )}

                                            {/* نصوص المرفق */}
                                            <div className="flex-1 space-y-1">
                                                <p className="font-semibold text-white text-base">{facility.name.ar}</p>
                                                <p className="text-sm text-gray-400 leading-snug">
                                                    {facility.description.ar}
                                                </p>
                                            </div>

                                            {/* زر الحذف */}
                                            <button
                                                onClick={async () => {
                                                    if (window.confirm("هل تريد حذف هذا المرفق؟")) {
                                                        try {
                                                            await deletePoolFacilities(facility.id);
                                                            setSelectedPool((prev) => ({
                                                                ...prev,
                                                                facilities: prev.facilities.filter((f) => f.id !== facility.id),
                                                            }));
                                                            toast.success("تم حذف المرفق بنجاح");
                                                        } catch (err) {
                                                            console.error(err);
                                                            toast.error("فشل في حذف المرفق");
                                                        }
                                                    }
                                                }}
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-600 w-9 h-9 rounded-full flex items-center justify-center transition"
                                                title="حذف المرفق"
                                            >
                                                <FaTrashAlt className="text-lg" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* صور إضافية */}
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold text-sec-color-100 mb-2">
                                    صور إضافية:
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {selectedPool.images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={img.image_name_url}
                                            alt="صورة"
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showAddPoolModal && (
                <AddPoolModal
                    onClose={() => setShowAddPoolModal(false)}
                    onAdded={() => {
                        // تحدّث القائمة إذا لزم الأمر
                        fetchPools(); // أو ضف العنصر مباشرة إلى الـ state
                    }}
                />
            )}
            {showFacilityModal && selectedPool && (
                <AddFacilityModal
                    poolId={selectedPool.id}
                    onClose={() => setShowFacilityModal(false)}
                    onFacilityAdded={(newFacility) => {
                        // نضيف المرفق الجديد إلى قائمة المرافق في الـ Details
                        setSelectedPool((prev) => ({
                            ...prev,
                            facilities: [...prev.facilities, newFacility],
                        }));
                    }}
                />
            )}
            {showImageModal && selectedPool && (
                <PoolImage
                    isOpen={showImageModal}
                    onClose={() => setShowImageModal(false)}
                    poolId={selectedPool.id}
                    mainImageData={selectedPool.images.find(img => img.main)?.id} // Pass main image ID
                    imageUrl={selectedPool.images.find(img => img.main) || selectedPool.images[0]} // Main image URL
                    secondaryImages={selectedPool.images.filter(img => !img.main)} // Secondary images
                />
            )}
            {showUpdatePoolModal && selectedPool && (
                <UpdatePoolModal
                    poolId={selectedPool.id}
                    onClose={() => setShowUpdatePoolModal(false)}
                    onUpdated={() => {
                        fetchPools(); // لتحديث البيانات بعد الحفظ
                    }}
                />
            )}

        </div>
    );
}
