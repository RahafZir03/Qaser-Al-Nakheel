/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addPool } from "../../api/endpoints/pool";

export default function AddPoolModal({ onClose, onAdded }) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState(null);

    const initialValues = {
        name_ar: "",
        name_en: "",
        mainImage: null,
        additionalImages: [],
        description_ar: "",
        description_en: "",
        size: "",
        depth: "",
        opening_hours: "",
        pool_type: "",
        hourly_rate: "",
        max_capacity: "",
    };

    const validationSchema = Yup.object().shape({
        name_ar: Yup.string().required("مطلوب"),
        name_en: Yup.string().required("Required"),
        description_ar: Yup.string().required("مطلوب"),
        description_en: Yup.string().required("Required"),
        size: Yup.string().required("مطلوب"),
        depth: Yup.string().required("مطلوب"),
        opening_hours: Yup.string().required("مطلوب"),
        pool_type: Yup.string().required("مطلوب"),
        hourly_rate: Yup.number().typeError("أدخل رقمًا صحيحًا").required("مطلوب"),
        max_capacity: Yup.number().typeError("أدخل رقمًا").required("مطلوب"),
        mainImage: Yup.mixed().required("الصورة الاساسية مطلوبة"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            for (const key of ["name_ar", "name_en", "description_ar", "description_en", "size", "depth", "opening_hours", "pool_type", "hourly_rate", "max_capacity"]) {
                formData.append(key, values[key]);
            }
            formData.append("mainImage", values.mainImage);

            values.additionalImages.forEach((file) => {
                formData.append("additionalImages", file);
            });

            const { data } = await addPool(formData);
            toast.success("تمت إضافة المسبح بنجاح");

            onAdded(data.pool);
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("فشل في إضافة المسبح");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative">
                <button onClick={onClose} className="absolute top-2 left-3 text-2xl text-gray-400 hover:text-red-500">×</button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">إضافة مسبح جديد</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {/* Text Fields */}
                            <Field name="name_ar" placeholder="الاسم بالعربية" className="p-2 border rounded" />
                            <Field name="name_en" placeholder="Name in English" className="p-2 border rounded" />
                            <Field name="description_ar" placeholder="الوصف بالعربية" className="p-2 border rounded" />
                            <Field name="description_en" placeholder="Description in English" className="p-2 border rounded" />
                            <Field name="size" placeholder="الحجم (m x m)" className="p-2 border rounded" />
                            <Field name="depth" placeholder="العمق (m -m)" className="p-2 border rounded" />
                            <Field name="opening_hours" placeholder="ساعات العمل ( AM -  PM)" className="p-2 border rounded" />
                            <Field
                                name="pool_type"
                                as="select"
                                className="p-2 border rounded bg-white"
                            >
                                <option value="" disabled>اختر نوع المسبح</option>
                                <option value="indoor">داخلي</option>
                                <option value="outdoor">خارجي</option>
                            </Field>
                            <Field name="hourly_rate" type="number" placeholder="السعر لكل ساعة" className="p-2 border rounded" />
                            <Field name="max_capacity" type="number" placeholder="الحد الأقصى للسعة" className="p-2 border rounded" />

                            {/* Main Image Upload */}
                            <div className="bg-admin-color p-4 rounded-lg md:col-span-2 text-white">
                                <h3 className="text-lg font-semibold mb-4">الصورة الرئيسية</h3>
                                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-white text-center hover:bg-gray-700 cursor-pointer">
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
                                            <p className="text-white">اضغط هنا لاختيار صورة</p>
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
                                <h3 className="text-lg font-semibold mb-4">صور إضافية</h3>
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
                                <label htmlFor="additionalImagesInput" className="block text-center cursor-pointer border-2 border-dashed border-gray-600 rounded-lg p-4 hover:bg-gray-700">
                                    {values.additionalImages.length > 0
                                        ? `${values.additionalImages.length} صورة محددة`
                                        : "اضغط هنا لاختيار صور إضافية (حتى 10 صور)"}
                                </label>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-6 px-6 py-2 rounded-xl w-full text-white bg-sec-color-100 max-w-52 hover:bg-opacity-90">
                                {isSubmitting ? "جاري الإرسال..." : "إضافة المسبح"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
