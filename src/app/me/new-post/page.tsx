import PostCreator from '@/components/PostEditor/PostCreator/PostCreator';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Patch } from '@/constants/common.constants';
import styles from './page.module.scss';

const NewPost = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(Patch.signIn);
  }

  return (
    <div className={styles.pageContainer}>
      <PostCreator />
    </div>
  );
};

export default NewPost;
