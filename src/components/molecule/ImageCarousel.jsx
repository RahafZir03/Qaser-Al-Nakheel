/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import RenderStars from "../atoms/RenderStars";
const ImageCarousel = ({ images }) => {
  const { t, i18n } = useTranslation("home");
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1124 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1124, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mx-auto h-[350px] py-8 max-w-[1300px]">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        itemClass="px-4"
        partialVisible
      >
        {images.map((src, index) => {
          const today = new Date();
          const todayName = today
            .toLocaleDateString("en-US", { weekday: "long" })
            .toLowerCase();

          const specialPrice = src.room.SpecialPricings?.find((sp) => {
            const start = new Date(sp.start_date);
            const end = new Date(sp.end_date);
            return start <= today && today <= end;
          });

          const normalPrice = src.room.RoomPricings?.find(
            (rp) => rp.day_of_week.toLowerCase() === todayName
          );

          const price = specialPrice ? specialPrice.price : normalPrice?.price;
          const isSpecial = !!specialPrice;

          // تنسيق تاريخ انتهاء العرض الخاص
          const formattedEndDate = isSpecial
            ? new Date(specialPrice.end_date).toLocaleDateString(
                i18n.language === "ar" ? "ar-EG" : "en-US",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )
            : null;

          return (
            <div key={src.id}>
              <div className="relative w-full h-[350px] rounded-2xl overflow-hidden group border shadow-xl shadow-black/40 my-4 transition-transform duration-500 hover:scale-[1.02]">
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6 text-white space-y-3">
                  <h2 className="text-xl sm:text-2xl font-extrabold">
                    {src.name[i18n.language] || src.name.en}
                  </h2>
                  <p className="text-sm line-clamp-3">
                    {src.description[i18n.language] || src.description.en}
                  </p>

                  <div
                    className="flex items-center gap-2 text-sm"
                    title={`${
                      i18n.language === "en"
                        ? "Number of reviews"
                        : "عدد التقييمات"
                    } : ${src.room.ratingCount}`}
                  >
                    <span>
                      {i18n.language === "en"
                        ? "Users Rating"
                        : "تقييم المستخدمين"}
                      :
                    </span>
                    <RenderStars ratingNumber={src.room.averageRating} />
                  </div>

                  <p className="text-base sm:text-lg font-semibold bg-green-700/90 px-3 py-1 rounded-md w-fit">
                    {price} NIS{" "}
                    {isSpecial && (
                      <span className="block text-yellow-300 text-sm mt-1 font-medium">
                        ({t("home.ImageCarousel.special")} - {formattedEndDate})
                      </span>
                    )}
                  </p>

                  <Link
                    to={`/rooms/roomDetails/${src.room.id}`}
                    className="mt-2 flex max-w-fit bg-yellow-600 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-full transition duration-300 shadow-md"
                  >
                    {t("home.ImageCarousel.button")}
                  </Link>
                </div>

                {/* Background Image */}
                <img
                  src={src.room.RoomImages[0].image_name_url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;