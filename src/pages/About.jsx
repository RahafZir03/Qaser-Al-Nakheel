import mainAboutImage from "../assets/images/poolImage.jpeg";
import UpperTitle from "../components/molecule/UpperTitle";
import i18next from "i18next";
import ContactForm from "../components/organism/ContactForm";
import AboutDescription from "../components/molecule/AboutDescription";
import StatisticsSection from "../components/molecule/StatisticsSection";
import MapSection from "../components/molecule/MapSection";

export default function About() {
  return (
    <div className="bg-back-color text-white font-sans">
      <UpperTitle
        title={i18next.language === "en" ? "About Us" : "من نحن"}
        description={"asf"}
        withDesc={false}
        imgSrc={mainAboutImage}
        showFrom={false}
      />

      <AboutDescription />

      <ContactForm />

      <StatisticsSection />

      <MapSection />
    </div>
  );
}
