import { Outlet } from "react-router-dom";
import Sidebar from "../organism/Sidebar";
import { useEffect, useState } from "react";
import AdminNavbar from "../organism/AdminNavbar";
import { useTranslation } from "react-i18next";

export default function AdminLayout() {
  const { i18n } = useTranslation();
  const [sidebarSize, setSidebarSize] = useState(() => {
    return localStorage.getItem("sidebarSize") || "big";
  });

  const [windowSize, setWindowSize] = useState({
    isSmallScreen: window.innerWidth < 610,
    isHalfScreen: window.innerWidth < 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        isSmallScreen: window.innerWidth < 610,
        isHalfScreen: window.innerWidth < 1024,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarSize", sidebarSize);
  }, [sidebarSize]);

  // Calculate content margin based on sidebar size and direction
  const getContentMargin = () => {
    if (sidebarSize === "big") {
      return i18n.dir() === "rtl" ? "lg:mr-[244px]" : "lg:ml-[244px]";
    }
    if (sidebarSize === "small") {
      return i18n.dir() === "rtl" ? "lg:mr-[70px]" : "lg:ml-[70px]";
    }
    return "";
  };

  return (
    <div className="flex overflow-y-auto" dir={i18n.dir()}>
      <Sidebar
        sidebarSize={sidebarSize}
        setSidebarSize={setSidebarSize}
        isHalfScreen={windowSize.isHalfScreen}
      />

      <div
        className={`w-full ${getContentMargin()} transition-all ease-in-out duration-200 `}
      >
        <AdminNavbar
          sidebarSize={sidebarSize}
          setSidebarSize={setSidebarSize}
          isSmallScreen={windowSize.isSmallScreen}
          isHalfScreen={windowSize.isHalfScreen}
        />

        <main className="bg-black w-full min-h-[calc(100vh-70px)] mt-[70px] py-[1.875rem] px-[1.75rem]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
