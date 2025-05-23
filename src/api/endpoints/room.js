import axiosInstance from "../axios";

// room type endpoints
export const roomTypeData = () => {
  return axiosInstance.get('/room/roomTypes');
}

export const deleteRoomType = (typeId) => {
  return axiosInstance.delete(`/room/roomTypeDelete/${typeId}`)
}
export const updateRoomType = (typeId, typeData) => {
  return axiosInstance.put(`/room/roomTypeUpdate/${typeId}`, typeData)
}
export const addRoomType = (typeData) => {
  return axiosInstance.post('/room/addRoomType', typeData);
};

export const getRoomTypeById = (typeId) => {
  return axiosInstance.get(`/room/roomType/${typeId}`)
}


// service endpoints
export const serviceData = () => {
  return axiosInstance.get('/services');
}
export const serviceDataById = (serviceId) => {
  return axiosInstance.get(`/services/${serviceId}`);
}
export const deleteService = (serviceId) => {
  return axiosInstance.delete(`/services/${serviceId}`)
}
export const updateService = (serviceId, serviceData) => {
  return axiosInstance.put(`/services/${serviceId}`, serviceData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const addService = (serviceData) => {
  return axiosInstance.post('/services', serviceData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// CreateRoom endpoints
export const getAllRooms = () => {
  return axiosInstance.get('/room');
}

export const deleteRoom = (roomId) => {
  return axiosInstance.delete(`/room/${roomId}`)
};
export const updateRoom = (roomId, roomData) => {
  return axiosInstance.put(`/room/${roomId}`, roomData);
};
export const addRoom = (roomData) => {
  return axiosInstance.post('/room', roomData);
};

//AllRoom endpoints
export const getAllRoom = () => {
  return axiosInstance.get('/room')
};

export const getAllRoomsNotAllData = (filters) => {
  return axiosInstance.get(`/room/get/allRoomsNotAllData?search=${filters.searchQuery}&page=${filters.page}&limit=${filters.limit}`)
  
};
export const getRoomById = (roomId) => {
  return axiosInstance.get(`/room/${roomId}`)
};
export const toggleActive = (roomId) => {
  return axiosInstance.patch(`/room/${roomId}/toggle-active`)
};

export const deleteRoomById = (roomId) => {
  return axiosInstance.delete(`/room/${roomId}`)
};

//UpdateRoom endpoits
export const updateRoomById = (roomId, roomData) => {
  return axiosInstance.put(`/room/${roomId}`, roomData);
};

//UpdateRoomPricing endpoints
export const updateRoomPricing = (roomId, roomPricingData) => {
  return axiosInstance.patch(`/room/changePricing/${roomId}`, roomPricingData);
};

export const getRoomPrice = (roomId) => {
  return axiosInstance.get(`/room/get/roomPrices/${roomId}`)
}

//UpdateMainImage
export const updateMainImage = async (roomId, image) => {
  console.log(roomId)
  return axiosInstance.patch(`/room/changeMainImage/${roomId}`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

//delete single room image
export const deleteSingleRoomImage = async (image) => {
  console.log(`/room/roomImage/${image}`)
  return axiosInstance.delete(`/room/roomImage/${image}`);
};


//add room image
export const addRoomImage = async (roomId, image) => {
  return axiosInstance.post(`/room/addRoomImage/${roomId}`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// get roomtype image
export const getRoomTypeImage = async (roomId) => {
  return axiosInstance.get(`/room/get/RoomTypeImage/${roomId}`);
};

//special price
export const addSpecialPrice = async (priceData) => {
  console.log(priceData)
  return axiosInstance.post(`/room/addSpecialPrice`, priceData);
};

//get all special price by room id
export const getAllSpecialPriceById = async (roomId) => {
  return axiosInstance.get(`/room/get/specialPrice/${roomId}`);
};

//update special price
export const updateSpecialPrice = async (specialPriceId, specialPriceData) => {
  console.log(specialPriceId, specialPriceData)
  return axiosInstance.put(`/room/changeSpecialPrice/${specialPriceId}`, specialPriceData);
};
//get all special price
export const getAllSpecialPrice = async () => {
  return axiosInstance.get(`/room/get/allSpecialPrice`);
  };

