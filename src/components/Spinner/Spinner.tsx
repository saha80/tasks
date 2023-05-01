import { type FC } from 'react';
import { BiLoaderCircle } from 'react-icons/bi/index';

import styles from './Spinner.module.css';

export const Spinner: FC = () => {
  return <BiLoaderCircle className={styles.spinner} />;
};
