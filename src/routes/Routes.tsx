import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { App } from '@/app/App';
import { PageNotFound } from '@/pages/PageNotFound/PageNotFound';

export const ROOT_PATH = '/';

export type RouteObjectPathRequired = RouteObject &
  Required<Pick<RouteObject, 'path'>>;

const Home = lazy(() => import('@/pages/Home/Home'));
const CardFormPage = lazy(() => import('@/pages/CardFormPage/CardFormPage'));
const AboutUs = lazy(() => import('@/pages/AboutUs/AboutUs'));

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
