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
    return axiosInstance.get(`/restaurants/${"963627b6-63e5-498c-997d-6a1301efa2e3"}`)
}