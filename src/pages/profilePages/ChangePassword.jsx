import { useFormik } from "formik";
import { changePassword } from "../../api/endpoints/customers";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation("profile");
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await changePassword(values);
        toast.success(response.data.message);
        // eslint-disable-next-line no-empty, no-unused-vars
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 mx-auto bg-white rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">{t("changePassword.title")}</h2>

      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-gray-700">
          {t("changePassword.currentPassword")}
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700">
          {t("changePassword.newPassword")}
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700">
          {t("changePassword.confirmPassword")}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-sec-color-100 hover:bg-sec-color-200 text-white py-2 px-4 rounded-md"
      >
        {loading ? t("changePassword.changing") : t("changePassword.submit")}
      </button>
    </form>
  );
};

export default ChangePassword;
