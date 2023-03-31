import { FC } from 'react';

import styles from './FetchingSpinner.module.css';

export const FetchingSpinner: FC = () => (
  <div>
    <span className={`${styles.spinner} material-icons`}>rotate_right</span>
    Loading
  </div>
);
