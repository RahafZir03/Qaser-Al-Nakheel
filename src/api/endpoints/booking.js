import axiosInstance from "../axios";
import { store } from '../../app/store';

export const createBookingByRoomType = (formData) => {
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/booking/${id}`, formData);
}

export const getRoomTypeForNavbar = (filters) => {
    return axiosInstance.get(`/room/get/RoomTypeForNavbar/select=${filters.select}`);
}

export const getRoomTypeAndRoomsByTypeId = (typeId, checkIn, checkOut) => {
    return axiosInstance.get(`/room/get/RoomTypeWithRooms/${typeId}?check_in=${checkIn}&check_out=${checkOut}`);
}

export const getRoomTypeAndRoomsByTypeIdnoDates = (typeId) => {
    return axiosInstance.get(`/room/get/RoomTypeRoomsNoDates/${typeId}`);
}

export const CreateBookingByRoomId = (bookingData) => {
    const state = store.getState();
    const userId = state.authData?.userId;
    return axiosInstance.post(`/booking/roomBooking/${userId}`, bookingData);
}

//Halls Booking
export const getReservationsByHallAndDate = (hallId, date) => {
    return axiosInstance.get(`/halls/get/getReservationsByHallAndDate/${hallId}?date=${date}`)
}

export const createHallReservation = (data) => {
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/halls/hallReservation/${id}`, data)
}

export const getAllRoomBookings = (params = {}) => {
    return axiosInstance.get(`/booking`, { params });
};

export const deleteBooking = (id) => {
    return axiosInstance.delete(`/booking/deleteBooking/${id}`);
}

export const getAllHallReservation = (params = {}) => {
    return axiosInstance.get(`/halls/hallReservations`, { params });
};

export const deleteHallReservation = (id) => {
    return axiosInstance.delete(`/halls/deleteReservation/${id}`);
};


// تسجيل الدخول (Check-in) لحجز مسبح
export const checkInPoolReservation = (id) => {
    return axiosInstance.patch(`/pools/checkIn/${id}`);
};

// تسجيل الخروج (Check-out) من حجز مسبح
export const checkOutPoolReservation = (id) => {
    return axiosInstance.patch(`/pools/checkOut/${id}`);
};

// إلغاء حجز مسبح
export const cancelPoolReservation = (id) => {
    return axiosInstance.patch(`/pools/cancelPoolReservation/${id}`);
};

// الحصول على جميع حجوزات المسابح مع إمكانية التصفية
export const getAllPoolReservations = (params = {}) => {
    return axiosInstance.get(`/pools/get/AllPoolReservations`, { params });
};

// حذف حجز مسبح
export const deletePoolReservation = (id) => {
    return axiosInstance.delete(`/pools/deleteReservation/${id}`);
};

// الحصول على جميع حجوزات المطاعم مع إمكانية التصفية
export const getAllRestaurantReservations = (params = {}) => {
    return axiosInstance.get(`/restaurants/get/allReservationWithFilter`, { params });
};

// إلغاء حجز مطعم
export const cancelRestaurantReservation = (id) => {
    return axiosInstance.patch(`/restaurants/cancelRestaurantReservation/${id}`);
};

// حذف حجز مطعم
export const deleteRestaurantReservation = (id) => {
    return axiosInstance.delete(`/restaurants/reservation/${id}`);
};

export const getAllMessages = (params = {}) => {
    return axiosInstance.get(`/contact/`, { params })
}

export const makeMessageRead = (id) => {
    return axiosInstance.patch(`/contact/makeMessageRead/${id}`)
}

export const deleteMessage = (id) => {
    return axiosInstance.delete(`/contact/${id}`)
}