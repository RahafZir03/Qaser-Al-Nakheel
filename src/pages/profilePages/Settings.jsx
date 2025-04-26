import { useState } from "react";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation("profile");
  const [activeTab, setActiveTab] = useState("editProfile");

  return (
    <div className="p-6 mx-auto bg-white rounded-lg border col-span-3 w-full lg:ml-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">{t("settings.title")}</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 ${
            activeTab === "editProfile"
              ? "text-sec-color-100 border-b-2 border-sec-color-100"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("editProfile")}
        >
          {t("settings.editProfile")}
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "changePassword"
              ? "text-sec-color-100 border-b-2 border-sec-color-100"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("changePassword")}
        >
          {t("settings.changePassword")}
        </button>
      </div>

      {activeTab === "editProfile" && <EditProfile />}
      {activeTab === "changePassword" && <ChangePassword />}
    </div>
  );
}
