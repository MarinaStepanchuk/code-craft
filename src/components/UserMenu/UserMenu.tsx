'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image';
import writeIcon from '@/assets/icon-write.svg';
import styles from './userMenu.module.scss';



const UserMenu = ():JSX.Element => (
    <div className={styles.container}>
      <Link href="/new-post">
        <Image src={writeIcon} width={50} height={50} alt="write new post button" />
        Write
      </Link>
      <div>Profile</div>
      <button className={styles.signOut} onClick={():Promise<undefined> => signOut()}>SignOut</button>
    </div>
  );

export default UserMenu;