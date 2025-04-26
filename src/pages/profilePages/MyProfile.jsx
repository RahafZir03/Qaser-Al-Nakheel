import { useSelector } from "react-redux";
import DashboardCard from "../../components/atoms/DashboardCard";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSomeDataForUser } from "../../api/endpoints/customers";

export default function MyProfile() {
  const { t, i18n } = useTranslation("profile");
  const userData = useSelector((state) => state.authData.allUserData);
  const [userGeneralData, setUserGeneralData] = useState();

  useEffect(() => {
    async function fetchGeneralData() {
      const response = await getSomeDataForUser();
      setUserGeneralData(response.data);
    }
    fetchGeneralData();
  }, []);

  return (
    <div className="col-span-3 w-full mx-auto lg:ml-6 space-y-6">
      {/* الكروت */}
      <div className="grid grid-cols-1 2xmobile:grid-cols-2 gap-4 rounded-lg">
        {userGeneralData?.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title[i18n.language || "en"]}
            count={card.value}
          />
        ))}
      </div>

      {/* بيانات البروفايل */}
      <div className="bg-white p-6 rounded-lg divide-y border">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
          {t("my_profile.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 ">
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.full_name")}
            </p>
            <p className="text-lg text-gray-600">
              {userData?.first_name} {userData?.last_name}
            </p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.email")}
            </p>
            <p className="text-lg text-gray-600">{userData?.email}</p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.phone_number")}
            </p>
            <p className="text-lg text-gray-600">{userData?.mobileNos?.[0]}</p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.birth_date")}
            </p>
            <p className="text-lg text-gray-600">
              {new Date(userData?.birthdate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.city")}
            </p>
            <p className="text-lg text-gray-600">{userData?.city}</p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.country")}
            </p>
            <p className="text-lg text-gray-600">{userData?.country}</p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.postal_code")}
            </p>
            <p className="text-lg text-gray-600">
              {userData?.postal_code || t("my_profile.na")}
            </p>
          </div>
          <div>
            <p className="text-gray-900 font-semibold">
              {t("my_profile.account_status")}
            </p>
            <p className="text-lg text-gray-600">
              {userData?.is_verified
                ? t("my_profile.verified")
                : t("my_profile.not_verified")}
            </p>
            {!userData?.is_verified && (
              <p className="text-sm text-red-600 mt-1">
                {t("my_profile.verification_required")}{" "}
                <span className="font-semibold">
                  {t("my_profile.verified")}
                </span>{" "}
                {t("my_profile.booking_restriction")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
