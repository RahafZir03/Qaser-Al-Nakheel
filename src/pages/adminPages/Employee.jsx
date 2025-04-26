import { useEffect, useState } from "react";
import { changeStatus, employeeData, changeShift, deleteEmployee } from "../../api/endpoints/employee";
import { toast } from "react-toastify";
import AddEmployeeModal from "../../components/molecule/AddEmployee";
import UpdateEmployee from "../../components/molecule/UpdateEmployee";

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchEmployees = async () => {
        try {
            const response = await employeeData();
            if (response?.data?.employees && Array.isArray(response.data.employees)) {
                setEmployees(response.data.employees);
            } else {
                toast.error("No employee data available");
                setEmployees([]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error loading data");
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
            setEmployees(prevEmployees =>
                prevEmployees.map(emp =>
                    emp.id === id ? { ...emp, status: updatedStatus } : emp
                )
            );

            toast.success(`Status changed to ${updatedStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status.");
        }
    };


    const handleShiftChange = async (id, newShift) => {
        try {
            await changeShift(id, { shift: newShift });
            toast.success("Shift updated!");
            fetchEmployees();
        } catch {
            toast.error("Failed to update shift");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await deleteEmployee(id);
            toast.success("Employee deleted!");
            fetchEmployees();
        } catch {
            toast.error("Failed to delete employee");
        }
    };

    const handleEmployeeUpdate = (updatedEmployee) => {
        setEmployees(prev =>
            prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
        );
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const truncateText = (text, length = 20) =>
        text?.length > length ? `${text.slice(0, length)}...` : text;

    return (
        <div className="p-4 md:p-8 bg-admin-color">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h1 className="text-2xl font-semibold text-white">All Employees</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add Employee
                </button>
            </div>

            <div className="overflow-x-auto bg-admin-color p-4 rounded">
                <table className="min-w-full text-white border bg-admin-color">
                    <thead>
                        <tr className="border-b bg-admin-color text-left">
                            <th className="p-2">First Name</th>
                            <th className="p-2">Last Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Address</th>
                            <th className="p-2">Job Description</th>
                            <th className="p-2">Salary</th>
                            <th className="p-2">Shift</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="10" className="p-2 text-center text-gray-400">
                                    <div className="flex justify-center items-center">
                                        <span className="mr-2">Loading</span>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : employees.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="p-2 text-center text-gray-400">
                                    No employees found
                                </td>
                            </tr>
                        ) : (
                            employees.map((emp) => (
                                <tr key={emp.id} className="border-b border-gray-700 text-sm">
                                    <td className="p-2">{emp.first_name}</td>
                                    <td className="p-2">{emp.last_name}</td>
                                    <td className="p-2">{truncateText(emp.email, 25)}</td>
                                    <td className="p-2">{truncateText(emp.address, 25)}</td>
                                    <td className="p-2">{truncateText(emp.jop_description, 30)}</td>
                                    <td className="p-2">{emp.salary}</td>
                                    <td className="p-2">
                                        <select
                                            value={emp.shift}
                                            onChange={(e) => handleShiftChange(emp.id, e.target.value)}
                                            className="bg-gray-700 text-white rounded p-1"
                                        >
                                            <option value="Morning">Morning</option>
                                            <option value="Evening">Evening</option>
                                            <option value="Rotational">Rotational</option>
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleStatusChange(emp.id, emp.status)}
                                            className={`px-2 py-1 rounded text-xs font-medium ${emp.status.toLowerCase() === "active"
                                                ? "bg-green-200 text-green-700"
                                                : "bg-red-200 text-red-700"
                                                }`}
                                        >
                                            {emp.status}
                                        </button>
                                    </td>
                                    <td className="p-2">{emp.role}</td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedEmployee(emp);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
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
        </div>
    );
}