import { Component } from 'react';

import { FetchingSpinner } from '@/components/FetchingSpinner/FetchingSpinner';
import { FetchingError } from '@/components/FetchingError/FetchingError';

export const withService = <
  Props extends object,
  Service,
  ServiceToProps extends keyof Props
>(
  Wrapped: React.ComponentType<Props>,
  service: () => Promise<Service>,
  mapServiceToProps: (service: Service) => Pick<Props, ServiceToProps>
) => {
  type ServiceWrapperState = {
    loading: boolean;
    error: boolean;
    service: Service | undefined;
  };

  return class ServiceWrapper extends Component<
    Omit<Props, ServiceToProps>,
    ServiceWrapperState
  > {
    state: ServiceWrapperState = {
      service: undefined,
      loading: true,
      error: false,
    };

    async componentDidMount() {
      try {
        this.setState({ service: await service() });
      } catch (_) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }

    render() {
      const { loading, error, service } = this.state;

      if (loading) {
        return <FetchingSpinner />;
      }

      if (error) {
        return <FetchingError />;
      }

      const props = {
        ...this.props,
        ...mapServiceToProps(service as Service),
      } as Props;

      return <Wrapped {...props} />;
    }
  };
};
