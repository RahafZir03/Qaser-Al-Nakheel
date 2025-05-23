import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllHalls } from "../../api/endpoints/halls";
import i18next from "i18next";
import { FaEye, FaToggleOn, FaToggleOff, FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import AddHallModal from "../../components/molecule/AddHall";
import AddFacilityModal from "../../components/molecule/AddFacilityModal";
import { deleteHall } from "../../api/endpoints/halls";
import { deleteFacilityFromHall } from "../../api/endpoints/halls";
import HallImage from "../../components/molecule/Hallimage";
import UpdateHallModal from "../../components/molecule/Updatehall";
import { CiCircleRemove } from "react-icons/ci";
import { PlusIcon } from "lucide-react";


export default function HallsTable() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showAddHallModal, setShowAddHallModal] = useState(false);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showUpdateHallModal, setShowUpdateHallModal] = useState(false);





  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-menu")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchHalls = async () => {
    try {
      const res = await getAllHalls();
      console.log(res.data);
      setHalls(res.data.halls);
    } catch {
      toast.error("فشل في تحميل القاعات");
      setHalls([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "available" ? "unavailable" : "available";
    try {
      await fetch(`/api/halls/${id}/toggle-status`, { method: "PATCH" });
      setHalls((prev) =>
        prev.map((hall) =>
          hall.id === id ? { ...hall, availability_status: newStatus } : hall
        )
      );
      toast.success("تم تغيير الحالة");
    } catch {
      toast.error("فشل تغيير الحالة");
    }
  };
  const handleDeleteHall = async (hallId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه القاعة؟")) return;

    try {
      await deleteHall(hallId);
      setHalls((prev) => prev.filter((hall) => hall.id !== hallId));
      toast.success("تم حذف القاعة بنجاح");
    } catch (error) {
      console.error("Error deleting hall:", error);
      toast.error("فشل في حذف القاعة");
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-admin-color">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">List of halls</h1>

        <button
          onClick={() => {
            setShowAddHallModal(true);
            setOpenDropdownId(null);
          }}
          className="text-white bg-sec-color-100 flex hover:bg-sec-color-200 focus:outline-none focus:ring-2 focus:ring-sec-color-200 focus:ring-opacity-50 rounded-lg px-4 py-2 transition duration-150"
        >
          <PlusIcon /> Add Hall
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-white">
            Loading...
          </div>
        ) : halls.length === 0 ? (
          <div className="col-span-full text-center text-white">
            There are no halls
          </div>
        ) : (
          halls.map((hall) => (
            <div
              key={hall.id}
              className={`bg-gray-800 text-white rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.02] relative overflow-visible border border-sec-color-100 p-4 ${openDropdownId === hall.id ? "z-40" : "z-10"
                }`}
            >
              {/* صورة */}
              <img
                src={
                  hall.images.find((img) => img.main)?.image_name_url ||
                  hall.images[0]?.image_name_url
                }
                alt=" Hall photo"
                className="w-full h-64 object-cover rounded-t-3xl"
              />

              {/* محتوى */}
              <div className="p-4 ">
                <div className="flex justify-between items-center mb-1 relative ">
                  <h2 className="text-2xl font-bold">
                    {hall.name[i18next.language || "en"]}
                  </h2>

                  <div className="relative flex flex-col">
                    <button
                      className="text-white focus:outline-none"
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === hall.id ? null : hall.id)
                      }
                    >
                      <FaEllipsisV className="text-xl" />
                    </button>

                    {openDropdownId === hall.id && (
                      <div
                        className={`dropdown-menu absolute top-full mt-2 ${i18next.language === "ar" ? "left-0" : "right-0"
                          } bg-zinc-600 text-white rounded-xl shadow-lg w-44 z-50 overflow-hidden`}
                      >
                        <button
                          onClick={() => {
                            setSelectedHall(hall);
                            setShowModal(true);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-sec-color-100 transition duration-150"
                        >
                          <FaEye className="mr-2" /> Details
                        </button>
                        <button
                          onClick={() => {
                            handleToggleStatus(hall.id, hall.availability_status);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-sec-color-100 transition duration-150"
                        >
                          {hall.availability_status === "available" ? (
                            <>
                              <FaToggleOff className="mr-2" /> Deactivate
                            </>
                          ) : (
                            <>
                              <FaToggleOn className="mr-2" /> Activate
                            </>
                          )}
                        </button>
                        {/* Add more actions here if needed */}
                        <button
                          onClick={() => {
                            setSelectedHall(hall); // مهم لتمرير hallId
                            setShowFacilityModal(true);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-sec-color-100 transition duration-150"
                        >
                          ➕ Add Facility
                        </button>
                        <button
                          onClick={() => {
                            setSelectedHall(hall);
                            setShowImageModal(true);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-sec-color-100 transition duration-150"
                        >
                          🖼️ Hall Image
                        </button>
                        <button
                          onClick={() => {
                            setSelectedHall(hall);
                            setShowUpdateHallModal(true);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-sec-color-100 transition duration-150"
                        >
                          ✏️ Edit Hall
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteHall(hall.id);
                            setOpenDropdownId(null);
                          }}
                          className="flex items-center w-full px-4 py-2 hover:bg-red-500 transition duration-150 text-red-200"
                        >
                          🗑 Delete
                        </button>

                      </div>
                    )}
                  </div>
                </div>
                <p className="text-lg mb-2">
                   💰<strong>Price/hour:</strong> {hall.price_per_hour}ILS
                </p>
                <p className="text-lg mb-2">
                  🟢<strong>Status :</strong>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${hall.availability_status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {hall.availability_status === "available"
                      ? "Available"
                      : "Not available "}
                  </span>
                </p>
                <p className="text-lg mb-2">
                 🏷️ <strong>Type :</strong> {hall.type}
                </p>
                <p className="text-lg mb-2">
                  📏 <strong>Dimensions :</strong> {hall.length}م × {hall.width}م
                </p>
                <p className="text-lg mb-2">
                  ⭐<strong>Evaluation:</strong> ⭐ {hall.rating}
                </p>


              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal يدوي لتفاصيل القاعة */}
      {showModal && selectedHall && (
        <div className="fixed inset-0 z-[130] bg-black text-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-admin-color relative shadow-lg max-w-4xl max-h-[90vh] rounded-lg w-full border border-sec-color-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-gray-700 hover:text-red-500 z-10 bg-white/80 rounded-full w-10 h-10 p-1 flex items-center justify-center transition"
            >
              <CiCircleRemove className="text-4xl " />
            </button>
            <div className="  max-h-[90vh] relative shadow-lg p-6 overflow-y-auto">
              {/* عنوان */}
              <h3 className="text-2xl font-bold mb-4 text-white text-center ">
                {selectedHall.name.ar} / {selectedHall.name.en}
              </h3>

              {/* صورة رئيسية */}
              <img
                src={
                  selectedHall.images.find((img) => img.main)?.image_name_url ||
                  selectedHall.images[0]?.image_name_url
                }
                alt="صورة القاعة"
                className="w-full h-64 object-cover rounded mb-4 border border-sec-color-100"
              />

              {/* معلومات عامة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <p>
                  <strong className="text-sec-color-100">Status:</strong>{" "}
                  {selectedHall.availability_status === "available"
                    ? "متاحة"
                    : "غير متاحة"}
                </p>
                <p>
                  <strong className="text-sec-color-100">Type:</strong> {selectedHall.type}
                </p>
                <p >
                  <strong className="text-sec-color-100">Price/hour:</strong> {selectedHall.price_per_hour} ILS
                </p>
                <p>
                  <strong className="text-sec-color-100">Dimensions:</strong> {selectedHall.length}م ×{" "}
                  {selectedHall.width}م
                </p>
                <p>
                  <strong className="text-sec-color-100">Appropriate use :</strong>{" "}
                  {selectedHall.suitable_for.ar}
                </p>
                <p>
                  <strong className="text-sec-color-100">Evaluation:</strong> ⭐ {selectedHall.averageRating} (
                  {selectedHall.ratingCount} evaluation)
                </p>
              </div>

              {/* الوصف */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-sec-color-100">
                  Description:
                </h4>
                <p className="text-gray-200 whitespace-pre-line">
                  {selectedHall.description.ar}
                </p>
              </div>

              {/* السعة */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-sec-color-100">
                  Capacity patterns:
                </h4>
                <ul className="list-disc ps-5">
                  {(Array.isArray(selectedHall.capacity)
                    ? selectedHall.capacity
                    : (() => {
                      try {
                        return JSON.parse(selectedHall.capacity);
                      } catch {
                        return [];
                      }
                    })()
                  ).map((c, i) => {
                    if (i > 5) return null;
                    return (
                      <li key={i}>
                        {c.type} : {c.capacity} شخص
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* المرافق */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-sec-color-100 mb-2">
                  Facilities:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedHall.facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="border border-sec-color-100 rounded-xl p-4 flex items-start gap-4 relative bg-zinc-700 shadow-sm hover:shadow-md transition"
                    >
                      {/* صورة المرفق */}
                      {facility.image && (
                        <img
                          src={facility.image}
                          alt={facility.name.ar}
                          className="w-14 h-14 object-cover rounded-lg border border-sec-color-100"
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
                              await deleteFacilityFromHall(facility.id);
                              setSelectedHall((prev) => ({
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
                  Additional Images:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedHall.images.map((img) => (
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
      {showAddHallModal && (
        <AddHallModal
          onClose={() => setShowAddHallModal(false)}
          onAdded={() => {
            // تحدّث القائمة إذا لزم الأمر
            fetchHalls(); // أو ضف العنصر مباشرة إلى الـ state
          }}
        />
      )}
      {showFacilityModal && selectedHall && (
        <AddFacilityModal
          hallId={selectedHall.id}
          onClose={() => setShowFacilityModal(false)}
          onFacilityAdded={(newFacility) => {
            // نضيف المرفق الجديد إلى قائمة المرافق في الـ Details
            setSelectedHall((prev) => ({
              ...prev,
              facilities: [...prev.facilities, newFacility],
            }));
          }}
        />
      )}
      {showImageModal && selectedHall && (
        <HallImage
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          hallId={selectedHall.id}
          mainImageData={selectedHall.images.find(img => img.main)?.id} // Pass main image ID
          imageUrl={selectedHall.images.find(img => img.main) || selectedHall.images[0]} // Main image URL
          secondaryImages={selectedHall.images.filter(img => !img.main)} // Secondary images
        />
      )}
      {showUpdateHallModal && selectedHall && (
        <UpdateHallModal
          hallId={selectedHall.id}
          onClose={() => setShowUpdateHallModal(false)}
          onUpdated={() => {
            fetchHalls(); // لتحديث البيانات بعد الحفظ
          }}
        />
      )}

    </div>
  );
}
