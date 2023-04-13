import { FC } from 'react';

import styles from './PageNotFound.module.css';

export const PageNotFound: FC = () => (
  <div className={styles.pageNotFound}>
    <h1>404 Page Not Found</h1>
    <a href="/">Go to Home</a>
  </div>
);
