import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SettingsNavigation from '@/components/Profile/SettingsNavigation/SettingsNavigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Patch } from '@/constants/common.constants';
import styles from './page.module.scss';

export const metadata = {
  title: '[user] of Code Craft',
};

const Profile = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(Patch.signIn);
  }

  return (
    <>
      <h2 className={styles.title}>Settings</h2>
      <SettingsNavigation />
    </>
  );
};

export default Profile;
