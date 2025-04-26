import axiosInstance from "../axios";
import { store } from '../../app/store';

export const createBookingByRoomType = (formData) => {
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/booking/${id}`, formData);
}

export const getRoomTypeForNavbar = () => {
    return axiosInstance.get('/room/get/RoomTypeForNavbar');
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
    console.log(data)
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/halls/hallReservation/${id}`, data)
}