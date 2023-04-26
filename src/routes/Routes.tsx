import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { PageNotFound } from '@/pages/PageNotFound/PageNotFound';
import { AboutUs } from '@/pages/AboutUs/AboutUs';
import { Home } from '@/pages/Home/Home';
import { CardFormPage } from '@/pages/CardFormPage/CardFormPage';
import { App } from '@/App';

export const ROOT_PATH = '/';

export type RouteObjectPathRequired = RouteObject &
  Required<Pick<RouteObject, 'path'>>;

export const ROOT_CHILDREN: RouteObjectPathRequired[] = [
  {
    path: ROOT_PATH,
    index: true,
    element: <Home />,
  },
  {
    path: '/card-form',
    element: <CardFormPage />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
];

export const routeObject: RouteObject[] = [
  {
    path: ROOT_PATH,
    children: ROOT_CHILDREN,
    errorElement: <PageNotFound />,
    element: <App />,
  },
];

export const router = createBrowserRouter(routeObject);
