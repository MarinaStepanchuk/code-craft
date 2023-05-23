import User from '@/components/User/User';
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import styles from './profile.module.scss';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: '[user] of Code Craft',
};

const Profile = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect('/signin')
  }

  return (
  <main>
    <h1 className={styles.title}>Profile</h1>
    <User />
  </main>
)
  }

export default Profile;
