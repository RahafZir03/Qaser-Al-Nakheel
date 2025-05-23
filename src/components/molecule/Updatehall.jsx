/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getHallById, updateHall } from "../../api/endpoints/halls";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function UpdateHallModal({ hallId, onClose, onUpdated }) {
    const [initialValues, setInitialValues] = useState(null);

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
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative">
                <button onClick={onClose} className="absolute top-2 left-3 text-2xl  text-red-500"><IoMdCloseCircleOutline size={35}/></button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Hall</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Field name="name_ar" placeholder="Name in Arabic" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="name_en" placeholder="Name in English" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="description_ar" placeholder="Description in " className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="description_en" placeholder="Description in English" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="suitable_for_ar" placeholder=" Suitable For (Arabic)" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="suitable_for_en" placeholder="Suitable For (English)" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="type" as="select" className="p-2 border rounded border-sec-color-100 bg-gray-700">
                                <option value="" disabled>Choose the hall type  </option>
                                <option value="party">Party</option>
                                <option value="meeting">Meeting</option>
                            </Field>
                            <Field name="price_per_hour" type="number" placeholder="السعر لكل ساعة" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="length" type="number" placeholder="الطول" className="p-2 border rounded border-sec-color-100 bg-gray-700" />
                            <Field name="width" type="number" placeholder="العرض" className="p-2 border rounded border-sec-color-100 bg-gray-700" />

                            {/* ✅ عرض السعة حسب النوع */}
                            <div className="md:col-span-2 mt-4">
                                <h4 className="text-sec-color-100 font-semibold mb-2 text-lg">Capacity by type  </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                                    {values.capacities.map((c, i) => {
                                        if(i>5) return null; 
                                        console.log(c)
                                        return(
                                        <div key={i} className="flex items-center gap-2">
                                            <label className="w-24 text-gray-300">{c.type}</label>
                                            <Field
                                                name={`capacities[${i}].capacity`}
                                                type="number"
                                                placeholder="عدد الأشخاص"
                                                className="flex-1 p-2 border rounded border-sec-color-100 bg-gray-700"
                                            />
                                        </div>
                                    )})}
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-6 px-6 py-2 rounded-xl w-full text-white bg-sec-color-100 max-w-52 hover:bg-opacity-90">
                                {isSubmitting ? "Updating ..." : "Update Hall"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
