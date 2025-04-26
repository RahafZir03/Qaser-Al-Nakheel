import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendResetPasswordRequest } from "../../api/endpoints/auth";
import { useTranslation } from "react-i18next";
import imagelogo from "../../assets/images/logo.png";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("signUp");
  const token = searchParams.get("token");

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, t("login.passwordMin"))
      .required(t("login.newPasswordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("login.passwordsMustMatch"))
      .required(t("login.confirmPasswordRequired")),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await sendResetPasswordRequest(token, values);
      if (response.data.success) {
        toast.success(t("login.passwordResetSuccess"));
        navigate("/login");
      } else {
        toast.error(response.data.message || t("login.passwordResetFailed"));
      }
    } catch (error) {
      toast.error(error.message || t("login.passwordResetFailed"));
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-96 bg-opacity-0">
      <img src={imagelogo} alt="logo" className="mx-auto" />
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {t("login.resetPasswordTitle")}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ getFieldProps, isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            <div>
              <input
                type="password"
                placeholder={t("login.newPasswordPlaceholder")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...getFieldProps("newPassword")}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder={t("login.confirmPasswordPlaceholder")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...getFieldProps("confirmPassword")}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
            >
              {t("login.resetPasswordButton")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
