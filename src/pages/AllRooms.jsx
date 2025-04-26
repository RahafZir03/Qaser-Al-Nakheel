import UpperTitle from "../components/molecule/UpperTitle";
import reseption from "../assets/images/hotel.png";
import RoomAndSuitesSection from "../components/organism/RoomAndSuitesSection";
export default function AllRooms() {
  return (
    <div>
      <UpperTitle
        title={"All Rooms"}
        description={""}
        withDesc={false}
        imgSrc={reseption}
      />
      <RoomAndSuitesSection />
      
    </div>
  );
}
