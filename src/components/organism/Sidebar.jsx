import PropTypes from "prop-types";
import profileImage from "../../assets/images/vaiolet.png";
import SidebarLink from "../atoms/SidebarLink";
import sidebarItems from "../../constants/sidebarItems";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Sidebar({ sidebarSize, isHalfScreen, setSidebarSize }) {
  const { t } = useTranslation();
  const changeSize = true;

  useEffect(() => {
    if (changeSize === isHalfScreen) {
      setSidebarSize("small");
      console.log(isHalfScreen);
    }
  }, [isHalfScreen, setSidebarSize, changeSize]);

  return (
    <div
      dir="rtl"
      className={`flex flex-col h-[100vh] bg-[#191c24] z-10 fixed bottom-0 top-0 rtl:right-0 ltr:left-0 text-white
        ${
          !isHalfScreen && sidebarSize === "big"
            ? "w-[244px] ltr:right-[-244px] left-[-244px]"
            : isHalfScreen && sidebarSize === "big"
            ? "w-[244px]"
            : isHalfScreen && sidebarSize === "small"
            ? "w-[70px] rtl:mr-[-70px] ltr:ml-[-70px]"
            : !isHalfScreen && sidebarSize === "small"
            ? "w-[70px]"
            : "w-[244px]"
        } transition-all ease-in-out duration-200`}
    >
      {!isHalfScreen && (
        <h1
          className={`mt-4 text-gray-100 font-semibold text-3xl ${
            sidebarSize === "big"
              ? "rtl:mr-6 ltr:ml-6 py-1 tracking-wider"
              : sidebarSize === "small"
              ? "rtl:mr-4 ltr:ml-4 tracking-widest"
              : ""
          }`}
        >
          {sidebarSize === "big"
            ? `${t("dashboard")}`
            : sidebarSize === "small"
            ? "HR"
            : ""}
        </h1>
      )}
      <div
        className={`flex flex-col overflow-y-auto overflow-x-hidden ${
          isHalfScreen ? "mt-[70px]" : ""
        }`}
      >
        <div
          className={`py-1 mb-0 mt-[18px] ${
            sidebarSize === "big"
              ? "mx-4 gap-3 rtl:pr-[2px] ltr:pl-[2px] flex items-center"
              : sidebarSize === "small"
              ? "mx-auto"
              : ""
          }`}
        >
          <img
            src={profileImage}
            alt="profileImage"
            className="w-[35px] h-[35px] rounded-full shadow-md shadow-gray-950 object-cover mx-2"
          />
          <div className="w-full">
            {sidebarSize === "big" && (
              <p className="text-md text-white">اسم المستخدم</p>
            )}
          </div>
        </div>
        {sidebarSize === "big" && (
          <h1 className="rtl:mr-6 ltr:ml-6 my-5 w-full text-lg font-semibold text-gray-300">
            {i18next.language === "en" ? "Mobility" : "التنقل"}
          </h1>
        )}
        <ul className={`${sidebarSize === "small" ? "mt-5" : ""}`}>
          {sidebarItems.map((item, index) => (
            <SidebarLink
              key={item.to || index}
              {...item}
              sidebarSize={sidebarSize}
              setSidebarSize={setSidebarSize}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  sidebarSize: PropTypes.string,
  setSidebarSize: PropTypes.func.isRequired,
  isHalfScreen: PropTypes.bool,
};
