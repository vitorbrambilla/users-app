import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:3000",
});

export const api = {
  get: <T>(url: string, parameters: object) =>
    axiosInstance.get<T>(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      ...parameters,
    }),
  post: <T>(url: string, data: any) =>
    axiosInstance.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }),
  patch: <T>(url: string, data: any) =>
    axiosInstance.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }),
  put: <T>(url: string, data: any) =>
    axiosInstance.put<T>(url, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }),
  delete: <T>(url: string) =>
    axiosInstance.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }),
};
