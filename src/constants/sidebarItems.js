import { RiDashboard2Fill } from "react-icons/ri";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdRoomService } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { SlHome } from "react-icons/sl";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GrRestaurant } from "react-icons/gr";
import { CiUser } from "react-icons/ci";







const sidebarItems = [
  {
    linkType: "link",
    Icon: FaMoneyCheckDollar,
    data: {
      to: "/admin/",
      icon: RiDashboard2Fill,
      label: "sidebar.dashboard",
      iconColor: "text-purple-700",
    },
  },
  {
    typeLink: "dropdown",
    Icon: MdOutlineBedroomParent,
    label: "sidebar.room", // مفتاح i18n
    iconColor: "text-amber-500",
    data: [{
      to: "/admin/allroom",
      icon: FaEye,
      label: "sidebar.allRoom",
      iconColor: "text-[#007bff]",
    },
    {
      to: "/admin/roomtype",
      icon: MdOutlineBedroomParent,
      label: "sidebar.roomType",
      iconColor: "text-amber-500",
    },

    {
      to: "/admin/allservice",
      icon: MdRoomService,
      label: "sidebar.allService",
      iconColor: "text-[#007bff]",
    },

    {
      to: "/admin/createroom",
      icon: IoIosAddCircle,
      label: "sidebar.createroom",
    },
    ],

  },
  {
    linkType: "link",
    Icon: FaMoneyCheckDollar,
    data: {
      to: "/admin/employee",
      icon: MdPeopleAlt,
      label: "sidebar.employee",
      iconColor: "text-purple-700",
    },
  },

  {
    linkType: "link",
    Icon: SlHome,
    data: {
      to: "/admin/halls",
      icon: SlHome,
      label: "Halls",
      iconColor: "text-purple-700",
    }
  },
  {
    linkType: "link",
    Icon: LiaSwimmingPoolSolid,
    data: {
      to: "/admin/pools",
      icon: LiaSwimmingPoolSolid,
      label: "Pools",
      iconColor: "text-purple-700",
    }
  },
  {
    linkType: "link",
    Icon: GrRestaurant,
    data: {
      to: "/admin/restaurants",
      icon: GrRestaurant,
      label: "Restaurant",
      iconColor: "text-purple-700",
    }
  },
  {
    linkType: "link",
    Icon: CiUser,
    data: {
      to: "/admin/adminCustumer",
      icon: CiUser,
      label: "Customers",
      iconColor: "text-purple-700",

    }
  }

];

export default sidebarItems;
