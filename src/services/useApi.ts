// useApi.ts
import { useContext } from "react";
import LoadingContext from "../Context/loadingContext";
import { createAPI } from "./api";

const useApi = () => {
  const { setLoading } = useContext(LoadingContext);
  const apiClient = createAPI(setLoading);

  return apiClient;
};

export default useApi;
