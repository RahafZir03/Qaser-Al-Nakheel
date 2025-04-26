

// eslint-disable-next-line no-unused-vars
import { FaUsers, FaCheckCircle, FaTimesCircle, FaEnvelope, FaMoneyBill, FaHotel, FaSwimmingPool, FaUtensils, FaDoorClosed, FaDoorOpen, FaStar, FaUserTie } from "react-icons/fa";

export const iconMap = {
  "Customer Count": FaUsers,
  "Verified Customers": FaCheckCircle,
  "Unpaid Bookings": FaTimesCircle,
  "Unread Messages": FaEnvelope,
  "Revenue This Month": FaMoneyBill,
  "Available Rooms": FaDoorOpen,
  "Occupied Rooms": FaDoorClosed,
  "Pool Reservations This Month": FaSwimmingPool,
  "Restaurant Reservations This Month": FaUtensils,
  "Average Room Rating": FaStar,
  "Active Employees": FaUserTie,
};

export const colorMap = {
  "Customer Count": "bg-blue-500",
  "Verified Customers": "bg-green-500",
  "Unpaid Bookings": "bg-red-500",
  "Unread Messages": "bg-yellow-500",
  "Revenue This Month": "bg-green-700",
  "Available Rooms": "bg-indigo-500",
  "Occupied Rooms": "bg-gray-500",
  "Pool Reservations This Month": "bg-cyan-500",
  "Restaurant Reservations This Month": "bg-orange-500",
  "Average Room Rating": "bg-purple-500",
  "Active Employees": "bg-teal-500",
};