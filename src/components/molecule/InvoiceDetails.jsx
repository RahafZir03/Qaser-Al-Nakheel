/* eslint-disable react/prop-types */
import { IoMdCloseCircleOutline } from "react-icons/io";

const InvoiceDetailsModal = ({ invoice, onClose }) => {
    if (!invoice) return null;

    const { invoice_id, amount, invoice_type, details } = invoice;
    const room = details.room || {};

    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[130] flex items-center justify-center">
            <div className="bg-gray-700 border border-sec-color-100 rounded-xl p-6 w-full max-w-lg shadow-lg relative text-white overflow-y-auto max-h-[90vh]">
                <button
                    className="absolute top-3 right-4 text-red-500 font-bold text-lg"
                    onClick={onClose}
                ><IoMdCloseCircleOutline size={35} />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-white">Invoice Details</h2>

                <div className="space-y-2 leading-relaxed text-xl" >
                    <div><strong> Invoice number:</strong> {invoice_id}</div>
                    <div><strong> Invoice type:</strong> {invoice_type}</div>
                    <div><strong>Amount:</strong> {amount}ILS</div>
                    
                    <div><strong>CustomerId :</strong> {invoice.customerId || "unavailable"}</div>

                    <hr className="my-3 border-gray-300" />

                    <div><strong>Number of guests :</strong> {details.num_of_guests || details.num_guests || details.number_of_guests || "-"}</div>

                    {/* تفاصيل خاصة بالغرفة */}
                    {invoice_type === "Booking" && (
                        <>
                            <div><strong>Number of adults :</strong> {room.adult_guests}</div>
                            <div><strong>Number of children :</strong> {room.child_guests}</div>
                           
                            <div><strong>Room Number :</strong> {room.room_no}</div>
                            <div><strong>Bed Type :</strong> {room.bed_type?.ar}</div>
                            <div><strong>Category  :</strong> {room.category?.ar}</div>
                            <div><strong>Number of bath :</strong> {room.num_of_baths}</div>
                        </>
                    )}

                    
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailsModal;
