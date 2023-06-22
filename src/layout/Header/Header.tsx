import Link from 'next/link';
import SearchButton from '@/components/SearchButton/SearchButton';
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
        <div className={styles.logoImgWrapper}>
          <Image fill src={logo} alt="logo" />
        </div>
        <p>Code Craft</p>
      </Link>
      <SearchButton />
    </div>
    {session?.user ? <UserMenu session={session} /> : <LoginMenu />}
  </header>
);

export default Header;
