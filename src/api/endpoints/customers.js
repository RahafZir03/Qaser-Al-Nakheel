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

export const deleteMessage = (messageId) => {
  return axiosInstance.delete(`/contact/${messageId}`)
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

export const cancelHallReservation = (id) => {
  return axiosInstance.patch(`/halls/cancelHallReservation/${id}`)
}

export const cancelPoolReservation = (id) => {
  return axiosInstance.patch(`/pools/cancelPoolReservation/${id}`)
}

export const cancelRestaurantReservation = (id) => {
  return axiosInstance.patch(`/restaurants/cancelRestaurantReservation/${id}`)
}

export const cancelRoomBooking = (id) => {
  return axiosInstance.patch(`/booking/cancelBooking/${id}`)
}

export const cancelWithType = (type, id) => {
  switch (type) {
    case "hall":
      return cancelHallReservation(id);
    case "pool":
      return cancelPoolReservation(id);
    case "restaurant":
      return cancelRestaurantReservation(id);
    case "room":
      return cancelRoomBooking(id);
    default:
      throw new Error(`Unknown reservation type: ${type}`);
  }
}

export const roomRating = (data) => {
  const state = store.getState();
  const id = state.authData?.userId;
  const newData = {
    room_id: data.room_id,
    rating: data.rating,
    comment: data.comment
  }
  return axiosInstance.post(`/customers/rating/room/${id}`, newData)
}

export const hallRating = (data) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.post(`/customers/rating/hall/${id}`, data)
}

export const poolRating = (data) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.post(`/customers/rating/pool/${id}`, data)
}

export const restaurantRating = (data) => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.post(`/customers/rating/restaurant/${id}`, data)
}

export const rateWithType = (type, data) => {
  switch (type) {
    case "hall":
      return hallRating(data);
    case "pool":
      return poolRating(data);
    case "restaurant":
      return restaurantRating(data);
    case "room":
      return roomRating(data);
    default:
      throw new Error(`Unknown reservation type: ${type}`);
  }
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