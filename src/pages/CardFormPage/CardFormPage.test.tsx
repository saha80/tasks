import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { CardFormPage } from '@/pages/CardFormPage/CardFormPage';
import { store } from '@/app/store';

// todo add more cases for cardForm on validation
describe('CardFormPage', () => {
  test('renders', async () => {
    render(
      <Provider store={store}>
        <CardFormPage />
      </Provider>
    );

    const submit = await screen.findByText('Submit');

    expect(submit.innerHTML).toEqual('Submit');

    fireEvent.submit(submit);

    const partialFailureText = 'Examples: John Doe, Jane Doe.';

    const [failure] = await screen.findAllByText(partialFailureText, {
      exact: false,
    });

    expect(failure.innerHTML).toContain(partialFailureText);
  });

  test('file upload', async () => {
    render(
      <Provider store={store}>
        <CardFormPage />
      </Provider>
    );

    const fileUpload = await screen.findByText('Upload image file:');
    fireEvent.click(fileUpload);

    // todo check the file object
  });
});
