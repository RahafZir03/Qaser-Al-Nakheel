import { useEffect, useState } from "react";
import { getInvoices, PayInvoices } from "../../api/endpoints/payment";
import { useParams } from "react-router-dom";

const InvoicesTablePage = () => {
    const [status, setStatus] = useState("false");
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoices, setSelectedInvoices] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { id } = useParams();
    const userId = id;

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const res = await getInvoices(userId, status);
            setInvoices(res?.data?.unpaidInvoices || []);
        } catch (err) {
            console.error(err);
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [userId, status]);

    const toggleInvoiceSelection = (id) => {
        setSelectedInvoices((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const selectedData = Array.isArray(invoices)
        ? invoices.filter((inv) => selectedInvoices[inv.invoice_id])
        : [];

    const totalAmount = selectedData.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

    const renderGuests = (details) => {
        return details.num_of_guests || details.num_guests || details.number_of_guests || "-";
    };

    const renderStartDate = (details, type) => {
        if (type === "Booking") return details.check_in_date;
        if (type === "CustomerPool") return details.start_time;
        if (type === "CustomerRestaurant") return details.reservation_date;
        if (type === "HallReservation") return details.start_time;
        return "-";
    };

    const renderEndDate = (details, type) => {
        if (type === "Booking") return details.check_out_date;
        if (type === "CustomerPool") return details.end_time;
        if (type === "HallReservation") return details.end_time;
        return "-";
    };

    const renderLocation = (details, type) => {
        if (type === "Booking") return details.room?.room_no || "-";
        if (type === "CustomerRestaurant") return details.restaurant?.name?.ar || "-";
        if (type === "CustomerPool") return details.pool_id || "-";
        if (type === "HallReservation") return details.hall?.name?.ar || "-";
        return "-";
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">حالة الفواتير:</span>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-sm w-40"
                >
                    <option value="false">غير مدفوع</option>
                    <option value="true">مدفوع</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center text-gray-500 py-10">جاري تحميل البيانات...</div>
            ) : invoices.length === 0 ? (
                <div className="text-center text-gray-500 py-10">لا توجد فواتير حاليًا</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border rounded-xl text-sm text-right">
                        <thead>
                            <tr className="bg-gray-100">
                                {status === "false" && <th className="p-2">تحديد</th>}
                                <th className="p-2">نوع الفاتورة</th>
                                <th className="p-2">المبلغ</th>
                                <th className="p-2">عدد الضيوف</th>
                                <th className="p-2">تاريخ الدخول</th>
                                <th className="p-2">تاريخ الخروج/الانتهاء</th>
                                <th className="p-2">الحالة</th>
                                <th className="p-2">اسم الموقع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.invoice_id} className="border-t text-white">
                                    {status === "false" && (
                                        <td className="p-2 text-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 cursor-pointer"
                                                checked={!!selectedInvoices[invoice.invoice_id]}
                                                onChange={() => toggleInvoiceSelection(invoice.invoice_id)}
                                            />
                                        </td>
                                    )}
                                    <td className="p-2">{invoice.invoice_type}</td>
                                    <td className="p-2">{invoice.amount}</td>
                                    <td className="p-2">{renderGuests(invoice.details)}</td>
                                    <td className="p-2">{renderStartDate(invoice.details, invoice.invoice_type)}</td>
                                    <td className="p-2">{renderEndDate(invoice.details, invoice.invoice_type)}</td>
                                    <td className="p-2">{invoice.details.status}</td>
                                    <td className="p-2">{renderLocation(invoice.details, invoice.invoice_type)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {status === "false" && selectedData.length > 0 && (
                <div className="mt-6 border rounded-xl p-4 bg-black shadow-sm w-full max-w-xl mx-auto">
                    <h3 className="text-lg text-white font-bold mb-3">الفواتير المحددة</h3>
                    <table className="w-full text-sm text-right text-white">
                        <thead>
                            <tr className="bg-gray-100 text-black">
                                <th className="p-2">نوع الفاتورة</th>
                                <th className="p-2">المبلغ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.map((invoice) => (
                                <tr key={invoice.invoice_id} className="border-t">
                                    <td className="p-2">{invoice.invoice_type}</td>
                                    <td className="p-2">{invoice.amount}</td>
                                </tr>
                            ))}
                            <tr className="font-bold text-green-700">
                                <td className="p-2">المجموع الكلي</td>
                                <td className="p-2">NIS {totalAmount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {status === "false" && (
                <button
                    className="mt-4 bg-green-700 text-white px-5 py-2 rounded-md hover:bg-black transition-colors duration-200"
                    onClick={() => {
                        if (selectedData.length === 0) return alert("لم يتم اختيار أي فاتورة");
                        setShowConfirmModal(true);
                    }}
                >
                    دفع الفواتير المحددة
                </button>
            )}

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-admin-color shadow-2xl rounded-3xl px-8 py-10 w-full max-w-sm text-center relative">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
                        <h2 className="text-xl font-bold text-white mb-3">تأكيد الدفع</h2>
                        <p className="text-white mb-6">
                            هل أنت متأكد أنك تريد دفع الفواتير المحددة؟
                            <br />
                            المبلغ الإجمالي:{" "}
                            <span className="font-semibold text-green-700">NIS {totalAmount.toFixed(2)}</span>
                        </p>
                        <div className="flex justify-center gap-3 mt-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 text-white hover:bg-gray-100 transition duration-150"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={async () => {
                                    const payload = {
                                        cust_id: userId,
                                        payment_method: "visa card",
                                        invoices: selectedData.map((inv) => ({
                                            invoice_id: inv.invoice_id,
                                            invoice_type: inv.invoice_type,
                                            amount: inv.amount,
                                        })),
                                    };

                                    try {
                                        await PayInvoices(payload);
                                        setShowConfirmModal(false);
                                        fetchInvoices();
                                        setSelectedInvoices({});
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-150"
                            >
                                تأكيد
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicesTablePage;
