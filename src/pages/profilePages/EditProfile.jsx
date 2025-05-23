import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { IoMdCloudUpload } from "react-icons/io";
import { updateCustomerProfile } from "../../api/endpoints/customers";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import noImage from "../../assets/images/No_Image_Available.jpg";
const EditProfile = () => {
  const { t } = useTranslation("profile");
  const userData = useSelector((state) => state.authData.allUserData);

  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [ourAvatar, setOurAvatar] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userData?.first_name || "",
      second_name: userData?.second_name || "",
      third_name: userData?.third_name || "",
      last_name: userData?.last_name || "",
      phoneNumber: userData?.mobileNos?.[0] || "",
      city: userData?.city || "",
      country: userData?.country || "",
      postal_code: userData?.postal_code || "",
      birthdate: userData?.birthdate?.slice(0, 10) || "",
      gender: userData?.gender || "",
      profession: userData?.profession || "",
      free_text: userData?.free_text || "",
      avatar: null,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("second_name", values.second_name);
      formData.append("third_name", values.third_name);
      formData.append("last_name", values.last_name);
      formData.append("city", values.city);
      formData.append("country", values.country);
      formData.append("postal_code", values.postal_code);
      formData.append("birthdate", values.birthdate);
      formData.append("gender", values.gender);
      formData.append("profession", values.profession);
      formData.append("free_text", values.free_text);

      if (values.avatar) {
        formData.append("image", values.avatar);
      }

      try {
        const response = await updateCustomerProfile(formData);
        toast.success(response.data.message);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error(t("editProfile.error"));
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!avatarPreview && userData?.profile_picture) {
      setOurAvatar(userData.profile_picture);
    } else if (avatarPreview) {
      setOurAvatar(avatarPreview);
    }
  }, [avatarPreview, userData]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-6 mx-auto bg-white rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">{t("editProfile.title")}</h2>

      <div className="mb-4 border-b pb-4">
        <label className="block text-gray-700">{t("editProfile.avatar")}</label>
        <div className="flex items-center space-x-4">
          <img
            src={ourAvatar ? ourAvatar : noImage}
            alt="Avatar Preview"
            className="w-20 h-20 rounded-full my-4 object-cover border-4 border-sec-color-100"
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer w-12 h-12 flex justify-center items-center hover:bg-second-color text-white bg-sec-color-100 rounded-md transition-all duration-300"
          >
            <IoMdCloudUpload className="text-2xl" />
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleAvatarChange}
            className="hidden "
          />
        </div>
        <p className="text-gray-500 mt-2">{t("editProfile.imageHint")}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-x-5">
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.firstName")}
            {!formik.values.first_name && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="second_name"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.secondName")}
            {!formik.values.second_name && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="second_name"
            name="second_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.second_name}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="third_name"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.thirdName")}
            {!formik.values.third_name && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="third_name"
            name="third_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.third_name}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.lastName")}
            {!formik.values.last_name && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.country")}
            {!formik.values.country && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.country}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.city")}
            {!formik.values.city && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="postal_code"
            className=" text-gray-700 flex items-center gap-2"
          >
            {t("editProfile.postalCode")}
            {!formik.values.postal_code && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="postal_code"
            name="postal_code"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.postal_code}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profession"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.profession")}
            {!formik.values.profession && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="profession"
            name="profession"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.profession}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthdate"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.birthdate")}
            {!formik.values.birthdate && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.birthdate}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.gender")}
            {!formik.values.gender && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <select
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
            className="w-full mt-1 py-2 px-4 border border-gray-300 rounded-md"
          >
            <option value="">{t("editProfile.chooseGender")}</option>
            <option value="male">{t("editProfile.male")}</option>
            <option value="female">{t("editProfile.female")}</option>
          </select>
        </div>
        <div className="mb-4 col-span-2">
          <label
            htmlFor="free_text"
            className="flex items-center gap-2 text-gray-700"
          >
            {t("editProfile.freeText")}
            {!formik.values.free_text && (
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            )}
          </label>
          <textarea
            id="free_text"
            name="free_text"
            rows="3"
            onChange={formik.handleChange}
            value={formik.values.free_text}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-sec-color-100 hover:bg-sec-color-200 text-white py-2 px-4 rounded-md transition-all duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? t("editProfile.loading") : t("editProfile.submit")}
      </button>
    </form>
  );
};

export default EditProfile;
