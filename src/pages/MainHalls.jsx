import familyHall from "../assets/images/familyHall.jpg";
import companyHall from "../assets/images/companyHall.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function MainHalls() {
  const { i18n } = useTranslation("halls");
  return (
    <div className="flex flex-col 2md:flex-row ">
      <div
        className={`relative 2md:w-1/2 w-full 2md:h-[839px] h-[500px] flex flex-col 2md:flex-row items-center justify-center text-white px-4  ${
          i18n.language === "en" ? "2md:border-r-2" : "2md:border-l-2"
        } 2md:border-b-0 border-b-2`}
      >
        <img
          src={companyHall}
          alt="Company Hall"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-6">{i18n.t("company.title")}</h1>
          <p className="max-w-xl text-lg font-medium mb-10">
            {i18n.t("company.description")}
          </p>
          <Link
            to="/halls/company"
            className="mt-4 border border-white px-6 py-2 text-xl font-semibold hover:bg-white hover:text-black transition"
          >
            {i18n.t("company.buttonText")}
          </Link>
        </div>
      </div>

      <div
        className={`relative 2md:w-1/2 w-full 2md:h-[839px] h-[500px] flex flex-col 2md:flex-row items-center justify-center text-white px-4  ${
          i18n.language === "en" ? "2md:border-l-2" : "2md:border-r-2"
        } 2md:border-t-0 border-t-2`}
      >
        <img
          src={familyHall}
          alt="Family Hall"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-6">{i18n.t("family.title")}</h1>
          <p className="max-w-xl text-lg font-medium mb-10">
            {i18n.t("family.description")}
          </p>
          <Link
            to="/halls/family"
            className="mt-4 border border-white px-6 py-2 text-xl font-semibold hover:bg-white hover:text-black transition"
          >
            {i18n.t("family.buttonText")}
          </Link>
        </div>
      </div>
    </div>
  );
}
