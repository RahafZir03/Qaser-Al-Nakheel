/* eslint-disable react/prop-types */
import UpperTitle from "../components/molecule/UpperTitle";
import comImage from "../assets/images/companyHall2.jpg";
import familyImage from "../assets/images/family2.jpeg";
import PageDescription from "../components/atoms/PageDescription";
import ConferenceFeatures from "../components/molecule/ConferenceFeatures";
import { useTranslation } from "react-i18next";
import HallList from "../components/organism/HallList";
import { useRef } from "react";

export default function Hall({ hallType }) {
  const myRef = useRef(null);
  const { t } = useTranslation();

  const titleKey = `${hallType}HallMainTexts.upperSection.title`;
  const descKey = `${hallType}HallMainTexts.upperSection.description`;

  const sectionTitleKey = `${hallType}HallMainTexts.descriptionSection.title`;
  const sectionDescKey = `${hallType}HallMainTexts.descriptionSection.description`;

  return (
    <div className="bg-my-color">
      <UpperTitle
        title={t(titleKey)}
        description={t(descKey)}
        withDesc={true}
        imgSrc={hallType === "company" ? comImage : familyImage}
      />
      <PageDescription
        title={t(sectionTitleKey)}
        description={t(sectionDescKey)}
        targetRef={myRef}
      />

      <ConferenceFeatures />
      <HallList
        myRef={myRef}
        hallType={hallType === "company" ? "meeting" : "party"}
      />
    </div>
  );
}
