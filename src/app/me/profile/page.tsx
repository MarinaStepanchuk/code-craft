import ProfileNavigation from '@/components/Profile/ProfileNavigation/ProfileNavigation';
import styles from './page.module.scss';

export const metadata = {
  title: '[user] of Code Craft',
};

const Profile = async (): Promise<JSX.Element> => (
  <>
    <h2 className={styles.title}>Settings</h2>
    <ProfileNavigation />
  </>
);

export default Profile;
