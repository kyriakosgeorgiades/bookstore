import { createContext } from "react";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (state: boolean) => {},
});

export default LoadingContext;
