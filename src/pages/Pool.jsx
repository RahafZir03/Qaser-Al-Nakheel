import OurCuisine from "../components/molecule/OurCuisine";
import meanImage from "../assets/images/pool/d3cbb61eeaef772ae275e7b75c9c3111.jpeg";
import pool1 from "../assets/images/pool/f62e484780b7599e60950c67777284ab.jpeg";
import pool2 from "../assets/images/pool/9fbaa050ae67c2751c5a404223470014.jpeg";
import pool3 from "../assets/images/pool/d5ce2253b4ba9f9cc1cc4366fd369b74.jpeg";
import UpperTitle from "../components/molecule/UpperTitle";
import { useTranslation } from "react-i18next";
import PoolFacilites from "../components/molecule/PoolFacilites";
import PoolShowcase from "../components/organism/PoolShowcase";
const images = [
  {
    src: pool1,
    alt: "Grill",
  },
  {
    src: pool2,
    alt: "Pizza",
    offset: "slg:-mt-24 slg:mb-24",
  },
  {
    src: pool3,
    alt: "Burger",
  },
];
export default function Pool() {
  const { t } = useTranslation("restaurant");
  return (
    <main className="bg-back-color">
      <UpperTitle
        title={t("pool.headerSection.title")}
        imgSrc={meanImage}
        withDesc={false}
      />
      <OurCuisine
        labelKey="pool.secondSection.label"
        titleKey="pool.secondSection.description"
        images={images}
      />
      <PoolFacilites />
      <PoolShowcase />
    </main>
  );
}
