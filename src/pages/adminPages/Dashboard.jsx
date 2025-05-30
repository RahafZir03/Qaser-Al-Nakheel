/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Card from '../../components/atoms/Card';
import { iconMap, colorMap } from '../../constants/cardData';
import { MdOutlineBedroomChild } from "react-icons/md";
import { dashboardData } from '../../api/endpoints/dashboard';
import { FaUsers } from 'react-icons/fa';
import { Mosaic } from 'react-loading-indicators';
import { useTranslation } from 'react-i18next';


export default function Dashboard() {
  const [cardData, setCardData] = useState({});
  const {t, i18n } = useTranslation(); // <-- لجلب اللغة الحالية
  const lang = i18n.language || 'ar'
  useEffect(() => {
    async function getDashboardData() {
      try {
        const responce = await dashboardData();
        setCardData(responce.data);
      } catch (error) {
        console.log(error.message)
      }
    }
    getDashboardData()
  }, [])
  return (
    <div className="flex-1 p-10 bg-admin-color">
      <h2 className="text-3xl font-bold mb-7 text-white">{t('hdashboard')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 slg:grid-cols-3 gap-4">
        {Array.isArray(cardData) && cardData.length > 0 ? (
          cardData.map((card, index) => {
            const title = card.title?.[lang] || card.title.en;
            const Icon = iconMap[card.title.en] || FaUsers;
            const color = colorMap[card.title.en] || "bg-gray-500";
            return (
              <Card
                key={index}
                title={title}
                value={card.value}
                Icon={Icon}
                bgColor={color}
              />
            );
          })
        ) : (
          <div className="w-full h-[600px] flex justify-center items-center col-span-3">
            <Mosaic color={["#7a6a1d", "#a38d27", "#ccb131", "#d7c159"]} />
          </div>
        )}
      </div>
    </div>
  );
}



