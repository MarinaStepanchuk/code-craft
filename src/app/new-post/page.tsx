import PostCreator from "@/components/PostEditor/PostCreator/PostCreator";
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import styles from './page.module.scss';
import { authOptions } from '../api/auth/[...nextauth]/route';

const NewPost = async ():Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect('/signin')
  }

  return (
    <div className={styles.pageContainer}>
      <PostCreator />
    </div>
  )
}

export default NewPost;