import axiosInstance from "../axios";

export const getRoomsAndSuites = () => {
    return axiosInstance.get('/room/get/availableRoomPerType');
}

export const getAllRoomTypeRoomsNoDates = () => {
    return axiosInstance.get('/room/get/allRoomTypeRoomsNoDates');
}

export const getAllAvailableRoomsByDate = (check_in, check_out) => {
    return axiosInstance.get(`/room/get/availableRooms?check_in=${check_in}&check_out=${check_out}`);
}

