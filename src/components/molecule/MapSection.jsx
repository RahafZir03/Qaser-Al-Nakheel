import markerIcon2x from "/marker-icon-2x.png";
import markerIcon from "/marker-icon.png";
import markerShadow from "/marker-shadow.png";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapSection() {
  return (
    <div className="h-[700px] w-full py-20">
      <MapContainer
        center={[31.8667, 35.45]} // Jericho coordinates
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[31.8667, 35.45]}>
          <Popup>
            Qasr alnkheel Resort and Hotel
            <br /> Jericho
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
