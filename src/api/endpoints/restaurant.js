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
//delete restuarant 
export const deleteRestaurant = (id) => {
    return axiosInstance.delete(`/restaurants/${id}`)
}
//update restaurant
export const updateRestaurant = (id, data) => {
    return axiosInstance.put(`/restaurants/${id}`, data)
}
//add restaurant
export const addRestaurant = (formData) => {
    return axiosInstance.post(`/restaurants`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
//add restaurant image
export const addRestaurantImage = (imageId, formData) => {
    return axiosInstance.post(`/restaurants/addRestaurantImage/${imageId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
//delete restaurant image
export const deleteRestaurantImage = (imageId) => {
    return axiosInstance.delete(`/restaurants/deleteRestaurantImage/${imageId}`);
}
//update restaurant image
export const updateRestaurantImage = (imageId, formData) => {
    return axiosInstance.patch(`/restaurants/updateMainImage/${imageId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
export const getRestaurantbyid = (id) => {
    return axiosInstance.get(`/restaurants/${id}`)
}