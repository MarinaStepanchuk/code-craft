import ProfileNavigation from '@/components/Profile/ProfileNavigation/ProfileNavigation';
import { Metadata } from 'next';
import { rootMetadata } from '@/constants/common.constants';
import styles from './page.module.scss';

export const metadata: Metadata = { ...rootMetadata, title: 'My Profile' };

const Profile = async (): Promise<JSX.Element> => (
  <>
    <h2 className={styles.title}>Settings</h2>
    <ProfileNavigation />
  </>
);

export default Profile;
