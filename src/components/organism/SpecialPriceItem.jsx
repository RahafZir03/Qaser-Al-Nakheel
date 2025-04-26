/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { updateSpecialPrice } from "../../api/endpoints/room";
import { toast } from "react-toastify";

const SpecialPriceItem = ({ price }) => {
    const {i18n,t} = useTranslation("specialprice");
    const lang = i18n.language || "en";
    const [editing, setEditing] = useState(false);

    const validationSchema = Yup.object({
        name_ar: Yup.string().required(t("specialprice.validation.nameAr")),
        name_en: Yup.string().required(t("specialprice.validation.nameEn")),
        description_ar: Yup.string().required(t("specialprice.validation.descriptionAr")),
        description_en: Yup.string().required(t("specialprice.validation.descriptionEn")),
        start_date: Yup.date().required(t("specialprice.validation.startDate")),
        end_date: Yup.date().required(t("specialprice.validation.endDate")),
        price: Yup.number()
            .required(t("specialprice.validation.priceRequired"))
            .positive(t("specialprice.validation.pricePositive")),
    });

    const formik = useFormik({
        initialValues: {
            name_ar: price.name.ar,
            name_en: price.name.en,
            description_ar: price.description.ar,
            description_en: price.description.en,
            start_date: price.start_date?.slice(0, 10),
            end_date: price.end_date?.slice(0, 10),
            price: price.price,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await updateSpecialPrice(price.id, values);
                toast.success(response.data.message);
                setEditing(false);
            } catch (err) {
                console.error("Error updating special price:", err);
            }
        },
    });

    const inputClass =
        "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all w-full";

    return (
        <motion.li
            layout
            className="bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
        >
            <AnimatePresence mode="wait">
                {!editing ? (
                    <motion.div
                        key="display"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-2"
                    >
                        <p><strong>{t("specialprice.name")}:</strong> {price.name[lang]}</p>
                        <p><strong>{t("specialprice.description")}:</strong> {price.description[lang]}</p>
                        <p><strong>{t("specialprice.date")}:</strong> {price.start_date?.slice(0, 10)} - {price.end_date?.slice(0, 10)}</p>
                        <p><strong>{t("specialprice.price")}:</strong> {price.price}</p>
                        <button
                            onClick={() => setEditing(true)}
                            className="mt-2 bg-yellow-500 text-white px-4 py-1.5 rounded-md hover:bg-yellow-600 transition"
                        >
                            {t("specialprice.updateButton")}
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="edit"
                        onSubmit={formik.handleSubmit}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="space-y-3"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <input
                                    name="name_ar"
                                    value={formik.values.name_ar}
                                    onChange={formik.handleChange}
                                    placeholder={t("specialprice.nameAr")}
                                    className={inputClass}
                                />
                                {formik.touched.name_ar && formik.errors.name_ar && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.name_ar}</div>
                                )}
                            </div>

                            <div>
                                <input
                                    name="name_en"
                                    value={formik.values.name_en}
                                    onChange={formik.handleChange}
                                    placeholder={t("specialprice.nameEn")}
                                    className={inputClass}
                                />
                                {formik.touched.name_en && formik.errors.name_en && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.name_en}</div>
                                )}
                            </div>

                            <div>
                                <textarea
                                    name="description_ar"
                                    value={formik.values.description_ar}
                                    onChange={formik.handleChange}
                                    placeholder={t("specialprice.descriptionAr")}
                                    className={inputClass}
                                />
                                {formik.touched.description_ar && formik.errors.description_ar && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.description_ar}</div>
                                )}
                            </div>

                            <div>
                                <textarea
                                    name="description_en"
                                    value={formik.values.description_en}
                                    onChange={formik.handleChange}
                                    placeholder={t("specialprice.descriptionEn")}
                                    className={inputClass}
                                />
                                {formik.touched.description_en && formik.errors.description_en && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.description_en}</div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formik.values.start_date}
                                    onChange={formik.handleChange}
                                    className={inputClass}
                                />
                                {formik.touched.start_date && formik.errors.start_date && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.start_date}</div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formik.values.end_date}
                                    onChange={formik.handleChange}
                                    className={inputClass}
                                />
                                {formik.touched.end_date && formik.errors.end_date && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.end_date}</div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="number"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    placeholder={t("specialprice.price")}
                                    className={inputClass}
                                />
                                {formik.touched.price && formik.errors.price && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-2">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition"
                            >
                                {t("specialprice.Save")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-1.5 rounded-md hover:bg-gray-400 transition"
                            >
                                {t("specialprice.Cancel")}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.li>
    );
};

export default SpecialPriceItem;
