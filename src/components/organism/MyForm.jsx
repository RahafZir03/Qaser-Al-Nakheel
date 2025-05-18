import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { sendMessage } from "../../api/endpoints/customers";
import { toast } from "react-toastify";

const MyForm = () => {
  const { t } = useTranslation("about");
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("contact.requiredSubject"),
      message: Yup.string().required("أضف بعض التفاصيل"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await sendMessage(values);
        toast.success(res.data.message);
        resetForm();
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        //
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto p-8 bg-gray-300 rounded"
    >
      <div className="grid grid-cols-1 gap-4 text-black">
        <div>
          <label
            htmlFor="subject"
            className="block font-semibold text-my-color"
          >
            <button type="submit">{t("contact.subject")}</button>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            {...formik.getFieldProps("subject")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.subject && formik.errors.subject
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-red-500 text-xs mt-1">
              {t(formik.errors.subject)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-semibold text-my-color"
          >
            {t("contact.messageDetails")}
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            {...formik.getFieldProps("message")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.message && formik.errors.message
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full text-lg font-bold py-2 px-4 bg-my-color text-white rounded-md shadow hover:bg-yellow-600 transition-all duration-300"
      >
        {t("contact.send")}
      </button>
    </form>
  );
};

export default MyForm;
