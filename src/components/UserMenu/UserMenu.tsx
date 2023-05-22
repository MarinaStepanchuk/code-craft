import Link from "next/link";

const UserMenu = ():JSX.Element => (
  <div>
    <Link href="/write">Write</Link>
    <div>Profile</div>
  </div>
);

export default UserMenu;