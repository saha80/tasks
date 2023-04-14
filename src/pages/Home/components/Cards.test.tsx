import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';

import { Cards } from './Cards';

describe('Cards with service', () => {
  test('renders', () => {
    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
