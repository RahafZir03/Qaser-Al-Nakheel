import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import mainLogo from "../../assets/images/logo.png";
import NavLinks from "../atoms/NavLink";
import { MdFacebook } from "react-icons/md";

export default function Footer() {
  const { t, i18n } = useTranslation("about");
  const isArabic = i18n.language === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <footer className="bg-third-color py-10 text-white bg-my-color">
        <div className="max-w-[1300px] mx-auto px-4 flex justify-between flex-col 2md:flex-row text-left">
          <div
            className={`flex flex-col 2md:w-3/5 mb-6 pr-12 md:mb-0 ${
              isArabic ? "text-right" : ""
            }`}
          >
            <Link to="/">
              <img
                src={mainLogo}
                alt="Clinic Office System Logo"
                className="mb-4 max-w-64 w-auto"
              />
            </Link>
            <p>{t("footer.addressLine1")}</p>
            <p className="mt-2">{t("footer.description")}</p>
          </div>
          <div
            className={`2md:w-1/5 mb-6 px-4 md:mb-0 mt-5 ${
              isArabic ? "text-right" : ""
            }`}
          >
            <h3 className="flex font-semibold text-lg mb-3">
              {t("footer.pagesTitle")}
            </h3>
            <ul
              className={`flex flex-col flex-1 gap-3 justify-start items-start w-full`}
            >
              <NavLinks linksLayout={"halfPage"} bgColor={"footer"} />
            </ul>
          </div>
          <div
            className={`2md:w-1/5 mb-6 md:mb-0 mt-5 ${
              isArabic ? "text-right" : ""
            }`}
          >
            <h3 className="font-semibold mb-3 text-lg">
              {t("footer.contactTitle")}
            </h3>
            <div>
              <p className="text-lg font-semibold">
                {t("footer.contactAddress")}
              </p>
              <p className="text-lg font-semibold">
                {t("footer.contactPhone")}
              </p>
              <a href="https://www.facebook.com/QasrAlnakhel">
                <MdFacebook className="text-4xl text-blue-500 hover:text-blue-400" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
