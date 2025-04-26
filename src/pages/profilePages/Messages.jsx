import { useEffect, useState } from "react";
import { getCustomerMessages } from "../../api/endpoints/customers";
import PaginationRounded from "../../components/molecule/PaginationRounded";
import ContactTable from "../../components/molecule/ContactTable";
import { useTranslation } from "react-i18next";

export default function Messages() {
  const { t } = useTranslation("profile");
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await getCustomerMessages(page, 10, status);
        setContacts(res.data.messages);
        setTotalPages(res.data.totalPages);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        // handle error if needed
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [page, status]);

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 w-d col-span-3">
      <h1 className="text-2xl font-semibold mb-4">{t("messages.title")}</h1>

      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="statusFilter" className="text-sm font-medium">
          {t("messages.filter_by_status")}
        </label>
        <select
          id="statusFilter"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">{t("messages.all")}</option>
          <option value="read">{t("messages.read")}</option>
          <option value="unread">{t("messages.unread")}</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">{t("messages.loading")}</div>
      ) : (
        <ContactTable contacts={contacts} />
      )}

      <PaginationRounded
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        theme="light"
      />
    </div>
  );
}
