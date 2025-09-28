import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CvAdapterPage } from '@features/cv/pages/CvAdapterPage';
import { AppLayout } from '@shared/components/Layout/AppLayout';
import { HomePage } from '@pages/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <CvAdapterPage /> },
      { path: 'home', element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;