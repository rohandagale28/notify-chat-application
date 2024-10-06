import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import ProtectedRoutes from '@/utils/ProtectedRoutes';

//==========|| lazy loading ||==========//
const Dashboard = lazy(() => import('@/pages/Application/Dashboard'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element:
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>,
  },
  {
    path: '/register',
    element: <RegistrationForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
]);

export default router;
