import axiosInstance from "../axios";

export const getInvoices = (id,status) =>{
    console.log(id)
    return axiosInstance.get(`/payment/getUnpaidOrPaidInvoices/${id}?payed=${status}`)
};

export const PayInvoices = (payload) =>{
    return axiosInstance.post(`/payment/payInvoices`,payload)

};