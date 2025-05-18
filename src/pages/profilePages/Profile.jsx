import { Link, Outlet, useLocation } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import userImage from "../../assets/images/icon-7797704_640.png";
import { IoSettingsSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import UpperTitle from "../../components/molecule/UpperTitle";
import upperImage from "../../assets/images/profile-background-b5vedq7mz8mjvslu.jpg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
export default function Profile() {
  const { t, i18n } = useTranslation("profile");
  const userData = useSelector((state) => state.authData.allUserData);
  const location = useLocation();
  return (
    <div className="bg-gray-50 min-h-screen">
      <UpperTitle
        title={t("profile.title")}
        short={true}
        withDesc={false}
        imgSrc={upperImage}
      />
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 gap-0 gap-y-6 lg:gap-6 lg:grid-cols-4 py-20 px-5">
        <div className=" space-y-6">
          <div className="w-full border pb-4 rounded-md bg-white">
            <div className="h-28 bg-sec-text-sec-color-100 bg-opacity-90 rounded-t-md flex justify-center items-end"></div>
            <div className="flex flex-col items-center -mt-16 gap-1">
              <img
                src={
                  userData.profile_picture
                    ? userData.profile_picture
                    : userImage
                }
                alt={t("profile.userImage")}
                className="size-32 rounded-full border-4 object-cover border-sec-color-100"
              />
              <h1 className="font-semibold text-xl mt-3">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-gray-500">
                {userData.role === "user" && i18n.language === "ar"
                  ? "عميل"
                  : "Customer"}
              </p>
            </div>
          </div>
          <div className="w-full border rounded-md p-4 divide-y divide-gray-300 bg-white">
            <div className="pb-4">
              <h1 className="text-lg font-semibold">
                {t("profile.dashboard")}
              </h1>
              <div className="flex flex-col mt-3 space-y-3 pl-1">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 ${
                    location.pathname === "/profile"
                      ? "hover:text-gray-500 text-sec-color-100"
                      : "text-gray-500 hover:text-sec-color-100"
                  } `}
                >
                  <GoPersonFill />
                  {t("profile.myProfile")}
                </Link>
                <Link
                  to="messages"
                  className={`flex items-center gap-2 ${
                    location.pathname === "/profile/messages"
                      ? "hover:text-gray-500 text-sec-color-100"
                      : "text-gray-500 hover:text-sec-color-100"
                  } `}
                >
                  <BiSolidMessageSquareDetail />
                  {t("profile.messages")}
                </Link>
                <Link
                  to="customerBookings"
                  className={`flex items-center gap-2 ${
                    location.pathname === "/profile/customerBookings"
                      ? "hover:text-gray-500 text-sec-color-100"
                      : "text-gray-500 hover:text-sec-color-100"
                  } `}
                >
                  <MdOutlineFavorite />
                  {t("profile.myBookings")}
                </Link>
                <Link
                  to="settings"
                  className={`flex items-center gap-2 ${
                    location.pathname === "/profile/settings"
                      ? "hover:text-gray-500 text-sec-color-100"
                      : "text-gray-500 hover:text-sec-color-100"
                  } `}
                >
                  <IoSettingsSharp />
                  {t("profile.settings")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
