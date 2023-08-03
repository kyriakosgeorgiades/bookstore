import { ToastContainer } from 'react-toastify';
import './App.css';
import { AuthProvider } from './Providers/AuthContext';

import LandingPage from './pages/LandingPage';
import { useState } from 'react';
import LoadingContext from './Context/loadingContext';
import LoadingSpinner from './assets/LoadingSpinner/LoadingSpinner';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div>
      <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {isLoading && <LoadingSpinner />}
    <ToastContainer />
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
    </LoadingContext.Provider>
    </div>
  );
};

export default App;
