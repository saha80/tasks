import { ComponentType } from 'react';
import { Location, useLocation } from 'react-router-dom';

export interface WithRouterProps {
  location: Location;
}

export const withRouter = <Props extends WithRouterProps>(
  Wrapped: ComponentType<Props>
) => {
  return (wrappedProps: Omit<Props, keyof WithRouterProps>) => {
    const location = useLocation();
    const props = { ...wrappedProps, location } as Props;
    return <Wrapped {...props} />;
  };
};
