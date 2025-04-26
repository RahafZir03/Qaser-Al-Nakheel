import { Outlet } from "react-router-dom";
import imagename from "../assets/images/background.png";
export default function Login() {
  return (
    <div className="relative h-screen w-full">
      <img
        src={imagename}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="bg-black bg-opacity-40 absolute inset-0 w-full h-full" />
      <div className="relative flex items-center justify-center min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
