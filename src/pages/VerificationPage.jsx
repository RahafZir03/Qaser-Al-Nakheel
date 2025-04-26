/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { sendVerificationCode, verifyCode } from "../api/endpoints/auth";
import ReactLoading from "react-loading";
import backgroundImg from "../assets/images/background.png";
import logoImg from "../assets/images/logo.png";
import { toast } from "react-toastify";

export default function VerificationPage() {
  const { email } = useParams();
  const { t } = useTranslation("signUp");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendCode = async (email) => {
    const response = await sendVerificationCode(email);
    toast.success(response.message);
  };
  const formik = useFormik({
    initialValues: {
      email: email || "",
      verification_code: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("verification.validation.invalidEmail"))
        .required(t("verification.validation.required")),
      verification_code: Yup.string()
        .length(6, t("verification.validation.codeLength"))
        .required(t("verification.validation.required")),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await verifyCode(values);
        toast.success(response.data.message);
        navigate("/login");
      } catch (err) {
        toast.error(
          err.response?.data?.message || t("verification.validation.failed")
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <img
        src={backgroundImg}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      />
      <div className="relative bg-opacity-0 text-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <img src={logoImg} alt="Logo" className="mx-auto" />
        <h2 className="text-2xl font-bold text-center mb-3">
          {t("verification.title")}
        </h2>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder={t("verification.email")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-100 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-300 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="verification_code"
              placeholder={t("verification.code")}
              maxLength={6}
              value={formik.values.verification_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-100 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-center tracking-widest text-xl"
            />
            {formik.touched.verification_code &&
              formik.errors.verification_code && (
                <div className="text-red-300 text-sm mt-1">
                  {formik.errors.verification_code}
                </div>
              )}
          </div>
          <p className="text-center  text-gray-300">
            {t("verification.description")}
          </p>
          <button
            type="submit"
            disabled={loading || !formik.isValid || formik.isSubmitting}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
          >
            {loading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              t("verification.verify")
            )}
          </button>
          <p className="text-center text-gray-300 text-sm mt-4">
            {t("verification.checkSpam")}
          </p>
          <div className=" flex justify-center items-center gap-4 ">
            <p className="text-center text-yellow-300 text-sm bg-black/70 p-2 rounded-md">
              {t("verification.expiryWarning")}
            </p>
            <button
              type="button"
              onClick={() => sendCode(formik.values.email)} // تمرير البريد الإلكتروني مباشرة إلى الدالة
              className="w-full p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-300 transition duration-300"
            >
              {t("verification.sendAgain")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
