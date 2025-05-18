/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

const ConfirmCancelModal = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation("profile");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          {t("confirmTitle")}
        </h2>
        <p className="text-gray-600 mb-6">{t("confirmCancel")}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            {t("no")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
          >
            {t("yes")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;
