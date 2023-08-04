import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "./Providers/AuthContext";

import LandingPage from "./pages/LandingPage";
import { useState } from "react";
import LoadingContext from "./Context/loadingContext";
import LoadingSpinner from "./assets/LoadingSpinner/LoadingSpinner";
import { SearchProvider } from "./Providers/SearchContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
        {isLoading && <LoadingSpinner />}
        <ToastContainer />
        <AuthProvider>
          <SearchProvider>
            <LandingPage />
          </SearchProvider>
        </AuthProvider>
      </LoadingContext.Provider>
    </div>
  );
};
export default App;
