/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { getRestaurantbyid, updateRestaurant } from "../../api/endpoints/restaurant";
import { useTranslation } from 'react-i18next';

export default function UpdateRestaurantModal({ restaurantId, onClose, onUpdated }) {
  const [initialValues, setInitialValues] = useState(null);
  const { t } = useTranslation("restaurants");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRestaurantbyid(restaurantId);
        console.log(data)
        const restaurant = data;

        setInitialValues({
          name_ar: restaurant.name.ar,
          name_en: restaurant.name.en,
          description_ar: restaurant.description.ar,
          description_en: restaurant.description.en,
          cuisine_type_ar: restaurant.Cuisine_type.ar,
          cuisine_type_en: restaurant.Cuisine_type.en,
          capacity: restaurant.capacity,
          opening_hours: restaurant.Opening_hours,
        });
      } catch (error) {
        console.error("failed to load restaurant data:", error);
        toast.error(t("update.failed"));
      }
    };

    fetchData();
  }, [restaurantId]);

  const validationSchema = Yup.object().shape({
    name_ar: Yup.string().required("مطلوب"),
    name_en: Yup.string().required("Required"),
    description_ar: Yup.string().required("مطلوب"),
    description_en: Yup.string().required("Required"),
    cuisine_type_ar: Yup.string().required("مطلوب"),
    cuisine_type_en: Yup.string().required("Required"),
    capacity: Yup.number().typeError("يجب أن يكون رقمًا").required("مطلوب"),
    opening_hours: Yup.string().required("مطلوب"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      const { data } = await updateRestaurant(restaurantId, values);
      toast.success(t("update.success"));
      onUpdated(data.restaurant);
      onClose();
    } catch (err) {
      console.error("Error while updating:", err);
      toast.error(t("update.failedupdate"));
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialValues) return <div className="text-white text-center">{t("update.load")}</div>;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-admin-color rounded-2xl w-full max-w-3xl p-6 border border-sec-color-100 shadow-xl overflow-y-auto max-h-[90vh] relative">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{t("update.updateres")}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <label htmlFor="name_ar">{t("update.rest_ar")}</label>
                <Field id="name_ar" name="name_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="name_en">{t("update.rest_en")}</label>
                <Field id="name_en" name="name_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="description_ar">{t("update.desc_ar")}</label>
                <Field id="description_ar" name="description_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="description_en">{t("update.desc_en")}</label>
                <Field id="description_en" name="description_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="cuisine_type_ar">{t("update.cuisine_ar")}</label>
                <Field id="cuisine_type_ar" name="cuisine_type_ar" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="cuisine_type_en">{t("update.cuisine_en")}</label>
                <Field id="cuisine_type_en" name="cuisine_type_en" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="capacity">{t("update.capacity")}</label>
                <Field id="capacity" name="capacity" type="number" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div>
                <label htmlFor="opening_hours">{t("update.hours")}</label>
                <Field id="opening_hours" name="opening_hours" className="p-2 mt-2 border rounded border-sec-color-100 bg-gray-700 w-full" />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-sec-color-100 hover:bg-opacity-90"
                >
                  {isSubmitting ?  t('update.Updating') :t('update.Update')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl w-full max-w-52 text-white bg-gray-500 hover:bg-opacity-90"
                >
                 {t("update.close")}
                </button>


              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
