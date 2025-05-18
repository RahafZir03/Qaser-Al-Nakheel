import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PaginationRounded from "../../components/molecule/PaginationRounded";
import {
  deleteHallReservation,
  getAllHallReservation,
} from "../../api/endpoints/booking";
import { cancelHallReservation } from "../../api/endpoints/customers";
import {
  confirmHallReservation,
  getHallsName,
} from "../../api/endpoints/halls";

export default function HallBookings() {
  const { t, i18n } = useTranslation("adminBooking");
  const isArabic = i18n.language === "ar";

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [halls, setHalls] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    payed: "",
    hall_id: "",
    startDate: "",
    endDate: "",
  });

  const handleCancelBooking = async (id) => {
    const response = await cancelHallReservation(id);
    toast.success(response.data.message);
    fetchBookings();
  };

  const handleDeleteBooking = async (id) => {
    const response = await deleteHallReservation(id);
    toast.success(response.data.message);
    fetchBookings();
  };

  const handleConfirmBooking = async (id) => {
    const response = await confirmHallReservation(id);
    toast.success(response.data.message);
    fetchBookings();
  };

  useEffect(() => {
    async function fetchHallsName() {
      const response = await getHallsName();
      setHalls(response.data);
    }
    fetchHallsName();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllHallReservation({
        ...filters,
        page,
        limit: 10,
      });
      console.log(response.data);
      if (response?.data?.data) {
        setBookings(response.data.data);
        setTotalPages(Math.ceil(response.data.total / 10));
        setError(null);
      } else {
        setBookings([]);
        setError(t("hall_booking.no_bookings"));
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          t("hall_booking.error_fetch")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setPage(1);
    fetchBookings();
  };

  return (
    <div className="p-4 md:p-8 bg-admin-color ">
      <h1 className="text-3xl font-bold text-white mb-6">
        {t("hall_booking.title")}
      </h1>

      {/* Filters */}
      <div className="bg-white/5 p-6 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center text-white">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            {t("hall_booking.status")}
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="bg-white/40 border text-black border-white/20 rounded px-3 py-2"
          >
            <option value="">{t("hall_booking.all_statuses")}</option>
            <option value="pending">{t("hall_booking.pending")}</option>
            <option value="confirmed">{t("hall_booking.confirmed")}</option>
            <option value="canceled">{t("hall_booking.cancelled")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            {t("hall_booking.payed")}
          </label>
          <select
            name="payed"
            value={filters.payed}
            onChange={handleFilterChange}
            className="bg-white/40 text-black border border-white/20 rounded px-3 py-2"
          >
            <option value="">{t("hall_booking.all_payments")}</option>
            <option value="true">{t("hall_booking.payed")}</option>
            <option value="false">{t("hall_booking.not_payed")}</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            {t("hall_booking.hall_name")}
          </label>
          <select
            name="hall_id"
            value={filters.hall_id}
            onChange={handleFilterChange}
            className="bg-white/40 border text-black border-white/20 rounded px-3 py-2"
          >
            <option value="">{t("hall_booking.all_halls")}</option>
            {halls.map((hall) => (
              <option key={hall.id} value={hall.id}>
                {hall.name[i18n.language]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            {t("hall_booking.check_in")}
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="bg-white/10 border border-white/20 rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            {t("hall_booking.check_out")}
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="bg-white/10 border border-white/20 rounded px-3 py-2"
          />
        </div>

        <div className="flex items-end h-full ">
          <button
            onClick={applyFilters}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
          >
            {t("hall_booking.apply_filters")}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4 flex justify-between items-center">
          {error}
          <button onClick={fetchBookings} className="underline ml-4">
            {t("hall_booking.retry")}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white/5 rounded-xl shadow">
        <table className="min-w-full text-white">
          <thead>
            <tr
              className={`text-sm bg-white/10 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <th className="p-3">#</th>
              <th className="p-3">{t("hall_booking.customer_name")}</th>
              <th className="p-3">{t("hall_booking.hall_name")}</th>
              <th className="p-3">{t("hall_booking.status")}</th>
              <th className="p-3">{t("hall_booking.payed")}</th>
              <th className="p-3">{t("hall_booking.check_in")}</th>
              <th className="p-3">{t("hall_booking.check_out")}</th>
              <th className="p-3">{t("hall_booking.total_price")}</th>
              <th className="p-3 text-center">{t("hall_booking.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <span className="mr-2">{t("hall_booking.loading")}</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-400">
                  {t("hall_booking.no_bookings")}
                </td>
              </tr>
            ) : (
              bookings.map((booking, idx) => (
                <tr
                  key={booking.id}
                  className="border-b border-white/10 text-sm hover:bg-white/5 transition"
                  title={booking.details}
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    {booking.Customer?.first_name} {booking.Customer?.last_name}
                  </td>
                  <td className="p-3">
                    {booking.Hall?.name[i18n.language || "en"] || "-"}
                  </td>
                  <td className="p-3 capitalize">{booking.status}</td>
                  <td className="p-3">
                    {booking.payed
                      ? t("hall_booking.payed")
                      : t("hall_booking.not_payed")}
                  </td>
                  <td className="p-3">
                    {new Date(booking.start_time).toLocaleString(i18n.language)}
                  </td>
                  <td className="p-3">
                    {new Date(booking.end_time).toLocaleString(i18n.language)}
                  </td>
                  <td className="p-3">{booking.total_price} NIS</td>
                  <td className="p-3 text-center flex gap-2">
                    {booking.status === "pending" && (
                      <button
                        onClick={() => handleConfirmBooking(booking.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        {t("hall_booking.confirm")}
                      </button>
                    )}

                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                      >
                        {t("hall_booking.cancel")}
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      {t("hall_booking.delete")}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <PaginationRounded
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
            theme="dark"
          />
        )}
      </div>
    </div>
  );
}
