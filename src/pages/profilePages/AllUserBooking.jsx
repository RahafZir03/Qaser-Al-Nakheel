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
  const [filters, setFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setBookings([]);

        // تجهيز المعلمات المناسبة للإرسال
        const params = {
          page,
          limit: 8,
        };

        if (filters.status) params.status = filters.status;
        if (filters.payed === "true" || filters.payed === "false")
          params.payed = filters.payed;
        if (filters.date) params.date = filters.date;

        const response = await bookingTypes[type](params);

        setBookings(response.data.bookings || response.data.reservations);
        setTotalPages(response.data.countBooking || response.data.count);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setBookings([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [page, type, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);
  useEffect(() => {
    setPage(1);
    setFilters({});
  }, [type]);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("status")}
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={tempFilters.status || ""}
            onChange={(e) =>
              setTempFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">{t("all")}</option>
            {type === "room" && (
              <>
                <option value="confirmed">{t("confirmed")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="canceled">{t("cancelled")}</option>
              </>
            )}
            {type === "hall" && (
              <>
                <option value="confirmed">{t("confirmed")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </>
            )}
            {type === "pool" && (
              <>
                <option value="reserved">{t("reserved")}</option>
                <option value="canceled">{t("cancelled")}</option>
                <option value="checked_in">{t("checked_in")}</option>
                <option value="checked_out">{t("checked_out")}</option>
              </>
            )}
            {type === "restaurant" && (
              <>
                <option value="Pending">{t("pending")}</option>
                <option value="Confirmed">{t("confirmed")}</option>
                <option value="Cancelled">{t("cancelled")}</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("date")}</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={tempFilters.date || ""}
            onChange={(e) =>
              setTempFilters((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("paymentStatus")}
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={tempFilters.payed || ""}
            onChange={(e) =>
              setTempFilters((prev) => ({ ...prev, payed: e.target.value }))
            }
          >
            <option value="">{t("all")}</option>
            <option value="true">{t("payed")}</option>
            <option value="false">{t("notPayed")}</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => {
            setFilters(tempFilters);
            setPage(1);
          }}
          className="bg-my-color text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          {t("applyFilters")}
        </button>
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
