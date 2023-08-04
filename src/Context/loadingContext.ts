import { createContext } from "react";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (state: boolean) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

export default LoadingContext;
