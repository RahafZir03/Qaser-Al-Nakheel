import { useEffect, useState } from "react";
import { getInvoices } from "../../api/endpoints/payment";
import { useParams, useNavigate } from "react-router-dom";
import i18n from "../../constants/i18n";

const InvoicesTablePage = () => {
    const [status, setStatus] = useState("false");
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoices, setSelectedInvoices] = useState({});
    const isArabic = i18n.language === "ar";
    const { id } = useParams();
    const userId = id;
    const navigate = useNavigate();

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const res = await getInvoices(userId, status);
            setInvoices(res?.data?.unpaidInvoices || []);
        } catch  {
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

    const handleNext = () => {
        const selected = invoices.filter((invoice) => selectedInvoices[invoice.invoice_id]);
        navigate("/admin/selectedinvoices", { state: { selected,userId } });
    };

    const renderGuests = (details) => {
        return details.num_of_guests || details.num_guests || details.number_of_guests || "-";
    };

    const renderStartDate = (details, type) => {
        let rawDate = null;

        if (type === "Booking") rawDate = details.check_in_date;
        else if (type === "CustomerPool") rawDate = details.start_time;
        else if (type === "CustomerRestaurant") rawDate = details.reservation_date;
        else if (type === "HallReservation") rawDate = details.start_time;

        if (!rawDate) return "-";

        const date = new Date(rawDate);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const renderEndDate = (details, type) => {
        let rawDate = null;

        if (type === "Booking") rawDate = details.check_out_date;
        else if (type === "CustomerPool") rawDate = details.end_time;
        else if (type === "HallReservation") rawDate = details.end_time;

        if (!rawDate) return "-";

        const date = new Date(rawDate);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const renderLocation = (details, type) => {
        if (type === "Booking") return details.room?.room_no || "-";
        if (type === "CustomerRestaurant") return details.restaurant?.name?.ar || "-";
        if (type === "CustomerPool") return details.pool?.name?.ar || "-";
        if (type === "HallReservation") return details.hall?.name?.ar || "-";
        return "-";
    };

    return (
        <div className="p-6 space-y-6 bg-admin-color">
            <div className="flex items-center gap-4 ">
                <span className="text-lg font-semibold ">حالة الفواتير:</span>
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
                <div className="overflow-x-auto bg-white/5 rounded-xl shadow">
                    <table className="min-w-full text-white text-sm">
                        <thead>
                            <tr className={`text-sm bg-white/10 ${isArabic ? "text-right" : "text-left"}`}>
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
                                <tr key={invoice.invoice_id} className="border-b border-gray-700 hover:bg-gray-800">
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
            <button
                onClick={handleNext}
                className="mt-4 bg-green-700 text-white px-5 py-2 rounded-md hover:bg-black transition-colors duration-200"
            >
                Next
            </button>
        </div>
    );
};

export default InvoicesTablePage;
