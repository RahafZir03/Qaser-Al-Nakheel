/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getPoolById, updatePool } from "../../api/endpoints/pool";
import { useTranslation } from 'react-i18next';

export default function UpdatePoolModal({ poolId, onClose, onUpdated }) {
    const [initialValues, setInitialValues] = useState(null);
    const { t } = useTranslation("pool");

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
                console.error(t('update.failedload'), err);
                toast.error(t('update.failedload'));
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
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('update.update')}</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <label htmlFor="name_ar" className="text-white">{t('update.name_ar')}</label>
                                <Field id="name_ar" name="name_ar" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="name_en" className="text-white">{t('update.name_en')}</label>
                                <Field id="name_en" name="name_en" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_ar" className="text-white">{t('update.desc_ar')}</label>
                                <Field id="description_ar" name="description_ar" as="textarea" className="p-2 border rounded h-32 resize-y border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_en" className="text-white">{t('update.desc_en')}</label>
                                <Field id="description_en" name="description_en" as="textarea" className="p-2 border rounded h-32 resize-y border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="size" className="text-white">{t('update.size')}</label>
                                <Field id="size" name="size" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="depth" className="text-white">{t('update.depth')}</label>
                                <Field id="depth" name="depth" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="opening_hours" className="text-white">{t('update.opening_hours')}</label>
                                <Field id="opening_hours" name="opening_hours" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="max_capacity" className="text-white">{t('update.max_capacity')}</label>
                                <Field id="max_capacity" name="max_capacity" type="number" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="pool_type" className="text-white">{t('update.pool_type')}</label>
                                <Field id="pool_type" name="pool_type" as="select" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full" >
                                    <option value="" disabled>Choose the type of pool</option>
                                    <option value="indoor">Internal</option>
                                    <option value="outdoor">External</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor="hourly_rate" className="text-white">{t('update.hourly_rate')}</label>
                                <Field id="hourly_rate" name="hourly_rate" type="number" className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>


                            <div className="flex justify-end gap-3 mt-6">
                                 <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-sec-color-100 hover:bg-opacity-90"
                                >
                                    {isSubmitting ? t('update.Updating') :t('update.Update')}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-gray-500 hover:bg-opacity-90"
                                >
                                  {t('update.close')}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
