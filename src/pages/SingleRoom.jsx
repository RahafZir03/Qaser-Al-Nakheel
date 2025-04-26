import { useParams } from "react-router-dom";
import UpperTitle from "../components/molecule/UpperTitle";
import { useEffect, useState } from "react";
import { getRoomById } from "../api/endpoints/room";
import { useTranslation } from "react-i18next";
import RoomReservationPage from "../components/organism/RoomReservationPage";
export default function SingleRoom() {
  const { i18n } = useTranslation("roomAndBooking");
  const roomId = useParams().id;
  const [roomData, serRoomData] = useState();
  useEffect(() => {
    async function fetchRoomData() {
      console.log(roomId);
      const response = await getRoomById(roomId);
      console.log(response.data);
      if (response.status === 200) {
        serRoomData(response.data.room);
      }
    }
    fetchRoomData();
  }, [roomId]);

  return (
    <div className="bg-[#f6f0e8]  text-white min-h-screen">
      <UpperTitle
        title={roomData?.RoomType?.name[i18n.language || "en"]}
        imgSrc={roomData?.RoomImages[0]?.image_name_url}
        withDesc={false}
      />
      <RoomReservationPage roomData={roomData} />
    </div>
  );
}
