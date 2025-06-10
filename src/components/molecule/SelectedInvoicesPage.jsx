import { useLocation } from "react-router-dom";
import { useState } from "react";
import { PayInvoices } from "../../api/endpoints/payment";
import i18n from "../../constants/i18n";
import { toast } from "react-toastify";

const SelectedInvoicesPage = () => {
  const { state } = useLocation();
  const invoices = state?.selected || [];
  const userId = state?.userId;
  const [loading, setLoading] = useState(false);
  const isArabic = i18n.language === "ar";

  const totalAmount = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0);

  const handlePayment = async () => {
    setLoading(true);
    try {

      if (!userId) {
        setLoading(false);
        return;
      }

      const formattedInvoices = invoices.map((inv) => ({
        invoice_id: inv.invoice_id,
        invoice_type: inv.invoice_type,
        amount: inv.amount.toString(),
      }));

      const payload = {
        cust_id: userId,
        payment_method: "visa card",
        invoices: formattedInvoices,
      };

      const response = await PayInvoices(payload);
      toast.success(response.data.message)
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-admin-color">
      <h2 className="text-lg font-semibold"> Specific Invoices</h2>

      {invoices.length === 0 ? (
        <div className="text-center text-gray-500">No Specific Invoices</div>
      ) : (
        <div className="overflow-x-auto bg-white/5 rounded-xl shadow">
          <table className="min-w-full text-white text-sm">
            <thead>
              <tr className={`text-sm bg-white/10 ${isArabic ? "text-right" : "text-left"}`}>
                <th className="p-2">Invoice type </th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.invoice_id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-2">{inv.invoice_type}</td>
                  <td className="p-2">{inv.amount}</td>
                  <td className="p-2">{inv.details?.status || "غير معروف"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-white text-lg font-bold">
         Total: {totalAmount} ₪
      </div>

      <button
        disabled={loading || invoices.length === 0}
        onClick={handlePayment}
        className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-black transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? " Payment is in progress..." : "Pay Now "}
      </button>
    </div>
  );
};

export default SelectedInvoicesPage;
