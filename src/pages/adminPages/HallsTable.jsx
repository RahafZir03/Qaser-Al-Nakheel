import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllHalls } from "../../api/endpoints/halls";
import i18next from "i18next";

export default function HallsTable() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchHalls = async () => {
    try {
      const res = await getAllHalls();
      console.log(res.data);
      setHalls(res.data.halls);
    } catch  {
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

  useEffect(() => {
    fetchHalls();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-admin-color">
      <h1 className="text-2xl font-semibold text-white mb-4">قائمة القاعات</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-white">
            جار التحميل...
          </div>
        ) : halls.length === 0 ? (
          <div className="col-span-full text-center text-white">
            لا توجد قاعات
          </div>
        ) : (
          halls.map((hall) => (
            <div
              key={hall.id}
              className="bg-my-color text-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.02]"
            >
              {/* صورة */}
              <img
                src={
                  hall.images.find((img) => img.main)?.image_name_url ||
                  hall.images[0]?.image_name_url
                }
                alt="صورة القاعة"
                className="w-full h-48 object-cover"
              />

              {/* محتوى */}
              <div className="p-4 ">
                <h2 className="text-lg font-bold mb-1">
                  {hall.name[i18next.language || "en"]}
                </h2>
                <p className="text-sm mb-2">
                  <strong>السعر/ساعة:</strong> {hall.price_per_hour} ر.س
                </p>
                <p className="text-sm mb-2">
                  <strong>الحالة:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      hall.availability_status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hall.availability_status === "available"
                      ? "متاحة"
                      : "غير متاحة"}
                  </span>
                </p>
                <p className="text-sm mb-2">
                  <strong>النوع:</strong> {hall.type}
                </p>
                <p className="text-sm mb-2">
                  <strong>الأبعاد:</strong> {hall.length}م × {hall.width}م
                </p>
                <p className="text-sm mb-2">
                  <strong>التقييم:</strong> ⭐ {hall.rating}
                </p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedHall(hall);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    تفاصيل
                  </button>

                  <button
                    onClick={() =>
                      handleToggleStatus(hall.id, hall.availability_status)
                    }
                    className={`px-3 py-1 text-sm rounded font-semibold ${
                      hall.availability_status === "available"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {hall.availability_status === "available"
                      ? "إلغاء التفعيل"
                      : "تفعيل"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal يدوي لتفاصيل القاعة */}
      {showModal && selectedHall && (
        <div className="fixed inset-0 z-50 bg-black text-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-my-color rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 left-2 text-gray-600 hover:text-red-500 text-2xl"
            >
              ×
            </button>

            {/* عنوان */}
            <h3 className="text-2xl font-bold mb-4 text-my-color text-center">
              {selectedHall.name.ar} / {selectedHall.name.en}
            </h3>

            {/* صورة رئيسية */}
            <img
              src={
                selectedHall.images.find((img) => img.main)?.image_name_url ||
                selectedHall.images[0]?.image_name_url
              }
              alt="صورة القاعة"
              className="w-full h-64 object-cover rounded mb-4"
            />

            {/* معلومات عامة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <p>
                <strong>الحالة:</strong>{" "}
                {selectedHall.availability_status === "available"
                  ? "متاحة"
                  : "غير متاحة"}
              </p>
              <p>
                <strong>النوع:</strong> {selectedHall.type}
              </p>
              <p>
                <strong>السعر/ساعة:</strong> {selectedHall.price_per_hour} ر.س
              </p>
              <p>
                <strong>الأبعاد:</strong> {selectedHall.length}م ×{" "}
                {selectedHall.width}م
              </p>
              <p>
                <strong>الاستخدام المناسب:</strong>{" "}
                {selectedHall.suitable_for.ar}
              </p>
              <p>
                <strong>التقييم:</strong> ⭐ {selectedHall.averageRating} (
                {selectedHall.ratingCount} تقييم)
              </p>
            </div>

            {/* الوصف */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-sec-color-100">
                الوصف:
              </h4>
              <p className="text-gray-200 whitespace-pre-line">
                {selectedHall.description.ar}
              </p>
            </div>

            {/* السعة */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-sec-color-100">
                أنماط السعة:
              </h4>
              <ul className="list-disc ps-5">
                {selectedHall.capacity.map((c, i) => {
                  try {
                    const parsed = JSON.parse(c.replace(/(\w+):/g, '"$1":'));
                    return (
                      <li key={i}>
                        {parsed.type} : {parsed.capacity} شخص
                      </li>
                    );
                  } catch {
                    return <li key={i}>بيانات غير صالحة</li>;
                  }
                })}
              </ul>
            </div>

            {/* المرافق */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-sec-color-100 mb-2">
                المرافق:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedHall.facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="border rounded p-3 flex items-start gap-3"
                  >
                    {facility.image && (
                      <img
                        src={facility.image}
                        alt={facility.name.ar}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                    <div>
                      <p className="font-bold">{facility.name.ar}</p>
                      <p className="text-sm text-gray-600">
                        {facility.description.ar}
                      </p>
                    </div>
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
                {selectedHall.images.map((img) => (
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
      )}
    </div>
  );
}
