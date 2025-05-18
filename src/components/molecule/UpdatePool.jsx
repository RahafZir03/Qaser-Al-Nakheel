/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getPoolById, updatePool } from "../../api/endpoints/pool";

export default function UpdatePoolModal({ poolId, onClose, onUpdated }) {
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getPoolById(poolId);
                const pool = data;
                setInitialValues({
                    name_ar: pool.name.ar,
                    name_en: pool.name.en,
                    description_ar: pool.description.ar,
                    description_en: pool.description.en,
                    size: pool.size,
                    depth: pool.depth,
                    opening_hours: pool.opening_hours,
                    max_capacity: pool.max_capacity,
                    pool_type: pool.pool_type,
                    hourly_rate: pool.hourly_rate,
                });
            } catch (err) {
                console.error("فشل تحميل بيانات المسبح:", err);
                toast.error("فشل تحميل بيانات المسبح");
            }
        };

        fetchData();
    }, [poolId]);

    const validationSchema = Yup.object().shape({
        name_ar: Yup.string().required("مطلوب"),
        name_en: Yup.string().required("Required"),
        description_ar: Yup.string().required("مطلوب"),
        description_en: Yup.string().required("Required"),
        size: Yup.string().required("مطلوب"),
        depth: Yup.string().required("مطلوب"),
        opening_hours: Yup.string().required("مطلوب"),
        max_capacity: Yup.number().typeError("أدخل رقمًا").required("مطلوب"),
        pool_type: Yup.string().required("مطلوب"),
        hourly_rate: Yup.number().typeError("أدخل رقمًا").required("مطلوب"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            [
                "name_ar", "name_en", "description_ar", "description_en",
                "size", "depth", "pool_type",
                "opening_hours", "max_capacity", "hourly_rate"
            ].forEach((key) => formData.append(key, values[key]));

            const response = await updatePool(poolId, values);
            toast.success(response.data.message || "تم تحديث بيانات المسبح بنجاح");
            onUpdated(response.data.pool);
            onClose();
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            toast.error("فشل في تحديث بيانات المسبح");
        } finally {
            setSubmitting(false);
        }
    };

    if (!initialValues) return <div className="text-white text-center">جاري تحميل البيانات...</div>;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative">
                <button onClick={onClose} className="absolute top-2 left-3 text-2xl text-gray-400 hover:text-red-500">×</button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">تعديل بيانات المسبح</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Field name="name_ar" placeholder="الاسم بالعربية" className="p-2 border rounded" />
                            <Field name="name_en" placeholder="Name in English" className="p-2 border rounded" />
                            <Field name="description_ar" as="textarea" placeholder="الوصف بالعربية" className="p-2 border rounded h-32 resize-y" />
                            <Field name="description_en" as="textarea" placeholder="Description in English" className="p-2 border rounded h-32 resize-y" />
                            <Field name="size" placeholder="الحجم (مثال: 30m x 15m)" className="p-2 border rounded" />
                            <Field name="depth" placeholder="العمق (مثال: 1m - 3m)" className="p-2 border rounded" />
                            <Field name="opening_hours" placeholder="ساعات العمل (مثال: 06:00 AM - 10:00 PM)" className="p-2 border rounded" />
                            <Field name="max_capacity" type="number" placeholder="الحد الأقصى للسعة" className="p-2 border rounded" />
                            <Field name="pool_type" as="select" className="p-2 border rounded bg-white">
                                <option value="" disabled>اختر نوع المسبح</option>
                                <option value="indoor">داخلي</option>
                                <option value="outdoor">خارجي</option>
                            </Field>
                            <Field name="hourly_rate" type="number" placeholder="السعر لكل ساعة" className="p-2 border rounded" />

                            <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-6 px-6 py-2 rounded-xl w-full text-white bg-sec-color-100 max-w-52 hover:bg-opacity-90">
                                {isSubmitting ? "جاري التحديث..." : "تحديث المسبح"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
