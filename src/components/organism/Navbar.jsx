import mainLogo from "../../assets/images/logo.png";
import { IoMdPersonAdd, IoMdClose } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import NavLinks from "../atoms/NavLink";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuthData } from "../../features/authData/authDataSlice";
import { logOut } from "../../api/endpoints/auth";
import { setLanguage } from "../../features/langData/langSlice";
import { IoLanguageSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { MdAdminPanelSettings } from "react-icons/md";
import { Menu } from "@headlessui/react";

function Navbar() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.authData.userId);
  const role = useSelector((state) => state.authData.userRole);
  const language = useSelector((state) => state.language.lang);

  const profileImage = useSelector(
    (state) => state.authData?.allUserData?.profile_picture
  );
  const [isHalfScreen, setIsHalfScreen] = useState(window.innerWidth > 950);
  const [openNav, setOpenNav] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    dispatch(setLanguage(newLang));
  };

  const handleLogOut = async () => {
    await logOut();
    dispatch(deleteAuthData());
  };
  useEffect(() => {
    const handleResize = () => {
      setIsHalfScreen(window.innerWidth > 950);
      if (isHalfScreen !== window.innerWidth > 950) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isHalfScreen]);

  const handleNavButton = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="w-full absolute z-50 border-b border-gray-600 shadow-xl bg-my-color">
      <header
        className={` max-w-[1400px] mx-auto flex items-center justify-between h-24 px-4 relative`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src={mainLogo} alt="Logo" className="h-16" />
        </Link>
        {isHalfScreen ? (
          <>
            <ul className="flex gap-3 slg:gap-5 xl:gap-10 justify-center items-center p-4 ">
              <NavLinks linksLayout={"fullPage"} bgColor={"dark"} />
            </ul>
            <div className="relative">
              <button
                onClick={() => setOpenNav(!openNav)}
                className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-gray-400 to-gray-600 w-full h-full flex items-center justify-center text-white text-xl font-bold">
                    U
                  </div>
                )}
              </button>

              {openNav && (
                <div
                  className={`absolute ${
                    i18n.language === "ar" ? "left-0" : "right-0"
                  } mt-3 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden animate-fadeIn`}
                >
                  <ul className="flex flex-col py-2">
                    {id && (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            onClick={() => setOpenNav(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                          >
                            <IoMdPersonAdd className="text-lg text-my-color" />
                            {i18n.language === "ar"
                              ? "الصفحة الشخصية"
                              : "Profile"}
                          </Link>
                        </li>
                        {role !== "user" && (
                          <li>
                            <Link
                              to="/admin"
                              onClick={() => setOpenNav(false)}
                              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                            >
                              <MdAdminPanelSettings className="text-xl text-my-color" />
                              {i18n.language === "ar"
                                ? "لوحة التحكم"
                                : "Admin Panel"}
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                    <li>
                      <button
                        onClick={toggleLanguage}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <IoLanguageSharp />
                        {language === "en" ? "العربية" : "English"}
                      </button>
                    </li>
                    {!id ? (
                      <>
                        <li>
                          <Link
                            to="/signUp"
                            onClick={() => setOpenNav(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                          >
                            <IoMdPersonAdd className="text-lg text-my-color" />
                            {i18n.language === "ar" ? "إنشاء حساب" : "Sign Up"}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/logIn"
                            onClick={() => setOpenNav(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                          >
                            <IoLogIn className="text-lg text-my-color" />
                            {i18n.language === "ar" ? "تسجيل الدخول" : "Log in"}
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setOpenNav(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-3 font-bold text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <IoLogOut className="text-lg" />
                          {i18n.language === "ar"
                            ? "تسجيل خروج"
                            : "Log out"}{" "}
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={handleNavButton}
            className="flex justify-center items-center w-10 h-10 min-w-10 rounded-md bg-white"
          >
            {!openNav ? (
              <FaBars className="text-my-color text-2xl" />
            ) : (
              <IoMdClose className="text-my-color text-3xl" />
            )}
          </button>
        )}
        <div
          className={`absolute bg-gray-200 right-2 left-2 rounded-md p-5 transition-all duration-300 border-2 border-black ${
            openNav && !isHalfScreen
              ? "top-24 opacity-100 z-50 "
              : "-top-96 opacity-0 -z-50"
          }`}
        >
          <div className="flex flex-col w-full justify-between">
            <ul className="flex flex-col flex-1 gap-4 justify-start items-start w-full">
              <NavLinks
                linksLayout={"halfPage"}
                bgColor={"light"}
                handleNavButton={handleNavButton}
              />
            </ul>
            <div className="flex flex-col w-full max-w-52 border-t border-my-color pt-3">
              <Menu as="div" className="relative w-full">
                <div>
                  <Menu.Button className="flex items-center justify-between w-full bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 focus:outline-none transition-all">
                    <span>{i18n.language === "en" ? "Menu" : "القائمة"}</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Menu.Items
                  className={`absolute mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-300 
                     ${i18n.language === "ar" ? "-left-10" : "-right-10"}`}
                >
                  <div className="py-2">
                    {id && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              onClick={() => setOpenNav(false)}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } flex items-center gap-3 px-5 py-2 text-sm text-gray-800 font-bold transition`}
                            >
                              <IoMdPersonAdd className="text-lg text-my-color" />
                              {i18n.language === "ar"
                                ? "الصفحة الشخصية"
                                : "Profile"}
                            </Link>
                          )}
                        </Menu.Item>
                        {role !== "user" && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin"
                                onClick={() => setOpenNav(false)}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } flex items-center gap-3 px-5 py-2 text-sm text-gray-800 font-bold transition`}
                              >
                                <MdAdminPanelSettings className="text-xl text-my-color" />
                                {i18n.language === "ar"
                                  ? "لوحة التحكم"
                                  : "Admin Panel"}
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </>
                    )}

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            toggleLanguage();
                            setOpenNav(false);
                          }}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } w-full flex items-center gap-3 px-5 py-2 text-sm text-gray-800 font-bold text-left transition`}
                        >
                          <IoLanguageSharp className="text-lg" />
                          {language === "en" ? "العربية" : "English"}
                        </button>
                      )}
                    </Menu.Item>

                    {!id ? (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signUp"
                              onClick={() => setOpenNav(false)}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } flex items-center gap-3 px-5 py-2 text-sm text-gray-800 font-bold transition`}
                            >
                              <IoMdPersonAdd className="text-lg text-my-color" />
                              {i18n.language === "ar"
                                ? "إنشاء حساب"
                                : "Sign Up"}
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/logIn"
                              onClick={() => setOpenNav(false)}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } flex items-center gap-3 px-5 py-2 text-sm text-gray-800 font-bold transition`}
                            >
                              <IoLogIn className="text-lg text-my-color" />
                              {i18n.language === "ar"
                                ? "تسجيل الدخول"
                                : "Log in"}
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              handleLogOut();
                              setOpenNav(false);
                            }}
                            className={`${
                              active ? "bg-red-50" : ""
                            } w-full flex items-center gap-3 px-5 py-2 text-sm font-bold text-red-600 text-left transition`}
                          >
                            <IoLogOut className="text-lg" />
                            {i18n.language === "ar" ? "تسجيل خروج" : "Log out"}
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
