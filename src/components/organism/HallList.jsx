/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getAllHalls } from "../../api/endpoints/halls";
import cinema from "../../assets/images/cinema.png";
import school from "../../assets/images/school.png";
import u_shape from "../../assets/images/u_shape.png";
import i_shape from "../../assets/images/i_shape.png";
import geneva from "../../assets/images/geneva.png";
import banquet from "../../assets/images/banquet.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RenderStars from "../atoms/RenderStars";

const imageMap = {
  cinema,
  school,
  u_shape,
  i_shape,
  geneva,
  banquet,
};
const HallList = ({ myRef, hallType }) => {
  const { t, i18n } = useTranslation("hall");
  const [halls, setHalls] = useState([]);
  const [expandedHallId, setExpandedHallId] = useState(null);

  useEffect(() => {
    async function fetchHalls() {
      const response = await getAllHalls(hallType);
      setHalls(response.data.halls);
    }
    fetchHalls();
  }, []);

  const toggleExpand = (id) => {
    setExpandedHallId((prev) => (prev === id ? null : id));
  };

  const formatCapacity = (capacityArray) => {
    if (!Array.isArray(capacityArray)) {
      try {
        // محاولة تحويل السلسلة إلى JSON
        const fixedString = capacityArray
          .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
          .replace(/'/g, '"');
        capacityArray = JSON.parse(fixedString);
      } catch (e) {
        console.error("Error parsing capacity array:", e.message);
        return null;
      }
    }

    return capacityArray
      .map((item, i) => {
        try {
          let parsed = item;

          // إذا العنصر String، نحاول نحوله
          if (typeof item === "string") {
            const fixedItem = item
              .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
              .replace(/'/g, '"');
            parsed = JSON.parse(fixedItem);
          }

          // نتأكد أن العنصر كائن يحتوي على type و capacity
          if (
            typeof parsed !== "object" ||
            parsed === null ||
            !parsed.type ||
            !parsed.capacity
          ) {
            throw new Error("Invalid capacity item");
          }

          return (
            <div key={i}>
              <img
                src={imageMap[parsed.type]}
                alt={parsed.type}
                className="w-16 h-16 object-contain mb-2 mx-auto"
              />
              <span className="bg-sec-color-200 text-black px-3 py-1 rounded-full text-sm font-medium shadow-md">
                {parsed.type.replace("_", " ")}: {parsed.capacity}
              </span>
            </div>
          );
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean); // إزالة العناصر null
  };

  const getMinMaxCapacity = (capacityArray) => {
    if (!Array.isArray(capacityArray)) return { min: null, max: null };

    const capacities = [];

    for (const item of capacityArray) {
      try {
        let parsed = item;

        if (typeof item === "string") {
          const fixedItem = item
            .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
            .replace(/'/g, '"');
          parsed = JSON.parse(fixedItem);
        }

        if (parsed && parsed.capacity) {
          const numericCapacity = parseInt(parsed.capacity, 10);
          if (!isNaN(numericCapacity)) {
            capacities.push(numericCapacity);
          }
        }
      } catch (error) {
        console.error("Error parsing capacity item:", item, error.message);
      }
    }

    const min = capacities.length ? Math.min(...capacities) : null;
    const max = capacities.length ? Math.max(...capacities) : null;

    return { min, max };
  };

  return (
    <div
      className="max-w-[1300px] mx-auto p-4 gap-2 flex flex-col py-20"
      ref={myRef}
    >
      {halls.map((hall) => {
        const { min, max } = getMinMaxCapacity(hall.capacity);
        return (
          <motion.div
            key={hall.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border bg-zinc-800 rounded border-sec-color-200 text-white shadow-2xl p-6"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(hall.id)}
            >
              <div className="flex flex-wrap items-center justify-between w-full md:pr-4 gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-2xl font-bold text-sec-color-200">
                    {hall.name[i18n.language] || hall.name.en}
                  </h2>
                  <span className="text-sm font-semibold text-white bg-sec-color-100 px-3 py-1 rounded-full shadow">
                    {t("hall.pricePerHour")}: {hall.price_per_hour} NIS
                  </span>
                </div>
                <div
                  className="flex items-center gap-1"
                  title={`${
                    i18n.language === "en"
                      ? "Number of reviews"
                      : "عدد التقييمات"
                  } : ${hall.ratingCount}`}
                >
                  <p className="">
                    {i18n.language === "en"
                      ? "Users Rating"
                      : "تقييم المستخدمين"}{" "}
                    :
                  </p>
                  <RenderStars ratingNumber={hall.averageRating} />
                </div>
                <p className="text-gray-200 max-w-xl flex gap-2">
                  <span className="text-base font-medium text-gray-400 ml-3">
                    ({min}–{max} {t("hall.person")})
                  </span>
                  {hall.suitable_for[i18n.language] || hall.suitable_for.en}
                </p>
              </div>
              {expandedHallId === hall.id ? (
                <ChevronUp className="w-6 h-6 text-sec-color-200" />
              ) : (
                <ChevronDown className="w-6 h-6 text-sec-color-200" />
              )}
            </div>

            <AnimatePresence>
              {expandedHallId === hall.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden mt-4 border-t border-gray-600 pt-4 space-y-6 text-sm"
                >
                  {/* Capacity */}
                  <div>
                    <h3 className="font-semibold text-sec-color-200 mb-2 text-lg">
                      {t("hall.capacityAndSeating")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {formatCapacity(hall.capacity)}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 text-sm text-center border">
                    <div className=" md:border-r text-xl py-5 px-3 text-sec-color-200">
                      <strong className="text-white">{t("hall.area")}:</strong>{" "}
                      {hall.length * hall.width} {t("hall.m")}²
                    </div>
                    <div className="md:border-r md:border-y-0 border-y text-sec-color-200 text-xl py-5 px-3">
                      <strong className="text-white">
                        {t("hall.length")}:
                      </strong>{" "}
                      {hall.length} {t("hall.m")}
                    </div>
                    <div className="text-xl py-5 px-3 text-sec-color-200">
                      <strong className="text-white">{t("hall.width")}:</strong>{" "}
                      {hall.width} {t("hall.m")}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h3 className="font-semibold text-sec-color-200 mb-2 text-lg">
                      {t("hall.facilities")}
                    </h3>
                    <div className="grid xmobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {hall.facilities.map((facility) => (
                        <div
                          key={facility.id}
                          className="bg-zinc-900  rounded-xl shadow p-3  hover:shadow-lg transition"
                        >
                          <div className=" rounded-full p-1 mb-2 flex max-w-fit items-center justify-center mx-auto border-2 border-sec-color-200">
                            <img
                              src={facility.image}
                              alt={facility.name.en}
                              className="w-14 h-14 object-contain bg-white p-1 rounded-full"
                            />
                          </div>
                          <h4 className="font-bold text-sm text-sec-color-200">
                            {facility.name[i18n.language] || facility.name.en}
                          </h4>
                          <p className="text-xs text-gray-300">
                            {facility.description[i18n.language] ||
                              facility.description.en}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="font-semibold text-sec-color-200 mb-2 text-lg">
                      {t("hall.gallery")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hall.images.map((img) => (
                        <img
                          key={img.id}
                          src={img.image_name_url}
                          alt="hall"
                          className="rounded-lg w-full h-56 object-cover border border-zinc-700 shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center">
                    <Link
                      to={`/hall/bookings/${hall.id}`}
                      className="px-8 py-5 text-xl font-bold rounded-md bg-sec-color-100 hover:bg-sec-color-200"
                    >
                      {" "}
                      {i18n.language === "en" ? "Book Hall" : "احجز القاعة"}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HallList;
