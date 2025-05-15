/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SidebarItem = ({
  linkType,
  data,
  Icon,
  sidebarSize,
  label,
  iconColor,
}) => {
  const { i18n, t } = useTranslation("sidebar");
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <li
      className={`group transition-all duration-500 ${
        sidebarSize === "big" ? "pe-5" : sidebarSize === "small" ? "pe-2" : ""
      }`}
    >
      {linkType === "link" ? (
        <NavLink
          to={data.to}
          className={({ isActive }) => `
            flex items-center py-1.5 w-full
            group-hover:bg-[#0F1015] transition-all duration-300
            ${isActive && data.to !== "/admin/" ? "bg-[#0F1015]" : ""}
            ${
              sidebarSize === "big"
                ? "ps-5 pe-4"
                : sidebarSize === "small"
                ? "ps-4 pe-3"
                : ""
            } ${i18n.dir() === "rtl" ? "rounded-e-full" : "rounded-l-full"}
          `}
        >
          <div className="p-2 bg-[#4b506844] rounded-full me-3 group-hover:bg-[#22242E] transition-all duration-500">
            <data.icon className={`text-lg ${data.iconColor}`} />
          </div>
          {sidebarSize === "big" && (
            <p className="text-[#6c7293] group-hover:text-white transition-all duration-300">
              {t(data.label)}
            </p>
          )}
        </NavLink>
      ) : (
        <div>
          <button
            onClick={handleToggleDropdown}
            className={`flex items-center py-1.5 w-full group-hover:bg-[#0F1015] transition-all duration-300
              ${openDropdown ? "bg-[#3b3f52]" : ""}
              ${
                sidebarSize === "big"
                  ? "ps-5 pe-4"
                  : sidebarSize === "small"
                  ? "ps-4 pe-3"
                  : ""
              }
              ${i18n.dir() === "rtl" ? "rounded-e-full" : "rounded-l-full"}
            `}
          >
            <div className="p-2 bg-[#4b506844] rounded-full me-3 group-hover:bg-[#22242E] transition-all duration-500">
              <Icon className={`text-lg ${iconColor}`} />
            </div>
            {sidebarSize === "big" && (
              <p className="text-[#6c7293] group-hover:text-white transition-all duration-300">
                {t(label)}
              </p>
            )}
            <MdOutlineArrowForwardIos
              className={`
                ms-auto text-[#6c7293] group-hover:text-white
                transition-all duration-300 transform
                ${openDropdown ? "rotate-90" : "rtl:rotate-180"}
              `}
            />
          </button>
          {openDropdown && (
            <ul className="bg-[#191C24] rounded-e-xl">
              {data.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `
                      flex items-center py-1.5 w-full rounded-e-full
                      hover:bg-[#0F1015] transition-all duration-300
                      ${isActive ? "bg-[#0F1015]" : ""}
                      ps-6 pe-4
                    `}
                  >
                    <div className="p-1.5 bg-[#4b506844] rounded-full me-3 hover:bg-[#22242E] transition-all duration-500">
                      <link.icon className={`text-lg ${link.iconColor}`} />
                    </div>
                    {sidebarSize === "big" && (
                      <p className="text-[#6c7293] hover:text-white transition-all duration-300">
                        {t(link.label)}
                      </p>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
