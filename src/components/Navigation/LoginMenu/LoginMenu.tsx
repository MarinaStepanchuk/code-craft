'use client';

import { signIn } from 'next-auth/react';
import styles from './loginMenu.module.scss';

const LoginMenu = (): JSX.Element => (
  <button className={styles.signIn} onClick={(): Promise<undefined> => signIn()}>
    Sign In
  </button>
);

export default LoginMenu;
