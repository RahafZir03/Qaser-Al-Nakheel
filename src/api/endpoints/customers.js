import axiosInstance from "../axios";
import { store } from '../../app/store';

export const updateCustomerProfile = (formData) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.put(`/customers/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const changePassword = (data) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.patch(`/customers/update/changePassword/${id}`, data)
}

export const getSomeDataForUser = () => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/general/get/SomeDataForUser/${id}`)
}

export const getCustomerMessages = (page, limit, status) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/contact/customerContacts/${id}?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`)
}

export const sendMessage = (data) => {
  const state = store.getState();
  const id = state.authData?.userId;
  data.cust_id = id;
  return axiosInstance.post(`/contact`, data)
}

export const getPoolReservationForCustomer = (page, limit, status) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/pools/getPoolReservationByCustomerId/${id}?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`)
}

export const getRestaurantReservationForCustomer = (page, limit, status) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/restaurants/get/ReservationsCustomer/${id}?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`)
}

export const getRoomBookings = (page, limit, status) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/booking/customerBookings/${id}?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`)
}

export const getHallReservationForCustomer = (page, limit, status) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/halls/customerHallReservation/${id}?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`)
} 
export const getAllCustomers = (params = {}) => {
  return axiosInstance.get('/customers', {
    params,
  });
};

export const banUnbanUser = (id) => {
  return axiosInstance.patch(`/customers/banUser/${id}`)
}

export const deleteCustomer = (id) => {
  return axiosInstance.delete(`/customers/${id}`);
};
export const getCustomerById = (id) => {
  return axiosInstance.get(`/customers/${id}`);
};