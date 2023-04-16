import { FC, useCallback, useRef, useState } from 'react';
import { CardService } from '@/interfaces/CardService';
import { CardListWithServiceProps } from './cardListWithService';
import { CardDetails as CardDetailsType } from '@/interfaces/Card';
import {
  CardDetails,
  Dialog,
  FetchingError,
  FetchingProgress,
} from '@/components';
import { DialogContent } from '@/components/Dialog/DialogContent';
import { DialogTitle } from '@/components/Dialog/DialogTitle';

export const cardListDetailsWithService = (
  CardList: React.ComponentType<CardListWithServiceProps>,
  cardService: CardService
) => {
  const CardListDetails: FC = () => {
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [cardDetails, setCardDetails] = useState<CardDetailsType | undefined>(
      undefined
    );

    const abortController = useRef(new AbortController());

    const onCardClick = useCallback((id: string) => {
      setOpen(true);
      setLoading(true);
      cardService
        .getCardById(abortController.current.signal, id)
        .then(setCardDetails)
        .catch((err: Error) => {
          if (err instanceof DOMException && err.name === 'AbortError') {
            abortController.current = new AbortController();
            return;
          }
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    const onDialogClose = useCallback(() => {
      if (loading || !cardDetails) {
        abortController.current.abort();
        abortController.current = new AbortController();
      }
      setCardDetails(undefined);
      setOpen(false);
    }, [cardDetails, loading]);

    return (
      <>
        <CardList onCardClick={onCardClick} />
        <Dialog open={open} onClose={onDialogClose}>
          <DialogTitle>
            {error
              ? "Couldn't load card details"
              : loading || !cardDetails
              ? 'Progressing...'
              : cardDetails.description}
          </DialogTitle>
          <DialogContent>
            {error ? (
              <FetchingError />
            ) : loading || !cardDetails ? (
              <FetchingProgress label="Please, wait a bit while loading..." />
            ) : (
              <CardDetails {...cardDetails} />
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return CardListDetails;
};
