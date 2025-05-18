import { useEffect, useState } from "react";
import {
  banUnbanUser,
  deleteCustomer,
  getAllCustomers,
} from "../../api/endpoints/customers";
import { motion } from "framer-motion";
import { FaEye, FaBan, FaTrashAlt, FaUnlock } from "react-icons/fa";
import userImage from "../../assets/images/user.jpg";
import PaginationRounded from "../../components/molecule/PaginationRounded";
import { toast } from "react-toastify";
import { MdOutlineMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";
export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    is_verified: "",
    country: "",
    city: "",
    page: 1,
    limit: 9,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const fetchCustomers = async () => {
    const { data } = await getAllCustomers(filters);
    setCustomers(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchCustomers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const toggleDropdown = (id) => {
    setDropdownOpenId((prev) => (prev === id ? null : id));
  };

  const banUserOrUnban = async (id) => {
    try {
      const response = await banUnbanUser(id);
      toast.success(response.data.message);

      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === id ? { ...cust, banned: response.data.user.banned } : cust
        )
      );
    } catch (error) {
      toast.error("حدث خطأ أثناء تنفيذ العملية.");
      console.error(error);
    }
  };

  const deleteUserById = async (id) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا المستخدم؟"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteCustomer(id);
      toast.success(response.data.message);

      setCustomers((prev) => prev.filter((cust) => cust.id !== id));
    } catch (error) {
      toast.error("حدث خطأ أثناء حذف المستخدم.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-admin-color text-white">
      <h1 className="text-3xl font-bold text-white mb-6">Customers</h1>
      {/* Filters */}
      <div className="grid grid-cols-1 2md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <input
          name="search"
          placeholder="بحث بالاسم أو الإيميل"
          className="p-4 rounded-md bg-gray-800 text-white placeholder:text-gray-200 outline-none"
          onChange={handleFilterChange}
        />
        <input
          name="country"
          placeholder="الدولة"
          className="p-4 rounded-md bg-gray-800 text-white placeholder:text-gray-200 outline-none"
          onChange={handleFilterChange}
        />
        <input
          name="city"
          placeholder="المدينة"
          className="p-4 rounded-md bg-gray-800 text-white placeholder:text-gray-200 outline-none"
          onChange={handleFilterChange}
        />
        <select
          name="is_verified"
          className="p-4 rounded-md bg-gray-800 text-white outline-none"
          onChange={handleFilterChange}
        >
          <option value="">التحقق</option>
          <option value="true">موثق</option>
          <option value="false">غير موثق</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((cust) => (
          <motion.div
            key={cust.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative border border-sec-color-100 p-5 rounded-2xl shadow-xl  hover:shadow-black/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={cust.profile_picture || userImage}
                alt="profile"
                className="w-16 h-16 object-cover rounded-full border-2 border-yellow-400"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {cust.first_name} {cust.last_name}
                </h3>
                <p className="text-sm text-gray-300">
                  {cust.email ? cust.email : cust.auth_provider}
                </p>
              </div>
            </div>
            <p className="text-sm mb-1">
              <strong>الدولة:</strong> {cust.country}
            </p>
            <p className="text-sm mb-1">
              <strong>المدينة:</strong> {cust.city}
            </p>
            <p className="text-sm mb-1">
              <strong>الرمز البريدي:</strong>{" "}
              {cust.postal_code ? cust.postal_code : "لا يوجد"}
            </p>
            <p className="text-sm mb-1">
              <strong>رقم الجوال:</strong>{" "}
              {cust.CustomerMobiles?.[0]?.mobile_no || "غير متوفر"}
            </p>
            <p className="text-sm">
              <strong>التحقق:</strong>{" "}
              <span
                className={cust.is_verified ? "text-green-400" : "text-red-400"}
              >
                {cust.is_verified ? "موثق" : "غير موثق"}
              </span>
            </p>
            {cust.banned ? (
              <p className="text-sm">
                <strong>حالة الحساب:</strong>{" "}
                <span
                  className={!cust.banned ? "text-green-400" : "text-red-400"}
                >
                  {cust.banned ? "محظور" : "غير محظور"}
                </span>
              </p>
            ) : (
              ""
            )}
            {/* Dropdown Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleDropdown(cust.id)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                <MdOutlineMoreVert className="text-3xl" />
              </button>
              {dropdownOpenId === cust.id && (
                <div className="absolute right-0 mt-2 w-48 bg-admin-color border border-sec-color-100 rounded-xl shadow-lg z-20">
                  <div className=" text-sm text-white">
                    <Link
                      to={`/admin/allUserData/${cust.id}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-sec-color-100 hover:text-black transition duration-150 rounded-t-xl"
                    >
                      <FaEye className="text-white " />
                      عرض التفاصيل
                    </Link>
                    <button
                      type="button"
                      onClick={() => banUserOrUnban(cust.id)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-sec-color-100 hover:text-black transition duration-150"
                    >
                      {cust.banned ? (
                        <>
                          <FaUnlock className="text-white " />
                          إلغاء الحظر
                        </>
                      ) : (
                        <>
                          <FaBan className="text-white " />
                          حظر المستخدم
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteUserById(cust.id)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-black transition duration-150 rounded-b-xl"
                    >
                      <FaTrashAlt />
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationRounded
          count={totalPages}
          page={filters.page}
          onChange={(e, value) => handlePageChange(value)}
          theme="dark"
        />
      )}
    </div>
  );
}
