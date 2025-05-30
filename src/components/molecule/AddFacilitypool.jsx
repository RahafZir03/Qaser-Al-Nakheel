import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { addPoolFacilities } from "../../api/endpoints/pool";
import axiosInstance from "../../api/axios";
import { useTranslation } from 'react-i18next';


// eslint-disable-next-line react/prop-types
export default function AddFacilityModal({ poolId, onClose, onFacilityAdded }) {
    const [facilities, setFacilities] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const { t } = useTranslation("pool");


    const initialValues = {
        name_ar: "",
        name_en: "",
        desc_ar: "",
        desc_en: "",
        image: null,
    };

    const validationSchema = Yup.object().shape({
        name_ar: Yup.string().required("مطلوب"),
        name_en: Yup.string().required("Required"),
        desc_ar: Yup.string().required("مطلوب"),
        desc_en: Yup.string().required("Required"),
        image: Yup.mixed().required("الصورة مطلوبة"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("name_ar", values.name_ar);
            formData.append("name_en", values.name_en);
            formData.append("description_ar", values.desc_ar);
            formData.append("description_en", values.desc_en);
            if (values.image) {
                formData.append("image", values.image);
            }

            const res = await addPoolFacilities(poolId, formData);
            const newFacility = res.data.facility;

            toast.success(t("facility.addsuccess"));
            setFacilities((prev) => [...prev, newFacility]);

            // ← نبلّغ المكون الأب بالمرفق الجديد ليضيفه فوراً في الـ Details
            if (onFacilityAdded) onFacilityAdded(newFacility);

            resetForm();
            setImagePreview(null);
            onClose(); // ← نغلق المودال بعد الإضافة
        } catch (err) {
            console.error(err);
            toast.error(t("facility.addfailed"));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/halls/deleteFacility/${id}`);
            toast.success("تم الحذف");
            setFacilities((prev) => prev.filter((f) => f.id !== id));
        } catch {
            toast.error("فشل في الحذف");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-admin-color text-black rounded-xl border border-sec-color-100 p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh] relative">
                <h2 className="text-2xl font-bold text-white text-center mb-4">{t('facility.addfacility')}</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ setFieldValue, isSubmitting, errors, touched }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="name_ar" className="text-white">{t('facility.name_ar')}</label>
                                <Field id="name_ar" name="name_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>

                            <div>
                                <label htmlFor="name_en" className="text-white">{t('facility.name_en')}</label>
                                <Field id="name_en" name="name_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>


                            <div>
                                <label htmlFor="description_ar" className="text-white">{t('facility.desc_ar')}</label>
                                <Field id="description_ar" name="description_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div >
                                <label htmlFor="description_en" className="text-white">{t('facility.desc_en')}</label>
                                <Field id="description_en" name="description_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-white">{t('facility.image')}</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFieldValue("image", file);
                                            const reader = new FileReader();
                                            reader.onload = (ev) => setImagePreview(ev.target.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full border p-2 rounded bg-gray-700 border-sec-color-100"
                                />
                                {touched.image && errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-2 max-h-48 rounded border" />
                                )}
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                 <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {isSubmitting ? t('facility.sending') : t('facility.add')}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                     {t('facility.close')}
                                </button>

                            </div>

                        </Form>
                    )}
                </Formik>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {facilities.map((f) => (
                        <div key={f.id} className="border rounded-xl p-4 relative shadow-lg bg-gray-100 text-black">
                            <button
                                onClick={() => handleDelete(f.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={18} />
                            </button>
                            <p className="font-bold">{f.name.ar}</p>
                            <p className="text-gray-600">{f.description.ar}</p>
                            {f.image_url && (
                                <img src={f.image_url} alt={f.name.ar} className="mt-2 rounded max-h-32 object-cover" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
