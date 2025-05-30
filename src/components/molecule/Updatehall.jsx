/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getHallById, updateHall } from "../../api/endpoints/halls";
import { useTranslation } from 'react-i18next';

export default function UpdateHallModal({ hallId, onClose, onUpdated }) {
    const [initialValues, setInitialValues] = useState(null);
     const { t } = useTranslation("halls");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getHallById(hallId);
                const hall = data.hall;

                let parsedCapacities = [];

                try {
                    if (hall.capacity) {
                        // إصلاح التنسيق الخاطئ: إضافة علامات اقتباس حول أسماء الخصائص إن كانت مفقودة
                        const fixedJson = hall.capacity.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');
                        parsedCapacities = JSON.parse(fixedJson);
                    }
                } catch (error) {
                    console.error("فشل في تحويل capacity:", error);
                    parsedCapacities = [];
                }

                setInitialValues({
                    name_ar: hall.name.ar,
                    name_en: hall.name.en,
                    description_ar: hall.description.ar,
                    description_en: hall.description.en,
                    suitable_for_ar: hall.suitable_for.ar,
                    suitable_for_en: hall.suitable_for.en,
                    type: hall.type,
                    price_per_hour: hall.price_per_hour,
                    length: hall.length,
                    width: hall.width,
                    capacities: parsedCapacities,
                });
            } catch (err) {
                console.error("فشل تحميل بيانات القاعة:", err);
                toast.error("فشل تحميل بيانات القاعة");
            }
        };

        fetchData();
    }, [hallId]);


    const validationSchema = Yup.object().shape({
        name_ar: Yup.string().required("مطلوب"),
        name_en: Yup.string().required("Required"),
        description_ar: Yup.string().required("مطلوب"),
        description_en: Yup.string().required("Required"),
        suitable_for_ar: Yup.string().required("مطلوب"),
        suitable_for_en: Yup.string().required("Required"),
        type: Yup.string().required("مطلوب"),
        price_per_hour: Yup.number().typeError("أدخل رقمًا صحيحًا").required("مطلوب"),
        length: Yup.number().typeError("أدخل رقمًا").required("مطلوب"),
        width: Yup.number().typeError("أدخل رقمًا").required("مطلوب"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            [
                "name_ar", "name_en", "description_ar", "description_en",
                "suitable_for_ar", "suitable_for_en", "type",
                "price_per_hour", "length", "width"
            ].forEach((key) => formData.append(key, values[key]));

            // ✅ إعادة إرسال capacities بعد تحويلها إلى JSON
            formData.append("capacity", JSON.stringify(values.capacities));

            const { data } = await updateHall(hallId, formData);
            toast.success("تم تحديث القاعة بنجاح");
            onUpdated(data.hall);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("فشل في تحديث القاعة");
        } finally {
            setSubmitting(false);
        }
    };

    if (!initialValues) return <div className="text-white text-center">جاري تحميل البيانات...</div>;

    return (
        <div className="fixed inset-0 z-[130] bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full border border-sec-color-100 max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('update.update')}</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <label htmlFor="name_ar" className="text-white">{t('update.name_ar')}</label>
                                <Field
                                    id="name_ar"
                                    name="name_ar"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="name_en" className="text-white">{t('update.name_en')}</label>
                                <Field
                                    id="name_en"
                                    name="name_en"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_ar" className="text-white">{t('update.desc_ar')}</label>
                                <Field
                                    id="description_ar"
                                    name="description_ar"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_en" className="text-white">{t('update.desc_en')}</label>
                                <Field
                                    id="description_en"
                                    name="description_en"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="suitable_for_ar" className="text-white">{t('update.suitablefor_ar')}</label>
                                <Field
                                    id="suitable_for_ar"
                                    name="suitable_for_ar"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="suitable_for_en" className="text-white">{t('update.suitablefor_en')}</label>
                                <Field
                                    id="suitable_for_en"
                                    name="suitable_for_en"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="text-white">{t('update.halltype')}</label>
                                <Field
                                    id="type"
                                    name="type"
                                    as="select"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                >
                                    <option value="" disabled>{t('update.choose')}</option>
                                    <option value="party">{t('update.party')}</option>
                                    <option value="meeting">{t('update.meeting')}</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor="price_per_hour" className="text-white">{t('update.priceperhour')}</label>
                                <Field
                                    id="price_per_hour"
                                    name="price_per_hour"
                                    type="number"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="length" className="text-white">{t('update.length')}</label>
                                <Field
                                    id="length"
                                    name="length"
                                    type="number"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="width" className="text-white">{t('update.width')}</label>
                                <Field
                                    id="width"
                                    name="width"
                                    type="number"
                                    className="p-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>


                            {/* ✅ عرض السعة حسب النوع */}
                            <div className="md:col-span-2 mt-4">
                                <h4 className="text-sec-color-100 font-semibold mb-2 text-lg">{t('update.capacitybytype')}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                                    {values.capacities.map((c, i) => {
                                        if (i > 5) return null;
                                        console.log(c)
                                        return (
                                            <div key={i} className="flex items-center gap-2">
                                                <label className="w-24 text-gray-300">{c.type}</label>
                                                <Field
                                                    name={`capacities[${i}].capacity`}
                                                    type="number"
                                                    placeholder="عدد الأشخاص"
                                                    className="flex-1 p-2 border rounded border-sec-color-100 bg-gray-700"
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
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
