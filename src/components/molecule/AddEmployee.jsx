/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useState } from "react";
import { addEmployee } from "../../api/endpoints/employee";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { IoMdCloseCircleOutline } from "react-icons/io";

const AddEmployeeModal = ({ isOpen, onClose, onAdd }) => {
    const [loading, setLoading] = useState(false);
    const [mobileInputs, setMobileInputs] = useState([""]);
    const { t } = useTranslation("addemployee");


    const validationSchema = Yup.object({
        first_name: Yup.string().required(t('validation.required', { field: t('table.firstName') })),
        last_name: Yup.string().required(t('validation.required', { field: t('table.lastName') })),
        email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required', { field: t('table.email') })),
        password: Yup.string().required(t('validation.required', { field: t('table.password') })),
        address: Yup.string(),
        jop_description: Yup.string(),
        salary: Yup.number().typeError(t('validation.salaryNumber')).required(t('validation.required', { field: t('table.salary') })),
        status: Yup.string().oneOf(["Active", "Inactive"]),
        role: Yup.string().oneOf(["admin", "employee", "reception"]).required(t('validation.required', { field: t('table.role') })),
        shift: Yup.string().oneOf(["Morning", "Evening", "Rotational"]).required(t('validation.required', { field: t('table.shift') })),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            address: "",
            job_description: "",
            salary: "",
            shift: "",
            status: "Active",
            role: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const data = {
                    ...values,
                    mobileNo: mobileInputs.filter(num => num.trim() !== ""),
                };
                const response = await addEmployee(data);
                toast.success(response.data.message || t('messages.addSuccess'));
                if (onAdd) onAdd(response.data.newEmployee);
                resetForm();
                setMobileInputs([""]);
                setTimeout(onClose, 1000);
            } catch (error) {
                toast.error(error.response?.data?.message || t('messages.addFailed'));
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
            <div className="bg-admin-color p-6 rounded shadow-lg max-w-xl w-full border-2 border-sec-color-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">{t('addEmployee')}</h2>
                    <button onClick={onClose} className="text-red-500 font-bold text-xl"><IoMdCloseCircleOutline size={35}/></button>
                </div>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <input
                            name="first_name"
                            placeholder={t('firstName')}
                            {...formik.getFieldProps("first_name")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <div className="text-red-400 text-sm">{formik.errors.first_name}</div>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <input
                            name="last_name"
                            placeholder={t('lastName')}
                            {...formik.getFieldProps("last_name")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
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
                            placeholder={t('email')}
                            {...formik.getFieldProps("email")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-400 text-sm">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div >
                        <input
                            name="password"
                            type="password"
                            placeholder={t('password')}
                            {...formik.getFieldProps("password")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-400 text-sm">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Address */}
                    <input
                        name="address"
                        placeholder={t('address')}
                        {...formik.getFieldProps("address")}
                        className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                    />

                    {/* Job Description */}
                    <input
                        name="jop_description"
                        placeholder={t('jobDescription')}
                        {...formik.getFieldProps("jop_description")}
                        className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                    />

                    {/* Salary */}
                    <div>
                        <input
                            name="salary"
                            type="number"
                            placeholder={t('salary')}
                            {...formik.getFieldProps("salary")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
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
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                        >
                            <option value="">{t('selectShift')}</option>
                            <option value="Morning">{t('morning')}</option>
                            <option value="Evening">{t('evening')}</option>
                            <option value="Rotational">{t('rotational')}</option>
                        </select>
                        {formik.touched.shift && formik.errors.shift && (
                            <div className="text-red-400 text-sm">{formik.errors.shift}</div>
                        )}
                    </div>

                    {/* Status */}
                    <select
                        name="status"
                        {...formik.getFieldProps("status")}
                        className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                    >
                        <option value="Active">{t('active')}</option>
                        <option value="Inactive">{t('inactive')}</option>
                    </select>

                    {/* Role */}
                    <div>
                        <select
                            name="role"
                            {...formik.getFieldProps("role")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                        >
                            <option value="">{t('selectRole')}</option>
                            <option value="admin">{t('admin')}</option>
                            <option value="employee">{t('employee')}</option>
                            <option value="reception">{t('reception')}</option>
                        </select>
                        {formik.touched.role && formik.errors.role && (
                            <div className="text-red-400 text-sm">{formik.errors.role}</div>
                        )}
                    </div>

                    {/* Mobile Numbers */}
                    <div className="md:col-span-2">
                        <label className="text-white block mb-1">{t('mobileNumbers')}</label>
                        {mobileInputs.map((number, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={number}
                                    onChange={(e) => handleMobileChange(idx, e.target.value)}
                                    placeholder={`${t('mobile')} #${idx + 1}`}
                                    className="flex-1 p-2 rounded bg-gray-700 text-white border border-sec-color-100"
                                />
                                {mobileInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMobileField(idx)}
                                        className="text-red-400 text-sm"
                                    >
                                        {t('remove')}
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMobileField}
                            className="text-blue-400 text-sm mt-1"
                        >
                            {t('addAnotherNumber')}
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white"
                            disabled={loading}
                        >
                            {loading ? t('saving') : t('addEmployee')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
