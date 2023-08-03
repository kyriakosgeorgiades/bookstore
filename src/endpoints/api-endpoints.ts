import { environment } from "../enviroment/enviorment";

const BASE_API_URL = environment.apiUrl;

export const ApiEndpoints = {
  USER: {
    REGISTER: `${BASE_API_URL}/Users/Register`,
    LOGIN: `${BASE_API_URL}/Users/Login`,
  },
  BOOKS: {
    GET_SEARCH: `${BASE_API_URL}/Books`,
    SAVE: `${BASE_API_URL}/Books/Book`,
    SINGLE: (bookId: string) => `${BASE_API_URL}/Books/Book/${bookId}`,
    DELETE: (bookId: string) => `${BASE_API_URL}/Books/Book/${bookId}`,
  },
};
