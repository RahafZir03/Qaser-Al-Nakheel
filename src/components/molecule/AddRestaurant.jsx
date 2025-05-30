/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addRestaurant } from "../../api/endpoints/restaurant";
import { useTranslation } from 'react-i18next';


export default function AddRestaurantModal({ onClose, onAdded }) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
    const { t } = useTranslation("restaurants");

    const initialValues = {
        name_ar: "",
        name_en: "",
        description_ar: "",
        description_en: "",
        cuisine_type_ar: "",
        cuisine_type_en: "",
        opening_hours: "",
        capacity: "",
        mainImage: null,
        additionalImages: [],
    };

    const validationSchema = Yup.object().shape({
        name_ar: Yup.string().required("مطلوب"),
        name_en: Yup.string().required("Required"),
        description_ar: Yup.string().required("مطلوب"),
        description_en: Yup.string().required("Required"),
        cuisine_type_ar: Yup.string().required("مطلوب"),
        cuisine_type_en: Yup.string().required("Required"),
        opening_hours: Yup.string().required("مطلوب"),
        capacity: Yup.number().typeError("أدخل رقمًا").required("مطلوب"),
        mainImage: Yup.mixed().required("الصورة الاساسية مطلوبة"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();

            // إرسال الحقول بالشكل الذي يتوقعه الـ backend
            formData.append("name_ar", values.name_ar);
            formData.append("name_en", values.name_en);
            formData.append("description_ar", values.description_ar);
            formData.append("description_en", values.description_en);
            formData.append("cuisine_type_ar", values.cuisine_type_ar);
            formData.append("cuisine_type_en", values.cuisine_type_en);
            formData.append("opening_hours", values.opening_hours);
            formData.append("capacity", values.capacity);
            formData.append("mainImage", values.mainImage);

            // رفع الصور الإضافية
            values.additionalImages.forEach((file) => {
                formData.append("additionalImages", file);
            });

            // إرسال البيانات إلى السيرفر
            const { data } = await addRestaurant(formData);
            toast.success(t("add.success"));

            // التحديثات بعد النجاح
            onAdded(data.restaurant);
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(t("add.failed"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[130] bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 border border-sec-color-100 shadow-xl overflow-y-auto max-h-[90vh] relative">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{t("add.addrest")}</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <label htmlFor="name_ar" className="text-white"> {t("add.rest_ar")}</label>
                                <Field id="name_ar" name="name_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>

                            <div>
                                <label htmlFor="name_en" className="text-white">{t("add.rest_en")}</label>
                                <Field id="name_en" name="name_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>

                            <div>
                                <label htmlFor="description_ar" className="text-white">{t("add.desc_ar")}</label>
                                <Field id="description_ar" name="description_ar " className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>

                            <div >
                                <label htmlFor="description_en" className="text-white">{t("add.desc_en")}</label>
                                <Field
                                    id="description_en"
                                    name="description_en"
                                    className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div >
                                <label htmlFor="cuisine_type_ar" className="text-white">{t("add.cuisine_ar")}</label>
                                <Field
                                    id="cuisine_type_ar"
                                    name="cuisine_type_ar"
                                    className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="cuisine_type_en" className="text-white">{t("add.cuisine_en")}</label>
                                <Field
                                    id="cuisine_type_en"
                                    name="cuisine_type_en"
                                    className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div >
                                <label htmlFor="opening_hours" className="text-white">{t("add.hours")}</label>
                                <Field
                                    id="opening_hours"
                                    name="opening_hours"
                                    className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="capacity" className="text-white">{t("add.capacity")}</label>
                                <Field
                                    id="capacity"
                                    name="capacity"
                                    type="number"
                                    className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>
                            {/* Main Image Upload */}
                            <div className="bg-admin-color p-4 rounded-lg md:col-span-2 text-white">
                                <h3 className="text-lg font-semibold mb-4 text-sec-color-100">{t('add.image')}</h3>
                                <div className="border-2 border-dashed border-sec-color-100 rounded-lg p-4 text-white text-center hover:bg-gray-700 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        id="mainImageInput"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFieldValue("mainImage", file);
                                                const reader = new FileReader();
                                                reader.onload = (ev) => setFeaturedImagePreview(ev.target.result);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label htmlFor="mainImageInput" className="block cursor-pointer">
                                        {featuredImagePreview ? (
                                            <img src={featuredImagePreview} alt="Preview" className="max-h-48 mx-auto rounded mb-2" />
                                        ) : (
                                            <p className="text-sec-color-100">{t('add.click')}</p>
                                        )}
                                        <p className="text-xs text-gray-500">{values.mainImage?.name}</p>
                                    </label>
                                </div>
                                {touched.mainImage && errors.mainImage && (
                                    <div className="text-red-400 text-sm mt-2">{errors.mainImage}</div>
                                )}
                            </div>

                            {/* Additional Images Upload */}
                            <div className="bg-admin-color p-4 rounded-lg md:col-span-2 text-white">
                                <h3 className="text-lg font-semibold mb-4 text-sec-color-100">{t('add.additional')}</h3>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    id="additionalImagesInput"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        if (files.length > 10) {
                                            toast.warning("يمكن رفع 10 صور كحد أقصى");
                                        } else {
                                            setFieldValue("additionalImages", files);
                                        }
                                    }}
                                />
                                <label htmlFor="additionalImagesInput" className="block text-center  text-sec-color-100 cursor-pointer border-2 border-dashed border-gray-600 rounded-lg p-4 hover:bg-gray-700">
                                    {values.additionalImages.length > 0
                                        ? `${values.additionalImages.length} صورة محددة`
                                        : t('add.addclick')}
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                 <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-sec-color-100 hover:bg-opacity-90"
                                >
                                    {isSubmitting ?t('add.sending') :t('add.add')}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-gray-500 hover:bg-opacity-90"
                                >
                                   {t('add.close')}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

