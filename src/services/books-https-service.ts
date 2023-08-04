import { BookSaveRequestDto } from "../Dto/Books/Request/BookSaveRequestDto";
import { BookResponseDto } from "../Dto/Books/Response/GetBookResponse";
import { ApiEndpoints } from "../endpoints/api-endpoints";
import { createAPI } from "./interceptor-http";

export const getBooksSearch = (
  searchTerm: string | null,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.get<BookResponseDto>(
    `${ApiEndpoints.BOOKS.GET_SEARCH}?searchTerm=${searchTerm}`
  );
};

export const saveBook = async (
  book: BookSaveRequestDto,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return await apiClient.post(`${ApiEndpoints.BOOKS.SAVE}`, book);
};

export const deleteBook = async (
  bookId: string,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return await apiClient.delete(`${ApiEndpoints.BOOKS.DELETE(bookId)}`);
};
