import { Outlet } from "react-router-dom";
import Navbar from "../organism/Navbar.jsx";
import Footer from "../organism/Footer.jsx";
export default function RootLayout() {
  return (
    <div className=" absolute w-full">
      <Navbar />

      <div className="mt-24 bg-slate-400 drop-shadow-md">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}
