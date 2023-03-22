import { ComponentType } from 'react';
import { Location, useLocation } from 'react-router-dom';

export interface WithRouterProps {
  location: Location;
}

export const withRouter = <Props extends WithRouterProps>(Component: ComponentType<Props>) => {
  return (props: Props) => {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };
};
