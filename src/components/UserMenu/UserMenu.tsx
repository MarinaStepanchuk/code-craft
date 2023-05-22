import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserMenu = ():JSX.Element => {
  const { data: session } = useSession();

  // console.log(session)

  return (
    <div>
      <Link href="/new-post">Write</Link>
      <div>Profile</div>
      <button onClick={():Promise<undefined> => signOut()}>SignOut</button>
      <p>{session?.user?.email}</p>
    </div>
  )
};

export default UserMenu;