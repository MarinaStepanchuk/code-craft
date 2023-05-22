import { signIn } from "next-auth/react";

const LoginMenu = ():JSX.Element => (
  <div>
    <button onClick={():Promise<undefined> => signIn()}>SignIn
    </button>
  </div>
);

export default LoginMenu;