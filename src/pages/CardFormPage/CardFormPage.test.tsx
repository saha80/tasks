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

    screen.debug();
  });
});
