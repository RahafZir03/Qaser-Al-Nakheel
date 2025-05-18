import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookingFormForHall } from "../components/molecule/BookingFormForHall";
import { DateSelector } from "../components/molecule/DateSelector";
import { HallTimeline } from "../components/molecule/HallTimeline";
import { useParams } from "react-router-dom";
import { getReservationsByHallAndDate } from "../api/endpoints/booking";
import { Mosaic } from "react-loading-indicators";
import { useTranslation } from "react-i18next";
import { getHallById } from "../api/endpoints/halls";
import UpperTitle from "../components/molecule/UpperTitle";

export const HallBooking = () => {
  const { t, i18n } = useTranslation("hall");
  const hallId = useParams().id;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hallData, setHallData] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split("T")[0];
        const res2 = await getHallById(hallId);
        setHallData(res2.data.hall);
        const res = await getReservationsByHallAndDate(hallId, dateStr);
        setReservations(res.data.reservations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [selectedDate, hallId]);

  return (
    <motion.div
      className="  bg-my-color"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <UpperTitle
        title={t("hallbooking.title")}
        description={
          isLoading
            ? "loading..."
            : hallData.name[i18n.language] || hallData.name.en
        }
        withDesc={true}
        imgSrc={isLoading ? "loading..." : hallData.images[0].image_name_url}
        short={true}
      />
      <div className="p-6">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {loading ? (
          <div className="flex justify-center my-10">
            <Mosaic color={["#7a6a1d", "#a38d27", "#ccb131", "#d7c159"]} />
          </div>
        ) : (
          <>
            <div className="my-6">
              <HallTimeline
                reservations={reservations}
                selectedDate={selectedDate}
              />
            </div>
            <BookingFormForHall hallId={hallId} selectedDate={selectedDate} />
          </>
        )}
      </div>
    </motion.div>
  );
};
