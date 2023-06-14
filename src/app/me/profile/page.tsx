import SettingsNavigation from '@/components/Profile/SettingsNavigation/SettingsNavigation';
import styles from './page.module.scss';

export const metadata = {
  title: '[user] of Code Craft',
};

const Profile = async (): Promise<JSX.Element> => (
  <>
    <h2 className={styles.title}>Settings</h2>
    <SettingsNavigation />
  </>
);

export default Profile;
