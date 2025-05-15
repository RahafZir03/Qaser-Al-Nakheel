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

export const getPoolsName = () => {
    return axiosInstance.get(`/pools/get/PoolsName`)
}