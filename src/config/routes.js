import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';
import InvoicePage from '../pages/Invoice/InvoicePage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invoice/:id",
    element: (
      <ProtectedRoute>
        <InvoicePage />
      </ProtectedRoute>
    ),
  },
]);

export default router;