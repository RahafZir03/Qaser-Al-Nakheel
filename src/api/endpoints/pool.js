import axiosInstance from "../axios";
import { store } from '../../app/store';

export const getAllPools = () => {
    return axiosInstance.get('/pools');
}


export const createPoolReservation = (data) => {
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/pools/createPoolReservation/${id}`, data)
}
//add pool
export const addPool = (data) => {
    return axiosInstance.post('/pools', data);
}

//delete pool 
export const deletePool = (poolId) => {
    return axiosInstance.delete(`/pools/${poolId}`);
}

//add pool facilities
export const addPoolFacilities = (poolId, data) => {
    return axiosInstance.post(`/pools/addFacility/${poolId}`, data);
}
//delete pool facilities
export const deletePoolFacilities = (facilityId) => {
    return axiosInstance.delete(`/pools/deleteFacility/${facilityId}`);
}
//add pool image
export const addPoolImage = (poolId, formData) => {
    return axiosInstance.post(`/pools/addPoolImage/${poolId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

}
//update pool image
export const updatePoolImage = (poolId, data) => {
    return axiosInstance.patch(`/pools/updateMainImage/${poolId}`, data);
}
//delete pool image
export const deletePoolImage = (imageId) => {
    return axiosInstance.delete(`/pools/deletePoolImage/${imageId}`);
}

//update pool
export const updatePool = (poolId, data) => {
    return axiosInstance.put(`/pools/${poolId}`, data);
}
//get pool by id
export const getPoolById = (poolId) => {
    return axiosInstance.get(`/pools/${poolId}`);
}