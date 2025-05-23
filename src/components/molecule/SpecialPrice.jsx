/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllSpecialPriceById, addSpecialPrice, updateSpecialPrice } from "../../api/endpoints/room";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import SpecialPriceItem from "../organism/SpecialPriceItem";
import { IoMdCloseCircleOutline } from "react-icons/io";
const SpecialPrice = ({ isOpen, onClose, roomId }) => {
  const { t, i18n } = useTranslation("specialprice");
  const lang = i18n.language || "en";
  const [specialPrices, setSpecialPrices] = useState([]);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [loading, setLoading] = useState(false);



  async function fetchPrices() {
    try {
      const response = await getAllSpecialPriceById(roomId);
      const data = response.data;

      // تأكد أن البيانات مصفوفة، وإلا خليها مصفوفة فاضية
      setSpecialPrices(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(t("specialprice.fetchError"));
      console.error(err);
      setSpecialPrices([]); // fallback حتى لو فشل الطلب
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchPrices();
    }
  }, [t, isOpen]);

  const formik = useFormik({
    initialValues: {
      room_id: String(roomId || ""),
      name_ar: "",
      name_en: "",
      description_ar: "",
      description_en: "",
      start_date: "",
      end_date: "",
      price: ""
    },
    validationSchema: Yup.object({
      room_id: Yup.string().required("رقم الغرفة مطلوب"),
      name_ar: Yup.string().required("الاسم بالعربية مطلوب"),
      name_en: Yup.string().required("الاسم بالإنجليزية مطلوب"),
      description_ar: Yup.string().required("الوصف بالعربية مطلوب"),
      description_en: Yup.string().required("الوصف بالإنجليزية مطلوب"),
      start_date: Yup.date().required("تاريخ البداية مطلوب"),
      end_date: Yup.date().required("تاريخ النهاية مطلوب"),
      price: Yup.number().required("السعر مطلوب").positive("السعر يجب أن يكون موجب"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formatDateOnly = (dateStr) => {
        try {
          const d = new Date(dateStr);
          if (isNaN(d)) return "";
          return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
        } catch {
          return "";
        }
      };

      setLoading(true);
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // حذف الوقت للمقارنة الدقيقة

        const startDate = new Date(values.start_date);
        const endDate = new Date(values.end_date);

        if (startDate < today || endDate < today) {
          toast.error(t("specialprice.invalidDates"))
          setLoading(false);
          return;
        }

        const payload = {
          room_id: String(values.room_id),
          name_ar: values.name_ar,
          name_en: values.name_en,
          description_ar: values.description_ar,
          description_en: values.description_en,
          start_date: formatDateOnly(values.start_date),
          end_date: formatDateOnly(values.end_date),
          price: Number(values.price),
        };

        if (editingPriceId) {
          await updateSpecialPrice(editingPriceId, payload); // This sends the special price ID
          toast.success(t("specialprice.updateSuccess"))
          console.log("editingPriceId:", editingPriceId);

        } else {
          await addSpecialPrice(payload); // This sends the room ID for creating a new special price
          toast.success(t("specialprice.addSuccess"))
        }

        fetchPrices();
        resetForm();
        setEditingPriceId(null);
      } catch (error) {
        toast.error(t("specialprice.saveError"))
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

  });


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-admin-color  bg-opacity-90 z-[130]">
      <div className="bg-admin-color p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2  border-sec-color-100">
        <div className="flex relative justify-between mb-4 text-white">
          <h2 className="text-3xl font-extrabold mb-8 text-center border-b border-gray-700 pb-4">{editingPriceId ? t("specialprice.updateTitle") : t("specialprice.addTitle")}</h2>
          <button onClick={onClose} className="absolute right-0  text-2xl text-red-500 transition">
            <IoMdCloseCircleOutline size={35} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white">{t("specialprice.nameAr")}</label>
              <input
                type="text"
                name="name_ar"
                value={formik.values.name_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
              />
              {formik.touched.name_ar && formik.errors.name_ar && (
                <p className="text-red-500 text-sm">{formik.errors.name_ar}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-white">{t("specialprice.nameEn")}</label>
              <input
                type="text"
                name="name_en"
                value={formik.values.name_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
              />
              {formik.touched.name_en && formik.errors.name_en && (
                <p className="text-red-500 text-sm">{formik.errors.name_en}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-white">{t("specialprice.descriptionAr")}</label>
              <input
                type="text"
                name="description_ar"
                value={formik.values.description_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
              />
              {formik.touched.description_ar && formik.errors.description_ar && (
                <p className="text-red-500 text-sm">{formik.errors.description_ar}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-white ">{t("specialprice.descriptionEn")}</label>
              <input
                type="text"
                name="description_en"
                value={formik.values.description_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
              />
              {formik.touched.description_en && formik.errors.description_en && (
                <p className="text-red-500 text-sm">{formik.errors.description_en}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white">{t("specialprice.startDate")}</label>
              <input
                type="date"
                name="start_date"
                value={formik.values.start_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
              />
              {formik.touched.start_date && formik.errors.start_date && (
                <p className="text-red-500 text-sm">{formik.errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-white">{t("specialprice.endDate")}</label>
              <input
                type="date"
                name="end_date"
                value={formik.values.end_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <p className="text-red-500 text-sm">{formik.errors.end_date}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-white ">{t("specialprice.price")}</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded  border-sec-color-100 bg-gray-700 text-white"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? t("specialprice.saving") : editingPriceId ? t("specialprice.updateBtn") : t("specialprice.addBtn")}          </button>
        </form>

        {/* قائمة الأسعار الخاصة */}
        <ul className="space-y-4">
          {Array.isArray(specialPrices) && specialPrices.length > 0 ? (
            specialPrices.map((price) => (
              <SpecialPriceItem key={price.id} price={price} />
            ))
          ) : (
            <p className="text-white text-center ">{t("specialprice.noData")}</p>
          )}
        </ul>

      </div>
    </div>
  );
};

export default SpecialPrice;
