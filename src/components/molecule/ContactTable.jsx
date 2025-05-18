/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";
import { deleteMessage } from "../../api/endpoints/customers";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const ContactTable = ({ contacts, setContacts }) => {
  const { t, i18n } = useTranslation("profile");
  const lang = i18n.language;
  const [selectedContact, setSelectedContact] = useState(null);
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
              <td className="px-6 py-4 text-gray-800">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="text-blue-600 hover:underline"
                >
                  {contact.subject}
                </button>
              </td>
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

      {/* المودال */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-2">{selectedContact.title}</h2>
            <p className="text-gray-700 mb-4">{selectedContact.message}</p>
            <div className="text-sm text-gray-500 mb-2">
              {t("messages.date")}: {selectedContact.date}
            </div>
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    selectedContact.status === "unread"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
              >
                {t(`messages.${selectedContact.status}`)}
              </span>
            </div>
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactTable;
