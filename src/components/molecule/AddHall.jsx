/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addHall } from "../../api/endpoints/halls";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AddHallModal({ onClose, onAdded }) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState(null);

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
            toast.success("تمت إضافة القاعة بنجاح");

            onAdded(data.hall);
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("فشل في إضافة القاعة");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[130] bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh] relative border border-sec-color-100">
                <button onClick={onClose} className="absolute top-2 left-3 text-2xl  text-red-500"><IoMdCloseCircleOutline size={35}/></button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center"> Add a New Hall</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {/* Text Fields */}
                            <Field name="name_ar" placeholder="Name in Arabic " className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded" />
                            <Field name="name_en" placeholder="Name in English" className="p-2 bg-gray-700 text-white border  border-sec-color-100 rounded" />
                            <Field name="description_ar" placeholder=" Description in Arabic" className="p-2 bg-gray-700 text-white border  border-sec-color-100 rounded" />
                            <Field name="description_en" placeholder="Description in English" className="p-2  bg-gray-700 text-white border border-sec-color-100 rounded" />
                            <Field name="suitable_for_ar" placeholder=" Suitable For (Arabic)" className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded" />
                            <Field name="suitable_for_en" placeholder="Suitable For (English)" className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded" />
                            <Field
                                name="type"
                                as="select"
                                className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded "
                            >
                                <option value="" disabled>Choose the hall type </option>
                                <option value="party">Party</option>
                                <option value="meeting">Meeting</option>
                            </Field>
                            <Field name="price_per_hour" type="number" placeholder="Price per hour" className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded" />
                            <Field name="length" type="number" placeholder="Length" className="p-2 bg-gray-700 text-white border border-sec-color-100r rounded" />
                            <Field name="width" type="number" placeholder="Width" className="p-2 bg-gray-700 text-white border border-sec-color-100 rounded" />

                            {/* Capacities */}
                            <div className="md:col-span-2 mt-4 ">
                                <h4 className="text-sec-color-100 font-semibold mb-2 text-lg">Capacity by type</h4>
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
                                <h3 className="text-lg font-semibold mb-4 text-sec-color-100">Main image </h3>
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
                                            <p className="text-sec-color-100">Click here to choose an image</p>
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
                                <h3 className="text-lg font-semibold mb-4 text-sec-color-100">Additional Images </h3>
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
                                <label htmlFor="additionalImagesInput" className="block text-center text-sec-color-100 cursor-pointer border border-dashed border-sec-color-100 rounded-lg p-4 hover:bg-gray-700">
                                    {values.additionalImages.length > 0
                                        ? `${values.additionalImages.length} صورة محددة`
                                        : "Click here to choose additional images (up to 10 images)"}
                                </label>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="md:col-span-2 mt-6 px-6 py-2 rounded-xl w-full text-white bg-sec-color-100 max-w-52 hover:bg-opacity-90">
                                {isSubmitting ? "Sending..." : " Add The Hall "}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
