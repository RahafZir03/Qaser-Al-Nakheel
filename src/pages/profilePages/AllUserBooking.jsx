import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getHallReservationForCustomer,
  getPoolReservationForCustomer,
  getRestaurantReservationForCustomer,
  getRoomBookings,
} from "../../api/endpoints/customers";
import BookingTables from "../../components/organism/BookingTable";
import PaginationRounded from "../../components/molecule/PaginationRounded";

const bookingTypes = {
  room: getRoomBookings,
  hall: getHallReservationForCustomer,
  pool: getPoolReservationForCustomer,
  restaurant: getRestaurantReservationForCustomer,
};

export default function AllUserBooking() {
  const { t } = useTranslation("profile");
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("room");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await bookingTypes[type](page, 8);
        setBookings(response.data.bookings || response.data.reservations);
        setTotalPages(response.data.countBooking || response.data.count);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [page, type]);

  return (
    <div className="p-6 w-d col-span-3">
      <h1 className="text-2xl font-semibold mb-4">{t("customerBookings")}</h1>

      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="bookingType" className="text-sm font-medium">
          {t("selectBookingType")}
        </label>
        <select
          id="bookingType"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <option value="room">{t("room")}</option>
          <option value="hall">{t("hall")}</option>
          <option value="pool">{t("pool")}</option>
          <option value="restaurant">{t("restaurant")}</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">{t("loading")}</div>
      ) : (
        <BookingTables bookings={bookings} type={type} />
      )}

      <PaginationRounded
        count={Math.ceil(totalPages / 8)}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
        theme="light"
      />
    </div>
  );
}
