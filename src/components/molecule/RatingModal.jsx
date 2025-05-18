import { useState } from "react";
import { rateWithType } from "../../api/endpoints/customers";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import i18next from "i18next";

/* eslint-disable react/prop-types */
export default function RatingModal({
  open,
  onClose,
  type,
  id,
  setSelectedBooking,
}) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        rating,
        comment: message,
        [`${type === "restaurant" ? "rest" : type}_id`]: id,
      };

      const response = await rateWithType(type, payload);

      toast.success(response.data.message);

      setSelectedBooking(null);
      onClose();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {i18next.language === "en" ? "Rate your experience" : "قيم تجربتك"}
        </h2>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`text-3xl cursor-pointer transition-all ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows="4"
          placeholder={
            i18next.language === "en" ? "Write your review..." : "أكتب مراجعتك"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
          >
            {i18next.language === "en" ? "Cancel" : "إلغاء"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="w-full py-2 rounded-lg bg-primary text-white bg-sec-color-100 hover:bg-sec-color-200 font-semibold hover:bg-primary-dark disabled:opacity-50"
          >
            {i18next.language === "en"
              ? loading
                ? "Submitting..."
                : "Submit"
              : loading
              ? "يتم الإرسال..."
              : "إرسال"}
          </button>
        </div>
      </div>
    </div>
  );
}
