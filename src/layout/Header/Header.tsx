'use client'

import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import UserMenu from "@/components/UserMenu/UserMenu";
import LoginMenu from "@/components/LoginMenu/LoginMenu";
import { useSession } from "next-auth/react";

const Header = (): JSX.Element => { 
  const { data: session } = useSession();

  return (
    <header>
      <Link href="/">Logo</Link>
      <SearchBar />
      <div>
        {
          session?.user ? <UserMenu /> : <LoginMenu />
        }
      </div>
    </header>
  )
};

export default Header;