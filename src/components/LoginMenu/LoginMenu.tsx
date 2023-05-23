import { signIn } from "next-auth/react";
import styles from "./loginMenu.module.scss";

const LoginMenu = ():JSX.Element => (
  <div>
    <button className={styles.signIn} onClick={():Promise<undefined> => signIn()}>SignIn
    </button>
  </div>
);

export default LoginMenu;