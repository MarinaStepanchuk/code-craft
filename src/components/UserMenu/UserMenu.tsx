import { signOut } from "next-auth/react";
import Link from "next/link";

const UserMenu = ():JSX.Element => (
    <div>
      <Link href="/new-post">Write</Link>
      <div>Profile</div>
      <button onClick={():Promise<undefined> => signOut()}>SignOut</button>
    </div>
  );

export default UserMenu;