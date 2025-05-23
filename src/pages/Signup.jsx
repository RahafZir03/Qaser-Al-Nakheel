/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendVerificationCode, signUp } from "../api/endpoints/auth";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { saveAuthData } from "../features/authData/authDataSlice";
import { Link } from "react-router-dom";
import imagename from "../assets/images/background.png";
import imageIcon from "../assets/images/google.png";
import imageLogo from "../assets/images/facebook.png";
import imagelogo from "../assets/images/logo.png";
import { FaArrowDown } from "react-icons/fa";
import noimage from "../assets/images/noimage.jpg";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation("signUp");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(noimage);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      second_name: "",
      third_name: "",
      last_name: "",
      gender: "",
      profession: "",
      free_text: "",
      email: "",
      mobileNo: [""],
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      postal_code: "",
      image: image ? image : null,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required(t("validation.required")),
      last_name: Yup.string().required(t("validation.required")),
      email: Yup.string()
        .email(t("validation.invalidEmail"))
        .required(t("validation.required")),
      mobileNo: Yup.array()
        .of(
          Yup.string()
            .required(t("validation.required"))
            .matches(/^05\d{8}$/, t("validation.invalidPhone"))
        )
        .min(1, t("validation.atLeastOnePhone")),
      country: Yup.string().required(t("validation.required")),
      city: Yup.string().required(t("validation.required")),
      password: Yup.string()
        .min(6, t("validation.minPassword"))
        .required(t("validation.required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], t("validation.passwordsMustMatch"))
        .required(t("validation.required")),
      birthdate: Yup.date().required(t("validation.required")),
      postal_code: Yup.string(),
      second_name: Yup.string().nullable(),
      third_name: Yup.string().nullable(),
      gender: Yup.string()
        .oneOf(["male", "female", "other"], t("validation.invalidGender"))
        .required(t("validation.required")),
      profession: Yup.string().nullable(),
      free_text: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("email", values.email);
        formData.append("mobileNo", JSON.stringify(values.mobileNo));
        formData.append("country", values.country);
        formData.append("city", values.city);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("birthdate", values.birthdate);
        formData.append("postal_code", values.postal_code);
        formData.append("second_name", values.second_name || "");
        formData.append("third_name", values.third_name || "");
        formData.append("gender", values.gender);
        formData.append("profession", values.profession || "");
        formData.append("free_text", values.free_text || "");

        if (fileInputRef.current && fileInputRef.current.files[0]) {
          formData.append("image", fileInputRef.current.files[0]);
        }

        const response = await signUp(formData);
        if (response.status >= 200 && response.status < 300) {
          setLoading(false);
          toast.success(response.data.message);
          console.log(values.email);
          await sendVerificationCode(values.email);
          navigate(`/verificationPage/${values.email}`);
        }
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <img
        src={imagename}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      />
      <div className="relative bg-bg-gray-100 text-gray-900 bg-opacity-0 p-8 rounded-xl shadow-lg w-full max-w-[1300px] mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="flex slg:flex-row flex-col justify-center 2xmobile:items-center gap-28 w-full"
        >
          <div className="flex flex-col gap-4 slg:w-2/3">
            <img src={imagelogo} alt="Logo" className="mx-auto" />
            <h2 className="text-2xl font-bold text-center text-bg-gray-100 text-gray-100 mb-6">
              {t("title")}
            </h2>
            <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder={t("firstName")}
                  {...formik.getFieldProps("first_name")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.first_name}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder={t("secondName")}
                  {...formik.getFieldProps("second_name")}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder={t("thirdName")}
                  {...formik.getFieldProps("third_name")}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder={t("lastName")}
                  {...formik.getFieldProps("last_name")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.last_name}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-100 ml-2 font-semibold text-lg">
                  {t("birthdate")}
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps("birthdate")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.birthdate && formik.errors.birthdate && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.birthdate}
                  </div>
                )}
              </div>
              <div>
                <label className="text-gray-100 ml-2 font-semibold text-lg">
                  {t("gender")}
                </label>
                <select
                  {...formik.getFieldProps("gender")}
                  className="w-full p-[9px] bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t("selectGender")}</option>
                  <option value="male">{t("male")}</option>
                  <option value="female">{t("female")}</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder={t("email")}
                {...formik.getFieldProps("email")}
                className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-300 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4">
              <div>
                <input
                  type="password"
                  placeholder={t("password")}
                  {...formik.getFieldProps("password")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder={t("confirmPassword")}
                  {...formik.getFieldProps("confirmPassword")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-red-300 text-sm mt-1">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>
            <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="mobileNo[0]"
                  placeholder={t("phone")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNo[0]}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.mobileNo &&
                  formik.touched.mobileNo[0] &&
                  formik.errors.mobileNo &&
                  formik.errors.mobileNo[0] && (
                    <div className="text-red-300 text-sm mt-1">
                      {formik.errors.mobileNo[0]}
                    </div>
                  )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t("profession")}
                  {...formik.getFieldProps("profession")}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder={t("country")}
                  {...formik.getFieldProps("country")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.country}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder={t("city")}
                  {...formik.getFieldProps("city")}
                  className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-300 text-sm mt-1">
                    {formik.errors.city}
                  </div>
                )}
              </div>
            </div>

            <input
              type="text"
              placeholder={t("postalCode")}
              {...formik.getFieldProps("postal_code")}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />

            <div>
              <textarea
                placeholder={t("freeText")}
                {...formik.getFieldProps("free_text")}
                className="w-full p-3 bg-gray-100 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-red-600 text-white font-semibold flex justify-center items-center rounded-lg hover:bg-red-500 transition duration-300"
              disabled={loading || !formik.isValid || formik.isSubmitting}
            >
              {loading ? (
                <ReactLoading type="spin" color="#fff" height={20} width={20} />
              ) : (
                t("signUp")
              )}
            </button>
          </div>

          <div className="slg:w-1/2">
            <h1 className="text-xl text-white text-center mb-4 flex w-full justify-center items-center gap-2">
              {t("enterImage")}{" "}
              <FaArrowDown className="text-xl text-white -mb-1" />
            </h1>
            {image && (
              <div className="flex justify-center mb-4">
                <img
                  src={image}
                  alt="User"
                  onClick={handleImageClick}
                  className="w-44 h-44 rounded-full object-cover object-center border-2 border-gray-300 cursor-pointer hover:opacity-80 transition"
                />
              </div>
            )}

            {!image && (
              <div className="flex justify-center mb-4">
                <div
                  onClick={handleImageClick}
                  className="w-44 h-44 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center text-gray-700 text-lg cursor-pointer hover:opacity-80 transition"
                >
                  {t("uploadImage")}
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="text-center mt-4">
              <span className="text-bg-gray-100 text-gray-100 font-semibold text-lg flex justify-center items-center gap-2">
                <FaArrowDown className="text-base text-blue-500" />
                {t("loginWith")}{" "}
                <FaArrowDown className="text-base text-green-400" />
              </span>
              <div className="flex justify-center gap-4 mt-2">
                <a
                  href="https://qasr-alnakheel.onrender.com/auth/facebook/callback"
                  className="bg-blue-600 py-2 px-4 rounded w-1/2 hover:bg-blue-800 flex justify-center"
                >
                  <img src={imageLogo} alt="Facebook" className="w-6 h-6" />
                </a>
                <a
                  href="https://qasr-alnakheel.onrender.com/auth/google/callback"
                  className="bg-red-600 py-2 px-4 rounded w-1/2 hover:bg-red-800 flex justify-center"
                >
                  <img src={imageIcon} alt="Google" className="w-6 h-6" />
                </a>
              </div>
            </div>
            <p className="text-center text-bg-gray-100 text-gray-100 mt-4">
              {t("alreadyHaveAccount")}{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                {t("signInNow")}
              </Link>
            </p>
            <Link
              to={"/"}
              className="w-full p-3 mt-5 bg-gray-500 text-bg-gray-100 text-gray-100 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              {t("goToHome")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
