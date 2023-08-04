import { BookSaveRequestDto } from "../Dto/Books/Request/BookSaveRequestDto";
import { BookResponseDto } from "../Dto/Books/Response/GetBookResponse";
import { ApiEndpoints } from "../endpoints/api-endpoints";
import { createAPI } from "./interceptor-http";

export const getBooksSearch = (
  searchTerm: string | null,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient
    .get<BookResponseDto>(
      `${ApiEndpoints.BOOKS.GET_SEARCH}?searchTerm=${searchTerm}`
    )
    .catch((error) => {
      console.error("Get books error:", error);
      throw error;
    });
};

export const saveBook = async (
  book: BookSaveRequestDto,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.post(`${ApiEndpoints.BOOKS.SAVE}`, book).catch((error) => {
    console.error("Save book error:", error);
    throw error;
  });
};

export const deleteBook = async (
  bookId: string,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient
    .delete(`${ApiEndpoints.BOOKS.DELETE(bookId)}`)
    .catch((error) => {
      console.error("Delete book error:", error);
      throw error;
    });
};
