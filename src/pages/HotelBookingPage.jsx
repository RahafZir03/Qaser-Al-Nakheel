import { useParams } from "react-router-dom";
import UpperTitle from "../components/molecule/UpperTitle";
import { useEffect, useState } from "react";
import {
  getRoomTypeAndRoomsByTypeId,
  getRoomTypeAndRoomsByTypeIdnoDates,
} from "../api/endpoints/booking";
import { useTranslation } from "react-i18next";
import BookingForm from "../components/organism/BookingForm";
import familyImage from "../assets/images/familyRoom.jpeg";
import RoomsSection from "../components/organism/RoomsSection";
import RoomAndSuitesSection from "../components/organism/RoomAndSuitesSection";
import {
  getAllAvailableRoomsByDate,
  getAllRoomTypeRoomsNoDates,
} from "../api/endpoints/mainPages";

export default function HotelBookingPage() {
  const { i18n } = useTranslation("roomAndBooking");
  const { id: typeId } = useParams();
  const [mainData, setMainData] = useState();
  const [roomsData, setRoomsData] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  useEffect(() => {
    async function fetchRoomTypeWithoutDates() {
      if (typeId === "allRooms") {
        const response = await getAllRoomTypeRoomsNoDates();
        const roomTypes = response.data;

        const allRooms = roomTypes.flatMap((rt) => rt.Rooms);
        const name = {
          en: "All Rooms",
          ar: "جميع الغرف",
        };
        const description = {
          en: "Explore all available room types",
          ar: "استعرض جميع أنواع الغرف المتاحة",
        };

        setMainData({ name, description });
        setRoomsData(allRooms);
      } else {
        const response = await getRoomTypeAndRoomsByTypeIdnoDates(typeId);
        const { description, id, name, Rooms } = response.data;
        setMainData({ description, id, name });
        setRoomsData(Rooms);
      }
    }

    fetchRoomTypeWithoutDates();
  }, [typeId]);

  async function fetchRoomType(inDate, outDate) {
    if (typeId === "allRooms") {
      const response = await getAllAvailableRoomsByDate(inDate, outDate);
      const roomTypes = response.data;

      const allRooms = roomTypes.flatMap((rt) => rt.Rooms);
      const name = {
        en: "All Available Rooms",
        ar: "جميع الغرف المتاحة",
      };
      const description = {
        en: "Explore all room types available for selected dates",
        ar: "استعرض جميع أنواع الغرف المتاحة للتواريخ المحددة",
      };

      setMainData({ name, description });
      setRoomsData(allRooms);
    } else {
      const response = await getRoomTypeAndRoomsByTypeId(
        typeId,
        inDate,
        outDate
      );
      const { description, id, name, Rooms } = response.data;

      setMainData({ description, id, name });
      setRoomsData(Rooms);
    }
  }

  const handleFilterSubmit = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    fetchRoomType(newCheckIn, newCheckOut);
  };

  return (
    <div className="flex flex-col bg-[#f6f0e8] ">
      <UpperTitle
        showFrom={false}
        title={mainData?.name[i18n.language || "en"]}
        description={mainData?.description[i18n.language || "en"]}
        withDesc={true}
        imgSrc={roomsData[0]?.RoomImages[0]?.image_name_url || familyImage}
      />
      {typeId === "allRooms" && <RoomAndSuitesSection />}
      {typeId !== "allRooms" && <BookingForm roomTypeId={typeId} />}
      <RoomsSection
        rooms={roomsData}
        roomType={mainData}
        onFilter={handleFilterSubmit}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
      />
      {typeId !== "allRooms" && <RoomAndSuitesSection />}
    </div>
  );
}
