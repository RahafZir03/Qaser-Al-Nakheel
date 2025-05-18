import { useFormik } from "formik";
import * as Yup from "yup";
import { logIn } from "../../api/endpoints/auth";
import { logInForEmployee } from "../../api/endpoints/auth";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { saveAuthData } from "../../features/authData/authDataSlice";
import { Link } from "react-router-dom";
import imageIcon from "../../assets/images/google.png";
import imageLogo from "../../assets/images/facebook.png";
import imagelogo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { t } = useTranslation("signUp");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = isEmployee
          ? await logInForEmployee(values)
          : await logIn(values);
        toast.success(
          t("login.welcome", {
            firstName: response.data.user.first_name,
            lastName: response.data.user.last_name,
          })
        );
        dispatch(
          saveAuthData({
            userId: response.data.user.id,
            allUserData: response.data.user,
            userRole: response.data.user.role,
          })
        );
        navigate("/");
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-96 bg-opacity-0">
      <img src={imagelogo} alt="logo" className="mx-auto" />
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {t("login.title")}
      </h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder={t("login.emailPlaceholder")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.email && t("login.emailRequired")}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder={t("login.passwordPlaceholder")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password && t("login.passwordRequired")}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              checked={isEmployee}
              onChange={(e) => setIsEmployee(e.target.checked)}
              className="mr-2"
            />
            {t("login.rememberAsEmployee")}
          </label>

          <Link
            to="/logIn/forgot-password"
            className="text-red-500 ml-auto text-sm"
          >
            {t("login.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg flex justify-center items-center hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {loading ? (
            <ReactLoading type="spin" color="#fff" height={20} width={20} />
          ) : (
            t("login.submit")
          )}
        </button>

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

        <p className="text-center text-white mt-4">
          {t("login.alreadyHaveAccount")}{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            {t("login.signupNow")}
          </Link>
        </p>
      </form>
    </div>
  );
}
