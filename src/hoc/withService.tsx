import { FC, useEffect, useState } from 'react';

import { FetchingSpinner } from '@/components/FetchingSpinner/FetchingSpinner';
import { FetchingError } from '@/components/FetchingError/FetchingError';

export const withService = <
  Props extends object,
  Service,
  ServiceToProps extends keyof Props
>(
  Wrapped: React.ComponentType<Props>,
  serviceCall: () => Promise<Service>,
  mapServiceToProps: (service: Service) => Pick<Props, ServiceToProps>
) => {
  type ServiceWrapperProps = Omit<Props, ServiceToProps>;

  const ServiceWrapper: FC<ServiceWrapperProps> = (serviceWrapperProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [service, setService] = useState<Service | undefined>(undefined);

    useEffect(() => {
      serviceCall()
        .then(setService)
        .catch(setError)
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
      return <FetchingSpinner />;
    }

    if (error) {
      return <FetchingError />;
    }

    const props = {
      ...serviceWrapperProps,
      ...mapServiceToProps(service as Service),
    } as Props;

    return <Wrapped {...props} />;
  };

  return ServiceWrapper;
};
