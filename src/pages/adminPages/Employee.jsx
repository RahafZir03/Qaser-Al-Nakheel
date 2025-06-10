import { useEffect, useState } from "react";
import { changeStatus, employeeData, changeShift, deleteEmployee } from "../../api/endpoints/employee";
import { toast } from "react-toastify";
import AddEmployeeModal from "../../components/molecule/AddEmployee";
import UpdateEmployee from "../../components/molecule/UpdateEmployee";
import EditJobModal from "../../components/molecule/EditJobModal";
import { useTranslation } from 'react-i18next';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiExchange2Line } from "react-icons/ri";
import PaginationRounded from "../../components/molecule/PaginationRounded";


export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { t, i18n } = useTranslation("Employee");

  const isArabic = i18n.language === "ar";
  const fetchEmployees = async (currentPage = page, currentFilters = filters) => {
    try {
      const limit = 10;
      const response = await employeeData(currentPage, limit, currentFilters);
      if (response?.data?.employees && Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
        setTotalPages(response.data.totalPages);
      } else {
        toast.error(t('toasts.noEmployeeData'));
        setEmployees([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('toasts.errorLoadingData'));
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };


  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      const response = await changeStatus(id, { status: newStatus });
      const updatedStatus = response?.data?.status || newStatus;
      setEmployees(prev =>
        prev.map(emp => (emp.id === id ? { ...emp, status: updatedStatus } : emp))
      );
      toast.success(t('toasts.statusChanged', { status: updatedStatus }));
    } catch {
      toast.error(t('toasts.failedToUpdateStatus'));
    }
  };

  const handleShiftChange = (id, newShift) => {
    try {
      changeShift(id, { shift: newShift });
      toast.success(t('toasts.shiftUpdated'));
      fetchEmployees();
    } catch {
      toast.error(t('toasts.failedToUpdateShift'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmations.deleteEmployee'))) return;
    try {
      await deleteEmployee(id);
      toast.success(t('toasts.employeeDeleted'));
      fetchEmployees();
    } catch {
      toast.error(t('toasts.failedToDeleteEmployee'));
    }
  };

  const handleEmployeeUpdate = (updatedEmployee) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
    );
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const truncateText = (text, length = 20) =>
    text?.length > length ? `${text.slice(0, length)}...` : text;
  const [filters, setFilters] = useState({
    address: '',
    jop: '',
    salary: '',
    shift: '',
    status: '',
    role: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchEmployees(1, filters);
  };

  const handleResetFilters = () => {
    const cleared = {
      address: '',
      jop: '',
      hire_date: '',
      salary: '',
      shift: '',
      status: '',
      role: '',
    };
    setFilters(cleared);
    setPage(1);
    fetchEmployees(1, cleared);
  };


  return (
    <div className="p-4 md:p-8 bg-admin-color ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">{t('general.allEmployees')}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition"
        >
          {t('buttons.addEmployee')}
        </button>
      </div>
      <div className="bg-white/10 p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        <input
          name="address"
          value={filters.address}
          onChange={handleFilterChange}
          placeholder={t('filters.address')}
          className="bg-gray-800 p-2 rounded"
        />
        <input
          name="jop"
          value={filters.jop}
          onChange={handleFilterChange}
          placeholder={t('filters.jop')}
          className="bg-gray-800 p-2 rounded"
        />

        <input
          type="number"
          name="salary"
          value={filters.salary}
          onChange={handleFilterChange}
          placeholder={t('filters.salary')}
          className="bg-gray-800 p-2 rounded"
        />
        <select
          name="shift"
          value={filters.shift}
          onChange={handleFilterChange}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="">{t('filters.selectShift')}</option>
          <option value="Morning">{t('shiftOptions.morning')}</option>
          <option value="Evening">{t('shiftOptions.evening')}</option>
          <option value="Rotational">{t('shiftOptions.rotational')}</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="">{t('filters.selectStatus')}</option>
          <option value="Active">{t('status.active')}</option>
          <option value="Inactive">{t('status.inactive')}</option>
        </select>
        <input
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          placeholder={t('filters.role')}
          className="bg-gray-800 p-2 rounded"
        />

        <div className="flex gap-2 mt-2 col-span-full">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t('buttons.applyFilters')}
          </button>
          <button
            onClick={handleResetFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            {t('buttons.resetFilters')}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white/5 rounded-xl shadow">
        <table className="min-w-full text-white text-sm">
          <thead>
            <tr className={`text-sm bg-white/10 ${isArabic ? "text-right" : "text-left"
              }`}>
              <th className="p-3">{t('table.name')}</th>
              <th className="p-3">{t('table.email')}</th>
              <th className="p-3">{t('table.address')}</th>
              <th className="p-3">{t('table.jobDescription')}</th>
              <th className="p-3">{t('table.salary')}</th>
              <th className="p-3">{t('table.shift')}</th>
              <th className="p-3">{t('table.status')}</th>
              <th className="p-3">{t('table.role')}</th>
              <th className="p-3">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center p-5 text-gray-400">
                  {t('general.loading')}...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center p-5 text-gray-400">
                  {t('general.noEmployeesFound')}
                </td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-3">{emp.first_name} {emp.last_name}</td>
                  <td className="p-3">{truncateText(emp.email, 25)}</td>
                  <td className="p-3">{truncateText(emp.address, 25)}</td>
                  <td className="p-3">{truncateText(emp.jop_description, 30)}</td>
                  <td className="p-3">{emp.salary}</td>
                  <td className="p-3">
                    <select
                      value={emp.shift}
                      onChange={(e) => handleShiftChange(emp.id, e.target.value)}
                      className="bg-gray-700 text-white p-1 rounded"
                    >
                      <option value="Morning">{t('shiftOptions.morning')}</option>
                      <option value="Evening">{t('shiftOptions.evening')}</option>
                      <option value="Rotational">{t('shiftOptions.rotational')}</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleStatusChange(emp.id, emp.status)}
                      className={`px-2 py-1 rounded text-xs font-medium ${emp.status === "Active"
                        ? "bg-green-300 text-green-900"
                        : "bg-red-300 text-red-900"
                        }`}
                    >
                      {t(`status.${emp.status?.toLowerCase()}`)}
                    </button>
                  </td>
                  <td className="p-3">{t(`roles.${emp.role?.toLowerCase()}`)}</td>
                  <td className="p-3 flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      title={t('buttons.delete')}>
                      <MdDelete className=" text-red-600 hover:text-red-400 " size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsEditModalOpen(true);
                      }}
                      title={t('buttons.edit')}>
                      <FaEdit className=" text-white" size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setIsEditJobModalOpen(true);
                      }}
                      title={t('buttons.editJob')}>
                      <RiExchange2Line size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <PaginationRounded
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              setPage(value);
            }}
            theme="dark"
          />
        )}
      </div>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newEmp) => setEmployees((prev) => [...prev, newEmp])}
      />

      <UpdateEmployee
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        employee={selectedEmployee}
        onUpdate={handleEmployeeUpdate}
      />

      <EditJobModal
        isOpen={isEditJobModalOpen}
        onClose={() => setIsEditJobModalOpen(false)}
        employee={selectedEmployee}
        onSave={handleEmployeeUpdate}
      />
    </div>
  );
}
