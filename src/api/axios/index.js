import axios from "axios";
import { store } from '../../app/store';
import { toast } from "react-toastify";


const axiosInstance = axios.create({
  baseURL: 'https://qasr-alnakheel.onrender.com/api',
  //baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const language = state.language.lang || "en";

  config.headers["accept-language"] = language;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || `Error ${status}: Something went wrong`;

      if (status >= 400 && status < 500) {
        if (message !== "Token not found") {
          const message = error.response.data.message || `Error ${status}: Something went wrong`;
          toast.error(message);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
      toast.error("No response from server. Please check your connection.");
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
