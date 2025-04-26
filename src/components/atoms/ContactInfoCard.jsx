import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function ContactInfoCard({ icon, title, info }) {
  const { t } = useTranslation("about");
  return (
    <div className="flex flex-col justify-center items-center gap-2 min-w-56 bg-zinc-800 text-white shadow-xl shadow-black py-5 rounded-lg">
      <div className="rounded-full bg-white bg-opacity-20 p-3 w-fit ">
        {icon}
      </div>
      <h1 className="text-xl font-bold mt-2">
        {t(
          `contact.${
            title === "رقم الواتس آب" ? "whatsappNumber" : "workingHours"
          }`
        )}
      </h1>
      {title == "رقم الواتس آب" ? (
        <p className="font-semibold text-lg " dir="ltr">
          (+972) 2-231-1111
        </p>
      ) : (
        <p className="font-semibold text-lg ">{info}</p>
      )}
    </div>
  );
}
