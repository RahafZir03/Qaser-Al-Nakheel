import { RestaurantIntro } from "../components/molecule/RestaurantIntro";
import MenuSection from "../components/molecule/MenuSection";
import OurCuisine from "../components/molecule/OurCuisine";
import MealHours from "../components/molecule/MealHours";
import myImage from "../assets/images/de1.jpeg";
import meal1 from "../assets/images/WhatsApp Image 2024-11-26 at 8.27.38 PM (1).jpeg";
import meal2 from "../assets/images/WhatsApp Image 2024-11-26 at 8.27.36 PM.jpeg";
import meal3 from "../assets/images/76def6c3838ae96c69d5156618db7c3a.jpeg";
const images = [
  {
    src: meal1,
    alt: "Grill",
  },
  {
    src: meal2,
    alt: "Pizza",
    offset: "slg:-mt-24 slg:mb-24",
  },
  {
    src: meal3,
    alt: "Burger",
  },
];

export default function Restaurant() {
  return (
    <main className="bg-back-color">
      <RestaurantIntro
        titleKey="intro.title"
        descKey="intro.description"
        openKey="intro.open"
        cuisineKey="intro.cuisine"
        capacityKey="intro.capacity"
        image={myImage}
        restId="963627b6-63e5-498c-997d-6a1301efa2e3"
      />
      <OurCuisine
        labelKey="cuisine.label"
        titleKey="cuisine.description"
        images={images}
      />
      <MealHours />
      <MenuSection
        image={myImage}
        subtitle="explore.smalltext"
        title="explore.title"
        description="explore.subtitle"
      />
    </main>
  );
}
