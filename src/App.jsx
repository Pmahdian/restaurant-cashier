import { RouterProvider } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import router from './config/routes';
import LoadingSpinner from './components/UI/LoadingSpinner';
import './assets/styles/main.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
        <p>در حال بارگذاری سیستم...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;