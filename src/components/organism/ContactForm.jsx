import { FaClock, FaWhatsapp } from "react-icons/fa";
import ContactInfoCard from "../atoms/ContactInfoCard";
import { MdAlternateEmail } from "react-icons/md";
import { TbArrowBigDownFilled } from "react-icons/tb";
import MyForm from "./MyForm";
import { useTranslation } from "react-i18next";
export default function ContactForm() {
  const { t } = useTranslation("about");
  const contactInfoData = [
    {
      icon: <FaWhatsapp className="size-8 text-green-600" />,
      title: "contact.whatsappNumber",
      info: "+972569697622",
    },
    {
      icon: <FaClock className="size-8 text-yellow-600" />,
      title: "contact.workingHours",
      info: "7 Days - 24/7",
    },
  ];
  return (
    <div className="max-w-[1400px] text-white mx-auto px-5 grid slg:grid-cols-2 my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-extrabold ">{t("contact.contactUs")}</h1>
        <div className="flex flex-col md:flex-row slg:flex-col justify-center items-center gap-10 mt-14">
          {contactInfoData.map((item, index) => (
            <ContactInfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              info={item.info}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="bg-zinc-900 rounded shadow-lg slg:mt-0 mt-20 shadow-black z-20">
          <div className="flex gap-4 items-center p-8 ">
            <div className="p-2 bg-white bg-opacity-40 w-fit rounded-md">
              <MdAlternateEmail className="text-white text-4xl" />
            </div>
            <p className="font-semibold md:font-bold text-sm md:text-base 2md:text-lg text-white flex items-center">
              {t("contact.sendUsMessage")}{" "}
              <TbArrowBigDownFilled className="mr-2 text-xl" />
            </p>
          </div>
          <MyForm />
        </div>
      </div>
    </div>
  );
}
