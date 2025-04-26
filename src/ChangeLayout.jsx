/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AppWrapper({ children }) {
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
