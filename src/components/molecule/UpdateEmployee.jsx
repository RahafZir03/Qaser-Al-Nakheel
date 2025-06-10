/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { updateEmployee } from "../../api/endpoints/employee";


const EditEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
    const { t } = useTranslation("updateemployee");
    const [loading, setLoading] = useState(false);
    const [mobileInputs, setMobileInputs] = useState([""]);

    useEffect(() => {
        if (employee) {
            formik.setValues({
                id: employee.id || "",
                first_name: employee.first_name || "",
                last_name: employee.last_name || "",
                address: employee.address || "",
                salary: employee.salary ? employee.salary.toString() : "",
            });
            setMobileInputs(employee.EmployeeMobiles?.map(m => m.mobile_no) || [""]);
        }
    }, [employee]);

    const validationSchema = Yup.object({
        first_name: Yup.string().required(t("first_name") + " " + t("required")),
        last_name: Yup.string().required(t("last_name") + " " + t("required")),
        address: Yup.string(),
        salary: Yup.number()
            .typeError(t("salary") + " " + t("must_be_number"))
            .required(t("salary") + " " + t("required"))
            .positive(t("salary") + " " + t("must_be_positive")),
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            first_name: "",
            last_name: "",
            address: "",
            salary: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                if (!employee?.id) {
                    throw new Error("Employee ID is missing");
                }

                const data = {
                    ...values,
                    mobileNo: mobileInputs.filter(num => typeof num === 'string' && num.trim() !== "")
                };
                const response = await updateEmployee(employee.id, data);
                toast.success(response.data.message || t("update_employee_success"));
                if (onUpdate) onUpdate(response.data.employee);
                onClose();
                window.location.reload();
            } catch (error) {
                console.error("Update error:", error);
                toast.error(error.response?.data?.message || error.message || t("update_employee_failed"));
            } finally {
                setLoading(false);
            }
        },
    });

    const handleMobileChange = (index, value) => {
        const updated = [...mobileInputs];
        updated[index] = value.replace(/[^0-9]/g, '');
        setMobileInputs(updated);
    };

    const addMobileField = () => {
        if (mobileInputs.length < 3) {
            setMobileInputs([...mobileInputs, ""]);
        } else {
            toast.warn(t("max_mobile_numbers"));
        }
    };

    const removeMobileField = (index) => {
        if (mobileInputs.length > 1) {
            const updated = [...mobileInputs];
            updated.splice(index, 1);
            setMobileInputs(updated);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div className="bg-admin-color p-6 rounded shadow-lg max-w-xl w-full border-2 border-sec-color-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">{t("edit_employee")}</h2>
                
                </div>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            name="first_name"
                            placeholder={`${t("first_name")} *`}
                            {...formik.getFieldProps("first_name")}
                            className={`p-2 rounded bg-gray-700 text-white w-full ${formik.touched.first_name && formik.errors.first_name ? "border border-red-500" : ""} border border-sec-color-100`}
                            disabled={loading}
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <div className="text-red-400 text-sm mt-1">{formik.errors.first_name}</div>
                        )}
                    </div>

                    <div>
                        <input
                            name="last_name"
                            placeholder={`${t("last_name")} *`}
                            {...formik.getFieldProps("last_name")}
                            className={`p-2 rounded bg-gray-700 text-white w-full ${formik.touched.last_name && formik.errors.last_name ? "border border-red-500" : ""} border border-sec-color-100`}
                            disabled={loading}
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <div className="text-red-400 text-sm mt-1">{formik.errors.last_name}</div>
                        )}
                    </div>

                    <div>
                        <input
                            name="address"
                            placeholder={t("address")}
                            {...formik.getFieldProps("address")}
                            className="p-2 rounded bg-gray-700 text-white w-full border border-sec-color-100"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <input
                            name="salary"
                            placeholder={`${t("salary")} *`}
                            type="number"
                            {...formik.getFieldProps("salary")}
                            className={`p-2 rounded bg-gray-700 text-white w-full ${formik.touched.salary && formik.errors.salary ? "border border-red-500" : ""} border border-sec-color-100`}
                            disabled={loading}
                            min="0"
                            step="0.01"
                        />
                        {formik.touched.salary && formik.errors.salary && (
                            <div className="text-red-400 text-sm mt-1">{formik.errors.salary}</div>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-white block mb-1">{t("mobile_numbers")}</label>
                        {mobileInputs.map((number, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={number}
                                    onChange={(e) => handleMobileChange(idx, e.target.value)}
                                    placeholder={`${t("mobile")} #${idx + 1}`}
                                    className="flex-1 p-2 rounded bg-gray-700 text-white border border-sec-color-100"
                                    disabled={loading}
                                    maxLength="15"
                                />
                                {mobileInputs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMobileField(idx)}
                                        className="text-red-400 hover:text-red-300 text-sm p-2"
                                        disabled={loading}
                                    >
                                        {t("remove")}
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMobileField}
                            className="text-blue-400 hover:text-blue-300 text-sm mt-1 "
                            disabled={loading || mobileInputs.length >= 3}
                        >
                            + {t("add_number")}
                        </button>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded text-white "
                            disabled={loading}
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white disabled:bg-yellow-400"
                            disabled={loading || !formik.isValid}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t("saving")}
                                </span>
                            ) : (
                                t("update_employee")
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
