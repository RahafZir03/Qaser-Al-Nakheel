import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { sendForgotPasswordEmail } from "../../api/endpoints/auth";
import { useTranslation } from "react-i18next";
import imagelogo from "../../assets/images/logo.png";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const { t } = useTranslation("signUp");
  const [emailSent, setEmailSent] = useState(false);
  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("login.invalidEmail"))
      .required(t("login.emailRequired")),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await sendForgotPasswordEmail(values);
      if (response.data.success) {
        toast.success(t("login.resetLinkSent"));
        setEmailSent(true);
      } else {
        toast.error(response.data.message || t("login.errorSendingEmail"));
      }
    } catch (error) {
      toast.error(error.message || t("login.errorSendingEmail"));
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-96 bg-opacity-0">
      <img src={imagelogo} alt="logo" className="mx-auto" />
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {t("login.forgotPasswordTitle")}
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
                type="email"
                placeholder={t("login.emailPlaceholder")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...getFieldProps("email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
            >
              {t("login.sendResetLink")}
            </button>
            {emailSent && (
              <p className="text-sm text-white text-center mt-2">
                {t("login.checkEmailInfo")}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
