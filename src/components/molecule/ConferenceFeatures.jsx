/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import bg_image from "../../assets/images/companyHall.jpg";
import {
  FaMapMarkerAlt,
  FaTv,
  FaThList,
  FaWifi,
  FaUtensils,
  FaBell,
  FaParking,
  FaShieldAlt,
  FaWater,
  FaBuilding,
  FaGem,
  FaExpandAlt,
  FaLightbulb,
  FaVolumeUp,
  FaFemale,
  FaSnowflake,
  FaPaintBrush,
  FaCar,
  FaCameraRetro,
} from "react-icons/fa";

const featuresListCompany = [
  { icon: FaMapMarkerAlt, key: "central_location" },
  { icon: FaTv, key: "modern_equipment" },
  { icon: FaThList, key: "flexible_seating" },
  { icon: FaWifi, key: "high_speed_internet" },
  { icon: FaUtensils, key: "on_site_catering" },
  { icon: FaBell, key: "event_support" },
  { icon: FaParking, key: "parking" },
  { icon: FaShieldAlt, key: "quiet_environment" },
  { icon: FaWater, key: "acoustic_design" },
  { icon: FaBuilding, key: "tech_friendly" },
];

const featuresListFamily = [
  { icon: FaGem, key: "elegant_design" },
  { icon: FaExpandAlt, key: "spacious_hall" },
  { icon: FaLightbulb, key: "custom_lighting" },
  { icon: FaVolumeUp, key: "high_quality_sound" },
  { icon: FaFemale, key: "bridal_suite" },
  { icon: FaSnowflake, key: "air_conditioned" },
  { icon: FaPaintBrush, key: "decor_services" },
  { icon: FaUtensils, key: "catering_options" },
  { icon: FaCar, key: "valet_parking" },
  { icon: FaCameraRetro, key: "photo_areas" },
];

export default function ConferenceFeatures({ hallType }) {
  const { t } = useTranslation();
  const featuresList =
    hallType === "company" ? featuresListCompany : featuresListFamily;
  const mainKey =
    hallType === "company" ? "conferenceFeatures" : "weddingHallFeatures";
  return (
    <div className="pt-52 pb-20 bg-my-color relative flex">
      <h1></h1>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-10 z-20 text-white">
        {featuresList.map(({ icon: Icon, key }, index) => {
          const isMiddle = index % 3 === 1;
          const isLast = index === featuresList.length - 1;
          const shouldCenterLast = featuresList.length % 3 === 1 && isLast;

          return (
            <div
              key={key}
              className={`p-3 bg-[#212124] max-w-72 h-64 max-h-52 transition-all duration-300 
        ${isMiddle ? "lg:-mt-36" : ""} 
        ${shouldCenterLast ? "lg:col-start-2 lg:-mt-36" : ""}`}
            >
              <div className="flex flex-col items-start justify-around h-full bg-[#D9D9D904] p-2 shadow-md text-center">
                <div className="bg-primary/10 gap-2 flex w-full justify-between text-primary p-3 rounded-full text-center">
                  <Icon className="w-6 h-6" />
                  <h3 className="text-xl font-semibold flex-1">
                    {t(`${mainKey}.${key}.title`)}
                  </h3>
                </div>
                <div className="w-full">
                  <p className="text text-center">
                    {t(`${mainKey}.${key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <img
        src={bg_image}
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/60"></div>
    </div>
  );
}
