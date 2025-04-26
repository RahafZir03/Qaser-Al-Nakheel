/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useState } from "react";
import { addEmployee } from "../../api/endpoints/employee";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddEmployeeModal = ({ isOpen, onClose, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const [mobileInputs, setMobileInputs] = useState([""]);
    

    const validationSchema = Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
        address: Yup.string(),
        jop_description: Yup.string(),
        salary: Yup.number().typeError("Salary must be a number").required("Salary is required"),
        status: Yup.string().oneOf(["Active", "Inactive"]),
        role: Yup.string().oneOf(["admin", "employee", "reception"]).required("Role is required"),
        shift: Yup.string().oneOf(["Morning", "Evening", "Rotational"]).required("Shift is required"),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            address: "",
            jop_description: "",
            salary: "",
            shift: "",
            status: "Active", // ✅ متوافقة مع Yup
            role: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log("Submitted");
            setLoading(true);
            try {
                const data = {
                    ...values,
                    mobileNo: mobileInputs.filter(num => num.trim() !== ""),
                };
                const response = await addEmployee(data);
                toast.success(response.data.message || "Employee added successfully.");
                if (onAdd) onAdd(response.data.newEmployee);
                resetForm();
                setMobileInputs([""]);
                setTimeout(onClose, 1000);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Failed to add employee.");
            }
            setLoading(false);
        },
    });

    const handleMobileChange = (index, value) => {
        const updated = [...mobileInputs];
        updated[index] = value;
        setMobileInputs(updated);
    };

    const addMobileField = () => setMobileInputs([...mobileInputs, ""]);
    const removeMobileField = (index) => {
        const updated = [...mobileInputs];
        updated.splice(index, 1);
        setMobileInputs(updated);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
            <div className="bg-gray-800 p-6 rounded shadow-lg max-w-xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Add New Employee</h2>
                    <button onClick={onClose} className="text-red-500 font-bold text-xl">&times;</button>
                </div>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <input
                            name="first_name"
                            placeholder="First Name"
                            {...formik.getFieldProps("first_name")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <div className="text-red-400 text-sm">{formik.errors.first_name}</div>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <input
                            name="last_name"
                            placeholder="Last Name"
                            {...formik.getFieldProps("last_name")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <div className="text-red-400 text-sm">{formik.errors.last_name}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-400 text-sm">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            {...formik.getFieldProps("password")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-400 text-sm">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Address */}
                    <input
                        name="address"
                        placeholder="Address"
                        {...formik.getFieldProps("address")}
                        className="p-2 rounded bg-gray-700 text-white w-full"
                    />

                    {/* Job Description */}
                    <input
                        name="jop_description"
                        placeholder="Job Description"
                        {...formik.getFieldProps("jop_description")}
                        className="p-2 rounded bg-gray-700 text-white w-full"
                    />

                    {/* Salary */}
                    <div>
                        <input
                            name="salary"
                            type="number"
                            placeholder="Salary"
                            {...formik.getFieldProps("salary")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        />
                        {formik.touched.salary && formik.errors.salary && (
                            <div className="text-red-400 text-sm">{formik.errors.salary}</div>
                        )}
                    </div>

                    {/* Shift */}
                    <div>
                        <select
                            name="shift"
                            {...formik.getFieldProps("shift")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        >
                            <option value="">Select Shift</option>
                            <option value="Morning">Morning</option>
                            <option value="Evening">Evening</option>
                            <option value="Rotational">Rotational</option>
                        </select>
                        {formik.touched.shift && formik.errors.shift && (
                            <div className="text-red-400 text-sm">{formik.errors.shift}</div>
                        )}
                    </div>

                    {/* Status */}
                    <select
                        name="status"
                        {...formik.getFieldProps("status")}
                        className="p-2 rounded bg-gray-700 text-white w-full"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    {/* Role */}
                    <div>
                        <select
                            name="role"
                            {...formik.getFieldProps("role")}
                            className="p-2 rounded bg-gray-700 text-white w-full"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="reception">Reception</option>
                        </select>
                        {formik.touched.role && formik.errors.role && (
                            <div className="text-red-400 text-sm">{formik.errors.role}</div>
                        )}
                    </div>

                    {/* Mobile Numbers */}
                    <div className="md:col-span-2">
                        <label className="text-white block mb-1">Mobile Numbers</label>
                        {mobileInputs.map((number, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={number}
                                    onChange={(e) => handleMobileChange(idx, e.target.value)}
                                    placeholder={`Mobile #${idx + 1}`}
                                    className="flex-1 p-2 rounded bg-gray-700 text-white"
                                />
                                {mobileInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMobileField(idx)}
                                        className="text-red-400 text-sm"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMobileField}
                            className="text-blue-400 text-sm mt-1"
                        >
                            + Add another number
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Add Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
