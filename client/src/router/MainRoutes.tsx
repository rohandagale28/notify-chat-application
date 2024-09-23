import App from '@/App';
import LoginForm from '@/components/LoginForm/LoginForm';
import { Request } from '@/components/PendingRequest/Request';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import Dashboard from '@/pages/Application/Dashboard';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'request',
        element: <Request />,
      },
    ],
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
