import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PaginationRounded from "../../components/molecule/PaginationRounded";
import { deleteMessage, getAllMessages } from "../../api/endpoints/booking";
import MessageModal from "../../components/molecule/MessageModal";

export default function UserMessages() {
  const { t, i18n } = useTranslation("adminBooking");
  const isArabic = i18n.language === "ar";

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "" });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await getAllMessages({ page, limit: 10, ...filters });
      setMessages(response.data.contacts);
      setTotalPages(Math.ceil(response.data.totalContacts / 10));
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || t("messages.fetch_error")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const handleDelete = async (id) => {
    await deleteMessage(id);
    toast.success(t("messages.deleted"));
    fetchMessages();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPage(1);
    fetchMessages();
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMarkAsRead = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, status: "read" } : msg
      )
    );
  };

  return (
    <div className="p-4 md:p-8 bg-admin-color">
      <h1 className="text-3xl font-bold text-white mb-6">
        {t("messages.title")}
      </h1>

      <div className="bg-white/5 p-6 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center text-white">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            {t("messages.status")}
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="bg-white/40 text-black border border-white/20 rounded px-3 py-2"
          >
            <option value="">{t("messages.all")}</option>
            <option value="unread">{t("messages.unread")}</option>
            <option value="read">{t("messages.read")}</option>
          </select>
        </div>
        <div className="flex items-end h-full">
          <button
            onClick={applyFilters}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
          >
            {t("messages.apply_filters")}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4 flex justify-between items-center">
          {error}
          <button onClick={fetchMessages} className="underline ml-4">
            {t("messages.retry")}
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
              <th className="p-3">{t("messages.name")}</th>
              <th className="p-3">{t("messages.email")}</th>
              <th className="p-3">{t("messages.subject")}</th>
              <th className="p-3">{t("messages.status")}</th>
              <th className="p-3 text-center">{t("messages.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <span className="mr-2">{t("messages.loading")}</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                </td>
              </tr>
            ) : messages?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  {t("messages.no_messages")}
                </td>
              </tr>
            ) : (
              messages?.map((msg, idx) => (
                <tr
                  key={msg.id}
                  className="border-b border-white/10 text-sm hover:bg-white/5 transition"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    {msg.Customer.first_name} {msg.Customer.last_name}
                  </td>
                  <td className="p-3">{msg.Customer.email}</td>
                  <td className="p-3">{msg.subject}</td>
                  <td className="p-3">
                    {msg.status === "read" ? (
                      <span className="text-green-500 font-medium">
                        {t("messages.read")}
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        {t("messages.unread")}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => openModal(msg)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      {t("messages.view_details")}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      {t("messages.delete")}
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
            onChange={(e, value) => setPage(value)}
            theme="dark"
          />
        )}
      </div>

      {/* عرض المودال عند اختيار الرسالة */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={selectedMessage}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}
