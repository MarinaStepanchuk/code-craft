import Link from 'next/link';
import SearchBar from '@/components/SearchBar/SearchBar';
import UserMenu from '@/components/Navigation/UserMenu/UserMenu';
import LoginMenu from '@/components/Navigation/LoginMenu/LoginMenu';
import Image from 'next/image';
import { Session } from 'next-auth';
import logo from '../../assets/logo.svg';
import styles from './header.module.scss';

const Header = ({ session }: { session: Session | null }): JSX.Element => (
  <header className={styles.header}>
    <div className={styles.containerLogo}>
      <Link href="/" className={styles.logo}>
        <Image width={50} height={50} src={logo} alt="logo" />
        <p>Code Craft</p>
      </Link>
      <SearchBar />
    </div>
    <div>{session?.user ? <UserMenu session={session} /> : <LoginMenu />}</div>
  </header>
);

export default Header;
