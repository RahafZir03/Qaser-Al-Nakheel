import axiosInstance from "../axios";

// employee endpoints
export const employeeData = () => {
  return axiosInstance.get('/employee');
}
//add employee
export const addEmployee = (data) => {
  console.log(data)
  return axiosInstance.post('/employee', data);
}


export const changeStatus = (id,data) => {
  console.log(data)
  axiosInstance.patch(`/employee/status/${id}`,data);
}
export const changeRole = (id, data) => {
  
  axiosInstance.patch(`/employee/jop/${id}`, data);
}
export const changeShift = (id, data) => {
  axiosInstance.patch(`/employee/shift/${id}`, data);
}

export const deleteEmployee = (id) => {
  return axiosInstance.delete(`/employee/${id}`);
}

//update employee
export const updateEmployee = (id, data) => {
  return axiosInstance.put(`/employee/${id}`, data);
}
//get employee by id
//export const getEmployeeById = (id) => {
// return axiosInstance.get(`/employee/getById/${id}`);
//}

