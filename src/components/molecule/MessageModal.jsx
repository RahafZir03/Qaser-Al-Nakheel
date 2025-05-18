/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { makeMessageRead } from "../../api/endpoints/booking";
import i18next from "i18next";

export default function MessageModal({
  isOpen,
  onClose,
  message,
  onMarkAsRead,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && message && !message.is_read) {
      markAsRead(message.id);
    }
  }, [isOpen, message]);

  const markAsRead = async (messageId) => {
    setIsLoading(true);
    try {
      await makeMessageRead(messageId);
      onMarkAsRead(messageId);
    } catch (error) {
      console.error("فشل تحديث حالة الرسالة", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!message) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "visible opacity-100 scale-100"
          : "invisible opacity-0 scale-95"
      } bg-black/70 backdrop-blur-sm`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-white backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-3xl transform transition-all duration-300"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-red-400 text-2xl font-bold transition"
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-4 text-cyan-400">
          {message.subject}
        </h2>

        <div className="mb-3 text-gray-300 text-sm">
          <span className="font-medium">
            {message.Customer.first_name} {message.Customer.last_name}
          </span>{" "}
          ({message.Customer.email})
        </div>

        <div className="mb-6 text-gray-100 text-base leading-relaxed whitespace-pre-line">
          {message.message}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${
                message.status === "read"
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {message.status === "read"
                ? i18next.language === "ar"
                  ? "مقروءة"
                  : "Read"
                : i18next.language === "en"
                ? "Unread"
                : "غير مقروءة"}
            </span>
          </div>
          {message.status !== "read" && (
            <button
              onClick={() => markAsRead(message.id)}
              disabled={isLoading}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition shadow-md ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              {isLoading
                ? i18next.language === "ar"
                  ? "جاري التحديث..."
                  : "Updating..."
                : i18next.language === "en"
                ? "Mark as read"
                : "ملاحظة كمقروءة"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
