/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addPool } from "../../api/endpoints/pool";
import { useTranslation } from 'react-i18next';


export default function AddPoolModal({ onClose, onAdded }) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
    const { t } = useTranslation("pool");


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
            toast.success(t("pool.addsuccess"));

            onAdded(data.pool);
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error(t("pool.addfailed"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[130] bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl border border-sec-color-100 p-6 shadow-xl overflow-y-auto max-h-[90vh] relative">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{t("add.addpool")}</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {/* Text Fields */}
                            <div>
                                <label htmlFor="name_ar" className="text-white">{t('add.name_ar')}</label>
                                <Field id="name_ar" name="name_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>

                            <div>
                                <label htmlFor="name_en" className="text-white">{t('add.name_en')}</label>
                                <Field id="name_en" name="name_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
                            </div>

                            <div>
                                <label htmlFor="description_ar" className="text-white">{t('add.desc_ar')}</label>
                                <Field id="description_ar" name="description_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div >
                                <label htmlFor="description_en" className="text-white">{t('add.desc_en')}</label>
                                <Field id="description_en" name="description_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="size" className="text-white">{t('add.size')}</label>
                                <Field id="size" name="size" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div >
                                <label htmlFor="depth" className="text-white">{t('add.depth')}</label>
                                <Field id="depth" name="depth" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="opening_hours" className="text-white">{t('add.opening_hours')}</label>
                                <Field id="opening_hours" name="opening_hours" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div >
                                <label htmlFor="pool_type" className="text-white">{t('add.pool_type')}</label>
                                <Field id="pool_type" name="pool_type" as="select" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                >
                                    <option value="" disabled>{t('add.choose')}</option>
                                    <option value="indoor">{t('add.internal')}</option>
                                    <option value="outdoor">{t('add.external')}</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor="hourly_rate" className="text-white">{t('add.priceperhour')}</label>
                                <Field id="hourly_rate" name="hourly_rate" type="number" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="max_capacity" className="text-white">{t('add.max_capacity')}</label>
                                <Field id="max_capacity" name="max_capacity" type="number" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full"
                                />
                            </div>

                            {/* Main Image Upload */}
                            <div className="bg-admin-color p-4 rounded-lg md:col-span-2 text-white">
                                <h3 className="text-lg font-semibold mb-4 text-sec-color-100">{t('add.image')}</h3>
                                <div className="border-2 border-dashed border-sec-color-100 bg-gray-700 rounded-lg p-4 text-white text-center hover:bg-gray-700 cursor-pointer">
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
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-sec-color-100 hover:bg-opacity-90"
                                >
                                    {isSubmitting ? t('add.sending') : t('add.add')}
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
