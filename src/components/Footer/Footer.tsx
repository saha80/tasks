import { FC } from 'react';

import { GoMarkGithub } from 'react-icons/go/index';

import styles from './Footer.module.css';

export const Footer: FC = () => (
  <footer className={`${styles.footer} footer`}>
    <a className={styles.githubLink} href="https://github.com/saha80/tasks">
      <GoMarkGithub className={styles.githubIcon} />
      GitHub
    </a>
  </footer>
);
