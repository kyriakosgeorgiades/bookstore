import axios from "axios";
import { environment } from "../enviroment/enviorment";
import { showToast } from "../helpers/toastHelper";
import { SetStateAction } from "react";

const BASE_API_URL = environment.apiUrl;
type WhiteListedEndpoint = {
  url: string;
  method: string;
};

const DEFAULT_WHITE_LISTED_ENDPOINTS: WhiteListedEndpoint[] = [
  {
    url: "/Books/Book",
    method: "GET",
  },
  { url: "/Users/Register", method: "POST" },
  { url: "/Users/Login", method: "POST" },
];
export const createAPI = (
  setLoading: (value: boolean) => void,
  whiteListedEndpoints: WhiteListedEndpoint[] = DEFAULT_WHITE_LISTED_ENDPOINTS
) => {
  const httpClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  httpClient.interceptors.request.use(
    (config) => {
      setLoading(true);

      const isWhiteListed = whiteListedEndpoints.some(
        (endpoint) =>
          endpoint.url === config.url &&
          endpoint.method === config.method?.toUpperCase()
      );

      if (!isWhiteListed) {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      showToast(
        error.response?.data?.message || "An unknown error occurred",
        "error"
      );
      return Promise.reject(error);
    }
  );

  return httpClient;
};
