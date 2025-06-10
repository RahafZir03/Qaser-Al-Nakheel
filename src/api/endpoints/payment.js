import axiosInstance from "../axios";

export const getInvoices = (id, status) => {
    return axiosInstance.get(`/payment/getUnpaidOrPaidInvoices/${id}?payed=${status}`)
};

export const PayInvoices = (payload) => {
    return axiosInstance.post(`/payment/payInvoices`, payload)
};

export const getInvoicesForAll = (status) => {
    console.log(status)
    return axiosInstance.get(`/payment?payed=${status}`)
};

export const getHallsInvoices = (status) => {
    return axiosInstance.get(`/payment/hallsInvoices?payed=${status}`)
};

export const getPoolsInvoices = (status) => {
    return axiosInstance.get(`/payment/poolsInvoices?payed=${status}`)
};

export const getBookingsInvoices = (status) => {
    return axiosInstance.get(`/payment/bookingsInvoices?payed=${status}`)
};

export const getRestaurantsInvoices = (status) => {
    return axiosInstance.get(`/payment/restaurantsInvoices?payed=${status}`)
};

export const filterInvoices = (status, type) => {
    switch (type) {
        case "Hall":
            return getHallsInvoices(status);
        case "Pool":
            return getPoolsInvoices(status);
        case "Booking":
            return getBookingsInvoices(status);
        case "Restaurant":
            return getRestaurantsInvoices(status);
        default:
            return getInvoicesForAll(status);
    }
};
