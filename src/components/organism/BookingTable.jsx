import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
const BookingTables = ({ bookings, type }) => {
  const { t, i18n } = useTranslation("profile");

  const getHeaders = () => {
    switch (type) {
      case "room":
        return [
          t("room"),
          t("guests"),
          t("checkIn"),
          t("checkOut"),
          t("status"),
          t("paid"),
          t("price"),
        ];
      case "hall":
        return [
          t("hall"),
          t("date"),
          t("start"),
          t("end"),
          t("status"),
          t("paid"),
          t("price"),
        ];
      case "pool":
        return [
          t("pool"),
          t("date"),
          t("start"),
          t("end"),
          t("status"),
          t("paid"),
          t("price"),
        ];
      case "restaurant":
        return [
          t("restaurant"),
          t("date"),
          t("time"),
          t("guests"),
          t("status"),
          t("paid"),
          t("price"),
        ];
      default:
        return [];
    }
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "confirmed"
          ? "bg-green-100 text-green-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {status}
    </span>
  );

  const renderRow = (item) => {
    const yes = t("yes");
    const no = t("no");

    switch (type) {
      case "room":
        return (
          <>
            <td className="px-6 py-4">{item.Room?.room_no || "N/A"}</td>
            <td className="px-6 py-4">{item.num_of_guests}</td>
            <td className="px-6 py-4">{item.check_in_date?.split("T")[0]}</td>
            <td className="px-6 py-4">{item.check_out_date?.split("T")[0]}</td>
            <td className="px-6 py-4">
              <StatusBadge status={item.status} />
            </td>
            <td className="px-6 py-4">{item.payed ? yes : no}</td>
            <td className="px-6 py-4">${item.total_price}</td>
          </>
        );
      case "hall":
        return (
          <>
            <td className="px-6 py-4">
              {item.Hall?.name[i18n.language || "en"] || "N/A"}
            </td>
            <td className="px-6 py-4">{item.start_time?.split("T")[0]}</td>
            <td className="px-6 py-4">
              {item.start_time?.split("T")[1]?.slice(0, 5)}
            </td>
            <td className="px-6 py-4">
              {item.end_time?.split("T")[1]?.slice(0, 5)}
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={item.status} />
            </td>
            <td className="px-6 py-4">{item.payed ? yes : no}</td>
            <td className="px-6 py-4">${item.total_price}</td>
          </>
        );
      case "pool":
        return (
          <>
            <td className="px-6 py-4">
              {item.Pool?.name[i18n.language || "en"] || "N/A"}
            </td>
            <td className="px-6 py-4">{item.start_time?.slice(0, 10)}</td>
            <td className="px-6 py-4">
              {item.start_time
                ? new Date(item.start_time).toISOString().slice(11, 16)
                : "N/A"}
            </td>
            <td className="px-6 py-4">
              {item.end_time
                ? new Date(item.end_time).toISOString().slice(11, 16)
                : "N/A"}
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={item.status} />
            </td>
            <td className="px-6 py-4">{item.payed ? yes : no}</td>
            <td className="px-6 py-4">${item.total_price}</td>
          </>
        );
      case "restaurant":
        return (
          <>
            <td className="px-6 py-4">
              {item.Restaurant?.name[i18n.language || "en"] || "N/A"}
            </td>
            <td className="px-6 py-4">
              {item.reservation_date?.split("T")[0] || "N/A"}
            </td>
            <td className="px-6 py-4">
              {item.reservation_date
                ? new Date(item.reservation_date).toISOString().slice(11, 16)
                : "N/A"}
            </td>
            <td className="px-6 py-4">{item.number_of_guests ?? "N/A"}</td>
            <td className="px-6 py-4">
              <StatusBadge status={item.status} />
            </td>
            <td className="px-6 py-4">{item.payed ? yes : no}</td>
            <td className="px-6 py-4">${item.total_price}</td>
          </>
        );
      default:
        return <td className="px-6 py-4 text-gray-500">{t("invalidType")}</td>;
    }
  };

  const headers = getHeaders();

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-2xl shadow-lg min-h-[200px]">
        {bookings.length === 0 ? (
          <div className="text-gray-500 text-lg font-medium text-center py-6">
            {t("noBookings")}
          </div>
        ) : (
          <table className="min-w-full table-auto bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-6 py-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  {renderRow(item)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTables;
