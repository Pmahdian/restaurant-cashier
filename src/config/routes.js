import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import DashboardLayout from '../pages/Dashboard';
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
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "menu",
        element: <div>صفحه منو</div>
      },
      {
        path: "orders",
        element: <div>صفحه سفارشات</div>
      }
    ]
  }
]);

export default router;