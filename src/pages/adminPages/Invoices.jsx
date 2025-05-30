import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import i18n from "../../constants/i18n";
import { filterInvoices } from "../../api/endpoints/payment";
import { RiMapPinUserLine } from "react-icons/ri";
import PaginationRounded from "../../components/molecule/PaginationRounded";

const ConfirmPaymentPage = () => {
    const [status, setStatus] = useState("false");
    const [invoiceType, setInvoiceType] = useState("All");
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isArabic = i18n.language === "ar";
    const limit = 10;

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const res = await filterInvoices(status, invoiceType, page, limit);
            console.log(res.data);
            setInvoices(res?.data?.unpaidInvoices || []);
            const totalCount = res?.data?.count || 0;
            setTotalPages(Math.ceil(totalCount / limit));
        } catch (err) {
            console.error(err);
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [status, invoiceType, page]);

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
            hour12: false
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
            hour12: false
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
            <h2 className="text-xl font-bold text-white">تأكيد دفع الفواتير</h2>

            <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-white">حالة الفواتير:</span>
                <select
                    value={status}
                    onChange={(e) => {
                        setPage(1); // reset page
                        setStatus(e.target.value);
                    }}
                    className="border border-gray-300 rounded-md p-2 text-sm w-40"
                >
                    <option value="false">غير مدفوع</option>
                    <option value="true">مدفوع</option>
                </select>

                <span className="text-lg font-semibold text-white">نوع الفاتورة:</span>
                <select
                    value={invoiceType}
                    onChange={(e) => {
                        setPage(1); // reset page
                        setInvoiceType(e.target.value);
                    }}
                    className="border border-gray-300 rounded-md p-2 text-sm w-40"
                >
                    <option value="All">الكل</option>
                    <option value="Booking">الغرف</option>
                    <option value="Hall">القاعات</option>
                    <option value="Pool">المسابح</option>
                    <option value="Restaurant">المطاعم</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center text-gray-500 py-10">جاري تحميل البيانات...</div>
            ) : invoices.length === 0 ? (
                <div className="text-center text-gray-500 py-10">لا توجد فواتير حاليًا</div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white/5 rounded-xl shadow">
                        <table className="min-w-full text-white text-sm">
                            <thead>
                                <tr className={`text-sm bg-white/10 ${isArabic ? "text-right" : "text-left"}`}>
                                    <th className="p-2">نوع الفاتورة</th>
                                    <th className="p-2">المبلغ</th>
                                    <th className="p-2">عدد الضيوف</th>
                                    <th className="p-2">تاريخ الدخول</th>
                                    <th className="p-2">تاريخ الخروج/الانتهاء</th>
                                    <th className="p-2">الحالة</th>
                                    <th className="p-2">اسم الموقع</th>
                                    <th className="p-2">العمليات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.invoice_id} className="border-b border-gray-700 hover:bg-gray-800">
                                        <td className="p-2">{invoice.invoice_type}</td>
                                        <td className="p-2">{invoice.amount}</td>
                                        <td className="p-2">{renderGuests(invoice.details)}</td>
                                        <td className="p-2">{renderStartDate(invoice.details, invoice.invoice_type)}</td>
                                        <td className="p-2">{renderEndDate(invoice.details, invoice.invoice_type)}</td>
                                        <td className="p-2">{invoice.details.status}</td>
                                        <td className="p-2">{renderLocation(invoice.details, invoice.invoice_type)}</td>
                                        <td className="p-2">
                                            {invoice.customerId ? (
                                                <Link
                                                    to={`/admin/allUserData/${invoice.customerId}`}
                                                    className="text-sec-color-100"
                                                >
                                                    <RiMapPinUserLine size={35} />
                                                </Link>
                                            ) : (
                                                <span className="bg-gray-500 text-white px-3 py-1 rounded text-xs cursor-not-allowed">
                                                    غير متوفر
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <PaginationRounded
                                count={totalPages}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                theme="dark"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ConfirmPaymentPage;
