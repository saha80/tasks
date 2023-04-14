import { FC, useCallback, useRef, useState } from 'react';
import {
  CardDetails,
  Dialog,
  FetchingError,
  FetchingProgress,
} from '@/components';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogTitle } from '@/components/Dialog/DialogTitle';
import { useLazyGetCardById } from '@/features/unsplash.servise';

import { CardList } from './CardList';

export const CardListDetails: FC = () => {
  const [open, setOpen] = useState(false); // todo: move to redux slice?

  const [trigger, { isError, isFetching, currentData }] = useLazyGetCardById();

  const action = useRef<ReturnType<typeof trigger> | null>(null);

  const onCardClick = useCallback(
    (id: string) => {
      setOpen(true);
      action.current = trigger(id);
    },
    [trigger]
  );

  const onDialogClose = useCallback(() => {
    setOpen(false);
    action.current?.abort();
  }, []);

  return (
    <>
      <CardList onCardClick={onCardClick} />
      <Dialog open={open} onClose={onDialogClose}>
        <DialogTitle>
          {isError
            ? "Couldn't load card details"
            : isFetching || !currentData
            ? 'Progressing...'
            : currentData.description}
        </DialogTitle>
        <DialogContent>
          {isError ? (
            <FetchingError />
          ) : isFetching || !currentData ? (
            <FetchingProgress label="Please, wait a bit while loading..." />
          ) : (
            <CardDetails {...currentData} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
