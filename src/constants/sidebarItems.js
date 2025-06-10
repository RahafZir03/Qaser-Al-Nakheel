import { RiDashboard2Fill } from "react-icons/ri";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoRestaurant } from "react-icons/io5";

import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaEye, FaSwimmingPool } from "react-icons/fa";
import { MdRoomService } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";

import { CgAlbum } from "react-icons/cg";
import { PiBankBold } from "react-icons/pi";

import { SlHome } from "react-icons/sl";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GrRestaurant } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { FaFileInvoiceDollar } from "react-icons/fa";

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
    linkType: "link",
    Icon: FaMoneyCheckDollar,
    data: {
      to: "/admin/employee",
      icon: MdPeopleAlt,
      label: "sidebar.employee",
      iconColor: "text-red-700",
    },
  },
  {
    typeLink: "dropdown",
    Icon: MdOutlineBedroomParent,
    label: "sidebar.room", // مفتاح i18n
    iconColor: "text-blue-500",
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
    typeLink: "dropdown",
    Icon: CgAlbum,
    label: "sidebar.allbookings",
    iconColor: "text-amber-500",
    data: [
      {
        to: "/admin/roomBooking",
        icon: MdOutlineBedroomParent,
        label: "sidebar.room_booking",
        iconColor: "text-orange-500",
      },
      {
        to: "/admin/hallBooking",
        icon: PiBankBold,
        label: "sidebar.hallBooking",
        iconColor: "text-green-500",
      },

      {
        to: "/admin/poolBooking",
        icon: FaSwimmingPool,
        label: "sidebar.poolBooking",
        iconColor: "text-sky-400",
      },

      {
        to: "/admin/restaurantBooking",
        icon: IoRestaurant,
        label: "sidebar.restaurantBooking",
        iconColor: "text-purple-600",
      },
    ],

  },
  {
    linkType: "link",
    Icon: FaMoneyCheckDollar,
    data: {
      to: "/admin/usersMessages",
      icon: MdPeopleAlt,
      label: "sidebar.usersMessages",
      iconColor: "text-red-700",
    },
  },
  {
    linkType: "link",
    Icon: SlHome,
    data: {
      to: "/admin/halls",
      icon: SlHome,
      label: "sidebar.hall",
      iconColor: "text-orange-700",
    }
  },
  {
    linkType: "link",
    Icon: LiaSwimmingPoolSolid,
    data: {
      to: "/admin/pools",
      icon: LiaSwimmingPoolSolid,
      label: "sidebar.pool",
      iconColor: "text-blue-700",
    }
  },
  {
    linkType: "link",
    Icon: GrRestaurant,
    data: {
      to: "/admin/restaurants",
      icon: GrRestaurant,
      label: "sidebar.restaurant",
      iconColor: "text-green-700",
    }
  },
  {
    linkType: "link",
    Icon: CiUser,
    data: {
      to: "/admin/adminCustumer",
      icon: CiUser,
      label: "sidebar.customer",
      iconColor: "text-red-700",

    }
  },
  {
    linkType: "link",
    Icon: FaFileInvoiceDollar,
    data: {
      to: "/admin/invoices",
      icon: FaFileInvoiceDollar,
      label: "sidebar.invoices",
      iconColor: "text-yellow-700",
    }
  }
];

export default sidebarItems;
