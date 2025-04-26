import axiosInstance from "../axios";
export const getAllHalls = (hallsType) => {
    if (hallsType) {
        return axiosInstance.get(`/halls?hallType=${hallsType}`);
    } else {
        return axiosInstance.get(`/halls`);
    }
}

export const getHallById = (hallId) => {
    return axiosInstance.get(`/halls/${hallId}`)
}