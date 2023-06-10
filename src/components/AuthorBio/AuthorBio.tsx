import { IUser } from '@/types/interfaces';
import styles from './authorBio.module.scss';

const AuthorBio = ({ user }: { user: IUser }): JSX.Element => {
  const a = 1;
  return (
    <section>
      <p>{user.email}</p>
    </section>
  );
};

export default AuthorBio;
