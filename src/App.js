import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth.';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}