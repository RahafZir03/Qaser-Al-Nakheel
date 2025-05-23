/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { addService, serviceDataById, updateService } from "../../api/endpoints/room";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { IoMdCloseCircleOutline } from "react-icons/io";



const AddServiceModal = ({ isOpen, onClose, serviceId, onServiceAdded }) => {
    const [serviceTypeData, setServiceTypeData] = useState({
        name: { en: "", ar: "" },
        description: { en: "", ar: "" },
        image: ""
    });
    const [loading, setLoading] = useState(false);
     const { t, i18n } = useTranslation();
    
      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      };

    useEffect(() => {
        if (serviceId) {
            async function fetchServiceType() {
                setLoading(true);
                const response = await serviceDataById(serviceId);
                setServiceTypeData(response.data);
                setLoading(false);
            }
            fetchServiceType();
        } else {
            // إعادة تعيين البيانات عند إضافة خدمة جديدة
            setServiceTypeData({
                name: { en: "", ar: "" },
                description: { en: "", ar: "" },
                image: ""
            });
        }
    }, [serviceId, isOpen]);

    const formik = useFormik({
        initialValues: {
            name_en: serviceTypeData?.name?.en || "",
            name_ar: serviceTypeData?.name?.ar || "",
            description_en: serviceTypeData?.description?.en || "",
            description_ar: serviceTypeData?.description?.ar || "",
            image: serviceTypeData?.image || ""
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            let response;
            if (serviceId) {
                response = await updateService(serviceId, values);
                toast.success(response.data.message || "Service updated successfully.");
            } else {
                response = await addService(values);
                toast.success(response.data.message || "Service added successfully.");
            }
            onServiceAdded(response.data.service);
            onClose();
            setLoading(false);
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-admin-color bg-opacity-50 z-50 text-black">
            <div className="bg-admin-color p-6 rounded shadow-lg max-w-lg w-full border border-sec-color-100">
                <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t(`roomService.${serviceId ? 'update' : 'add'}`)} </h2>                    
                <button onClick={onClose} className="text-red-500 font-bold text-xl"><IoMdCloseCircleOutline size={35} /></button>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block font-medium text-white">{t('ServiceNameEnglish')}</label>
                        <input
                            type="text"
                            name="name_en"
                            value={formik.values.name_en}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded bg-gray-700 text-white border-sec-color-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-white">{t('ServiceNameArabic')}</label>
                        <input
                            type="text"
                            name="name_ar"
                            value={formik.values.name_ar}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded text-right bg-gray-700 text-white border-sec-color-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-white">{t('ServiceDescriptionEnglish')}</label>
                        <textarea
                            name="description_en"
                            value={formik.values.description_en}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded bg-gray-700 text-white border-sec-color-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-white">{t('ServiceDescriptionArabic')}</label>
                        <textarea
                            name="description_ar"
                            value={formik.values.description_ar}
                            onChange={formik.handleChange}
                            className="w-full border p-2 rounded text-right bg-gray-700 text-white border-sec-color-100"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-white">{t('ServiceImage')}</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue("image", event.currentTarget.files[0]);
                            }}
                            className="w-full border p-2 rounded bg-gray-700 text-white border-sec-color-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (serviceId ? "Updating..." : "Adding...") : (serviceId ? "Update Service" : "Add Service")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;
