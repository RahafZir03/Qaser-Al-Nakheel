import axiosInstance from "../axios";

export const dashboardData = () => {
  return axiosInstance.get('/general/');
}

export const aboutStatisticsData = () => {
  return axiosInstance.get('/general/about/statistics');
}