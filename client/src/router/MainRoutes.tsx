import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import ProtectedRoutes from '@/utils/ProtectedRoutes'
import RegistrationForm from '@/components/Forms/RegistrationForm/RegistrationForm'
import LoginForm from '@/components/Forms/LoginForm/LoginForm'

//==========|| lazy loading ||==========//
const Dashboard = lazy(() => import('@/pages/App/Dashboard'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/register',
    element: <RegistrationForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
])

export default router
