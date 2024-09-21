import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/MainRoutes.tsx';
import AccountProvider from './context/AccountProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  </>
);
