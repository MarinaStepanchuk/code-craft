import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import SettingsBlock from '@/components/Profile/SettingsBlock/SettingsBlock';
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
  <>
    <h2 className={styles.title}>Settings</h2>
    <SettingsBlock />
  </>
)
  }

export default Profile;
