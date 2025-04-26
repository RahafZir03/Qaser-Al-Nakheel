/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { addRoomType, getRoomTypeById, updateRoomType } from "../../api/endpoints/room";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
const AddRoomTypeModal = ({ isOpen, onClose, roomTypeId }) => {
  const [roomTypeData, setRoomTypeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

  useEffect(() => {
    if (!roomTypeId) {
      setRoomTypeData({
        name: { en: "", ar: "" },
        description: { en: "", ar: "" }
      });
    } else {
      async function fetchRoomType() {
        setLoading(true);
        try {
          const response = await getRoomTypeById(roomTypeId);
          setRoomTypeData(response.data);
        } catch (err) {
          console.error("Error fetching room type:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchRoomType();
    }
  }, [roomTypeId]);

  const formik = useFormik({
    initialValues: {
      name_en: roomTypeData?.name?.en || "",
      name_ar: roomTypeData?.name?.ar || "",
      description_en: roomTypeData?.description?.en || "",
      description_ar: roomTypeData?.description?.ar || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      let response;
      if (roomTypeId) {
        response = await updateRoomType(roomTypeId, values);
        toast.success(response.data.message || "Room type updated successfully.");
      } else {
        response = await addRoomType(values);
        //window.location.reload();
        toast.success(response.data.message || "Room type added successfully.");
      }
      setTimeout(onClose, 2000);

      setLoading(false);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-admin-color bg-opacity-50 z-50 text-black">
      <div className="bg-admin-color p-6 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold"> {!roomTypeId ? t('addRoomType') : t('updateRoomType')}</h2> 
         <button onClick={onClose} className="text-red-500 font-bold text-xl">&times;</button>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          {/* Name Fields */}
          <div className="mb-4">
            <label className="block font-medium text-white">{t('roomNameEnglish')}</label>
            <input
              type="text"
              name="name_en"
              value={formik.values.name_en}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded bg-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-white">{t("roomNamearabic")}</label>
            <input
              type="text"
              name="name_ar"
              value={formik.values.name_ar}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded text-right"
              required
            />
          </div>
          {/* Description Fields */}
          <div className="mb-4">
            <label className="block font-medium text-white">{t("roomDescriptionEnglish")}</label>
            <textarea
              name="description_en"
              value={formik.values.description_en}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-white">{t("roomDescriptionArabic")}</label>
            <textarea
              name="description_ar"
              value={formik.values.description_ar}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded text-right"
              required
            />
          </div>
          {!roomTypeId ? (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? t('adding') : t('newRoomType')}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? t('updating') : t('updateRoomType')}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddRoomTypeModal;
