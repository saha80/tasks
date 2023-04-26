import { RouteObject } from 'react-router-dom';

import { App } from '@/app/App';
import { AboutUs, CardFormPage, Home, PageNotFound } from '@/pages';

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
