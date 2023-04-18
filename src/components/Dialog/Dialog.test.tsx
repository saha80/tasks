import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { Dialog } from './Dialog';
import { DialogTitle } from './DialogTitle';
import { DialogContent } from './DialogContent';

describe('Dialog', () => {
  test('renders', () => {
    const onClose = vi.fn();

    const { getByText, getByRole } = render(
      <Dialog open onClose={onClose}>
        <DialogTitle>Title</DialogTitle>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Content')).toBeInTheDocument();

    fireEvent.click(getByRole('button'));

    expect(onClose).toBeCalledTimes(1);
  });
});
