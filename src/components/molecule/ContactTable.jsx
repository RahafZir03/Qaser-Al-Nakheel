/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { deleteMessage } from "../../api/endpoints/customers";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const ContactTable = ({ contacts, setContacts }) => {
  const { t, i18n } = useTranslation("profile");
  const lang = i18n.language;
  const handleDeleteMessage = async (id) => {
    const response = await deleteMessage(id);
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
    toast.success(response.data.message);
  };
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg w-full">
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
          <tr>
            <th className={`px-6 py-4 ${lang === "ar" && "text-right"}`}>
              {t("messages.message")}
            </th>
            <th className={`px-6 py-4 ${lang === "ar" && "text-right"}`}>
              {t("messages.status")}
            </th>
            <th className={`px-6 py-4 ${lang === "ar" && "text-right"}`}>
              {t("messages.date")}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-gray-800">{contact.message}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    contact.status === "unread"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {t(`messages.${contact.status}`)}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">{contact.date}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteMessage(contact.id)}
                >
                  <FaTrash className="text-red-500 hover:scale-110 hover:text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
