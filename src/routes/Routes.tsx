import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { App } from '@/app/App';
import { CardFormPage } from '@/pages/CardFormPage/CardFormPage';
import { AboutUs } from '@/pages/AboutUs/AboutUs';
import { PageNotFound } from '@/pages/PageNotFound/PageNotFound';

export const ROOT_PATH = '/';

export type RouteObjectPathRequired = RouteObject &
  Required<Pick<RouteObject, 'path'>>;

const Home = lazy(() => import('@/pages/Home/Home'));

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
