import { type FC } from 'react';

import { MdOutlineVisibility, MdThumbUp } from 'react-icons/md/index';

import { type CardDetails as BaseCardDetails } from '@/interfaces/Card';

import styles from './CardDetails.module.css';

export type CardDetailsProps = BaseCardDetails;

export const CardDetails: FC<CardDetailsProps> = ({
  imgSrc,
  imgAlt,
  createdBy,
  createdByURL,
  creationTimestamp,
  modificationTimestamp,
  likes,
  collections,
  tags,
  publicDomain,
  location,
  views,
}) => {
  const makeLinks = (links: string[]) =>
    links.map((link) => (
      <a key={link} className={styles.link}>
        {link}
      </a>
    ));

  return (
    <div className={styles.twoSideContainer}>
      <img src={imgSrc} alt={imgAlt} className={styles.image} />
      <div>
        <div>
          <p>
            Created by: <a href={createdByURL}>{createdBy}</a>
          </p>
          <p>Created at: {new Date(creationTimestamp).toLocaleString()}</p>
          {!Object.is(creationTimestamp, modificationTimestamp) && (
            <p>
              Modified at: {new Date(modificationTimestamp).toLocaleString()}
            </p>
          )}
        </div>
        {publicDomain ? (
          <p>
            This photo shared on Unsplash with a similar license to the Public
            Domain.
          </p>
        ) : null}
        <p>
          {location?.country
            ? `Country: ${location.country}`
            : 'No location provided.'}
        </p>
        <p>
          <span>Appeared in these collections:</span>
          {makeLinks(collections)}
        </p>
        <p>
          <span>Tags:</span>
          {makeLinks(tags)}
        </p>
        <div>
          <span className={styles.icon}>
            <MdThumbUp />
            {likes}
          </span>
          <span className={styles.icon}>
            <MdOutlineVisibility />
            {views}
          </span>
        </div>
      </div>
    </div>
  );
};
