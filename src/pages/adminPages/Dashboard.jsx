/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Card from '../../components/atoms/Card';
import {iconMap,colorMap} from '../../constants/cardData'; 
import { MdOutlineBedroomChild } from "react-icons/md";
import { dashboardData } from '../../api/endpoints/dashboard';
import { FaUsers } from 'react-icons/fa';

export default function Dashboard() {
  const [cardData,setCardData]=useState({});
  const lang="ar"
  useEffect(()=>{
    async function getDashboardData(){
    try {
      const responce=await dashboardData();
      setCardData(responce.data);
    } catch (error) {
      console.log(error.message)
    }
  }
  getDashboardData()
  },[])
  return (
    <div className="flex-1 p-4 ">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 slg:grid-cols-3 gap-4">
        {cardData.length > 0 ? (
          cardData.map((card, index) => {
            const Icon = iconMap[card.title.en] || FaUsers;
            const color = colorMap[card.title.en] || "bg-gray-500";
            return (
            <Card 
              key={index} 
              title={lang==="ar"? card.title.ar:card.title.en} 
              value={card.value} 
              Icon={Icon} 
              bgColor={color}
            />
          )})
        ) : (
          <p className='text-white'>Loading...</p>
        )}
      </div>
    </div>
  );
}



