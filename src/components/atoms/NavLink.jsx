/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/navLinks";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useEffect } from "react";
import { getRoomTypeForNavbar } from "../../api/endpoints/booking";

const NavLinks = ({ linksLayout, bgColor, handleNavButton }) => {
  const { t, i18n } = useTranslation("sidebar");
  const [roomTypes, setRoomTypes] = useState([]);
  useEffect(() => {
    async function getRoomLinks() {
      const response = await getRoomTypeForNavbar();
      setRoomTypes(response.data);
    }

    getRoomLinks();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const linkStyle = linksLayout === "halfPage" ? "" : "font-semibold";

  const linkColor =
    bgColor === "light"
      ? "text-my-color hover:text-[#F2A227]"
      : "text-white hover:text-[#F2A227] font-bold";

  return (
    <>
      {navLinks.map((link, index) => {
        if (link.isRoomDropdown) {
          return (
            <li
              key={index}
              className="relative group flex"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`text font-extrabold ${linkStyle} ${linkColor} transition-all duration-300 flex items-center gap-1`}
              >
                {t(link.label)}
                <MdOutlineArrowForwardIos
                  className={`text-xs text-sec-color-100 ${
                    i18n.language === "ar" ? "rotate-180" : ""
                  } group-hover:rotate-90 transition duration-300`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-8 right-0 bg-white rounded-sm shadow-md z-40 py-2 px-3 w-40 space-y-2 ${
                      bgColor === "light" ? "text-my-color" : "text-my-color"
                    }`}
                  >
                    {roomTypes.map((room, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={`/rooms/${room.id}`}
                          onClick={handleNavButton}
                          className="block font-bold text-sm hover:text-[#F2A227] transition"
                        >
                          {room.name[i18n.language || room.name.en]}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`${linksLayout === "halfPage" && "group w-full"}  ${
              i18n.language === "ar" && "text-right"
            }`}
          >
            <NavLink
              to={link.path}
              onClick={handleNavButton}
              className={`text font-extrabold ${linkStyle} ${linkColor} transition-all duration-300`}
            >
              {t(link.label)}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
