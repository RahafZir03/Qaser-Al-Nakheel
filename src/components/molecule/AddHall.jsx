/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addHall } from "../../api/endpoints/halls";
import { useTranslation } from 'react-i18next';


export default function AddHallModal({ onClose, onAdded }) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
    const { t } = useTranslation("halls");


    const initialValues = {
        name_ar: "",
        name_en: "",
        mainImage: null,
        additionalImages: [],
        description_ar: "",
        description_en: "",
        suitable_for_ar: "",
        suitable_for_en: "",
        type: "",
        price_per_hour: "",
        length: "",
        width: "",
        capacities: [
            { type: "cinema", capacity: "" },
            { type: "school", capacity: "" },
            { type: "u_shape", capacity: "" },
            { type: "i_shape", capacity: "" },
            { type: "geneva", capacity: "" },
            { type: "banquet", capacity: "" },
        ],
    };

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
        mainImage: Yup.mixed().required("الصورة الاساسية مطلوبة"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            for (const key of ["name_ar", "name_en", "description_ar", "description_en", "suitable_for_ar", "suitable_for_en", "type", "price_per_hour", "length", "width"]) {
                formData.append(key, values[key]);
            }
            formData.append("capacity", JSON.stringify(values.capacities));
            formData.append("mainImage", values.mainImage);

            values.additionalImages.forEach((file) => {
                formData.append("additionalImages", file);
            });

            const { data } = await addHall(formData);
            toast.success(t('add.addsuccess'));

            onAdded(data.hall);
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(t('add.addfail'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[130] bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative border border-sec-color-100">
                <h2 className="text-2xl font-bold text-white mb-6 text-center"> {t('add.addhall')}</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {/* Text Fields */}
                            <div>
                                <label htmlFor="name_ar" className="text-white">{t('add.name_ar')}</label>
                                <Field
                                    id="name_ar"
                                    name="name_ar"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="name_en" className="text-white">{t('add.name_en')}</label>
                                <Field
                                    id="name_en"
                                    name="name_en"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_ar" className="text-white">{t('add.desc_ar')}</label>
                                <Field
                                    id="description_ar"
                                    name="description_ar"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_en" className="text-white">{t('add.desc_en')}</label>
                                <Field
                                    id="description_en"
                                    name="description_en"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="suitable_for_ar" className="text-white">{t('add.suitablefor_ar')}</label>
                                <Field
                                    id="suitable_for_ar"
                                    name="suitable_for_ar"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="suitable_for_en" className="text-white">{t('add.suitablefor_en')}</label>
                                <Field
                                    id="suitable_for_en"
                                    name="suitable_for_en"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="text-white">{t('add.halltype')}</label>
                                <Field
                                    id="type"
                                    name="type"
                                    as="select"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                >
                                    <option value="" disabled>{t('add.choose')}</option>
                                    <option value="party">{t('add.party')}</option>
                                    <option value="meeting">{t('add.meeting')}</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor="price_per_hour" className="text-white">{t('add.priceperhour')}</label>
                                <Field
                                    id="price_per_hour"
                                    name="price_per_hour"
                                    type="number"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="length" className="text-white">{t('add.length')}</label>
                                <Field
                                    id="length"
                                    name="length"
                                    type="number"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="width" className="text-white">{t('add.width')}</label>
                                <Field
                                    id="width"
                                    name="width"
                                    type="number"
                                    className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded w-full"
                                />
                            </div>

                            {/* Capacities */}
                            <div className="md:col-span-2 mt-4 ">
                                <h4 className="text-sec-color-100 font-semibold mb-2 text-lg">{t('add.capacitybytype')}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {values.capacities.map((c, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <label className="w-24 text-gray-300">{c.type}</label>
                                            <Field name={`capacities[${i}].capacity`} type="number" placeholder="Number of people" className="flex-1 p-2 bg-gray-700 text-white border border-sec-color-100 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Main Image Upload */}
                            <div className="bg-admin-color p-4 rounded-lg md:col-span-2 text-white">
                                <h3 className="text-lg font-semibold mb-4 text-sec-color-100">{t('add.image')}</h3>
                                <div className=" border-dashed border border-sec-color-100 rounded-lg p-4 text-white text-center hover:bg-gray-700 cursor-pointer">
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
                                        const newFiles = Array.from(e.target.files);
                                        const currentFiles = values.additionalImages || [];
                                        const allFiles = [...currentFiles, ...newFiles];

                                        if (allFiles.length > 10) {
                                            toast.warning("يمكن رفع 10 صور كحد أقصى");
                                        } else {
                                            setFieldValue("additionalImages", allFiles);
                                        }
                                    }}
                                />
                                <label htmlFor="additionalImagesInput" className="block text-center text-sec-color-100 cursor-pointer border border-dashed border-sec-color-100 rounded-lg p-4 hover:bg-gray-700">
                                    {values.additionalImages.length > 0
                                        ? `${values.additionalImages.length} صورة محددة`
                                        : t('add.addclick')}
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-gray-500 hover:bg-opacity-90"
                                >
                                    {t('add.close')}
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-sec-color-100 hover:bg-opacity-90"
                                >
                                    {isSubmitting ? t('add.sending') : t('add.add')}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
