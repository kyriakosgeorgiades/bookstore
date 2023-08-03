import { BookResponseDto } from "../Dto/Books/Response/GetBookResponse";
import { ApiEndpoints } from "../endpoints/api-endpoints";
import { createAPI } from "./api";

export const getBooksSearch = (
  searchTerm: string | null,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.get<BookResponseDto>(
    `${ApiEndpoints.BOOKS.GET_SEARCH}?searchTerm=${searchTerm}`
  );
};
