import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { PageNotFound } from '@/components/PageNotFound/PageNotFound';
import { AboutUs } from '@/components/AboutUs/AboutUs';
import { Cards } from '@/components/Cards/Cards';
import { App } from '@/App';

export const ROOT_PATH = '/';

export type RouteObjectPathRequired = RouteObject & Required<Pick<RouteObject, 'path'>>;

export const ROOT_CHILDREN: RouteObjectPathRequired[] = [
  {
    path: ROOT_PATH,
    index: true,
    element: <Cards />,
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
