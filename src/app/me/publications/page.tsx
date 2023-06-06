import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Patch } from '@/constants/common.constants';
import PublicationsNavigation from '@/components/Publications/PostsNavigation/PublicationsNavigation';
import styles from './page.module.scss';

const Publications = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(Patch.signIn);
  }

  return (
    <>
      <h2 className={styles.title}>My posts</h2>
      <PublicationsNavigation />
    </>
  );
};

export default Publications;
