import { fireEvent, render, screen } from '@testing-library/react';

import { CardFormPage } from '@/pages/CardFormPage/CardFormPage';

describe('CardFormPage', () => {
  test('renders', async () => {
    render(<CardFormPage />);

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
    render(<CardFormPage />);

    const fileUpload = await screen.findByText('Upload image file:');
    fireEvent.click(fileUpload);
  });
});
