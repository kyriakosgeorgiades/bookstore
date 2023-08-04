import axios from "axios";
import { environment } from "../enviroment/enviorment";
import { showToast } from "../helpers/toastHelper";

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
        const token = localStorage.getItem("token");
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

      // Check if the error response is a 401 and handle it accordingly
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token"); // Remove expired or invalid token

        // Redirect to login or handle as necessary
        // For example, if you're using react-router you might do:
        // history.push('/login');

        showToast("Session expired. Please login again.", "error");
      } else {
        showToast(
          error.response?.data?.message || "An unknown error occurred",
          "error"
        );
      }

      return Promise.reject(error);
    }
  );

  return httpClient;
};
