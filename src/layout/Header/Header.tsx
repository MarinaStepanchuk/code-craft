'use client'

import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import UserMenu from "@/components/UserMenu/UserMenu";
import LoginMenu from "@/components/LoginMenu/LoginMenu";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import logo from '../../assets/logo.svg';
import styles from './header.module.scss';

const Header = (): JSX.Element => { 
  const { data: session } = useSession();

  return (
    <header>
      <div className={styles.containerLogo}>
        <Link href="/" className={styles.logo}>
          <Image width={70} height={70} src={logo} alt='logo' />
          <p>Code Craft</p>
        </Link>
        <SearchBar />
      </div>
      <div>
        {
          session?.user ? <UserMenu /> : <LoginMenu />
        }
      </div>
    </header>
  )
};

export default Header;