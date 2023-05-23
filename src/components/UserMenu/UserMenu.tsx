import { signOut } from "next-auth/react";
import Link from "next/link";
import styles from './userMenu.module.scss';

const UserMenu = ():JSX.Element => (
    <div className={styles.container}>
      <Link href="/new-post">Write</Link>
      <div>Profile</div>
      <button className={styles.signOut} onClick={():Promise<undefined> => signOut()}>SignOut</button>
    </div>
);

export default UserMenu;