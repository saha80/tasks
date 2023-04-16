import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './PageNotFound.module.css';

export const PageNotFound: FC = () => (
  <div className={styles.pageNotFound}>
    <h1 role="alert">404 Page Not Found</h1>
    <Link to="/">Go to Home</Link>
  </div>
);
