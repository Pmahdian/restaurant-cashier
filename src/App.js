import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import POSPage from './pages/POSPage';
import LoginPage from './pages/LoginPage';
import ReportsPage from './pages/ReportsPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute><POSPage /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;