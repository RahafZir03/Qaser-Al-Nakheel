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

export const getHallsName = () => {
    return axiosInstance.get(`/halls/get/hallsNameAndId`)
}

export const confirmHallReservation = (id) => {
    return axiosInstance.patch(`/halls/acceptHallReservation/${id}`)
}
export const addHall = (formData) => {
    console.log(formData);
    return axiosInstance.post('/halls', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
//delete hall
export const deleteHall = (hallId) => {
    return axiosInstance.delete(`/halls/${hallId}`);
}
//add facility to hall
export const addFacilityToHall = async (hallId, formData) => {
  return axiosInstance.post(`/halls/addFacility/${hallId}`, formData, {
    });
};
//delete facility from hall
export const deleteFacilityFromHall = (facilityId) => {
    return axiosInstance.delete(`/halls/deleteFacility/${facilityId}`);
}
//update Facility
export const updateFacility = (facilityId, formData) => {
    return axiosInstance.put(`/halls/updateFacility/${facilityId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
//add image to hall
export const addHallImage = (hallId, formData) => {
    return axiosInstance.post(`/halls/addHallImage/${hallId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

//update image of hall
export const updateHallImage = (imageId, formData) => {
    return axiosInstance.patch(`/halls/updateMainImage/${imageId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

//delete image of hall
export const deleteHallImage = (imageId) => {
    return axiosInstance.delete(`/halls/deleteHallImage/${imageId}`);
}
//update hall
export const updateHall = (hallId, formData) => {
    return axiosInstance.put(`/halls/${hallId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}


