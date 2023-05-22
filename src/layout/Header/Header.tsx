import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import UserMenu from "@/components/UserMenu/UserMenu";
import LoginMenu from "@/components/LoginMenu/LoginMenu";

const Header = (): JSX.Element => (
  <header>
    <Link href="/">Logo</Link>
    <SearchBar />
    
    <UserMenu />
    <LoginMenu />
  </header>
);

export default Header;