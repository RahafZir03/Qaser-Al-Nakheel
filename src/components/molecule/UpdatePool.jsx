/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getPoolById, updatePool } from "../../api/endpoints/pool";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative border border-sec-color-100">
                <button onClick={onClose} className="absolute top-2 left-3 text-2x text-red-500"><IoMdCloseCircleOutline size={35}/></button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Updating Pool</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Field name="name_ar" placeholder="Name in Arabic" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="name_en" placeholder="Name in English" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="description_ar" as="textarea" placeholder=" Description in Arabic" className="p-2 border rounded h-32 resize-y border-sec-color-100 bg-gray-700" />
                            <Field name="description_en" as="textarea" placeholder="Description in English" className="p-2 border rounded h-32 resize-y border-sec-color-100 bg-gray-700" />
                            <Field name="size" placeholder="Size (m x m)" className="p-2 border rounded  border-sec-color-100 bg-gray-700" />
                            <Field name="depth" placeholder="Depth (m - m)" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="opening_hours" placeholder="Working hours  (AM - PM)" className="p-2 border rounded  border-sec-color-100 bg-gray-700" />
                            <Field name="max_capacity" type="number" placeholder="Maximum capacity" className="p-2 border rounded  border-sec-color-100 bg-gray-700" />
                            <Field name="pool_type" as="select" className="p-2 border rounded  border-sec-color-100 bg-gray-700">
                                <option value="" disabled>Choose the type of pool</option>
                                <option value="indoor">Internal</option>
                                <option value="outdoor">External</option>
                            </Field>
                            <Field name="hourly_rate" type="number" placeholder="السعر لكل ساعة" className="p-2 border rounded  border-sec-color-100 bg-gray-700" />

                            <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-6 px-6 py-2 rounded-xl w-full text-white bg-sec-color-100 max-w-52 hover:bg-opacity-90">
                                {isSubmitting ? " Updating..." : " Update Pool"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
