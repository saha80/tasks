import { type FC, useCallback, useRef, useState } from 'react';

import { CardDetails } from '@/components/CardDetails/CardDetails';
import { Dialog } from '@/components/Dialog/Dialog';
import { Error } from '@/components/Error/Error';
import { Progress } from '@/components/Progress/Progress';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogTitle } from '@/components/Dialog/DialogTitle';
import { useLazyGetCardById } from '@/services/unsplash.service';

import { CardList } from './CardList';

export const CardListDetails: FC = () => {
  const [open, setOpen] = useState(false);

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
            <Error />
          ) : isFetching || !currentData ? (
            <Progress message="Please, wait a bit while loading..." />
          ) : (
            <CardDetails {...currentData} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
