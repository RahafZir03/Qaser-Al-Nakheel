import axiosInstance from "../axios";
import { store } from '../../app/store';

export const getAllRestaurants = () => {
    return axiosInstance.get('/restaurants');
}

export const createRestaurantReservation = (data) => {
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/restaurants/createRestaurantReservation/${id}`, data);
};

export const getRestaurantById = () => {
    return axiosInstance.get(`/restaurants/2c9e4636-0c09-401a-afc4-093a7b6287ff`)
}