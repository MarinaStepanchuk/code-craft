'use client';

import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import { useSession } from 'next-auth/react';
import GreetingAnimation from './GreetingAnimation/GreetingAnimation';
import styles from './greetingSection.module.scss';

const GreetingSection = (): JSX.Element => {
  const { push } = useRouter();
  const { status } = useSession();
  const redirectToSiginPage = (): void => {
    if (status === 'unauthenticated') {
      push(Patch.signIn);
    } else {
      push(`/me${Patch.newPost}`);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 className={styles.title}>PROGRAM THE FUTURE</h2>
          <h2 className={styles.title}>WITH US</h2>
          <p className={styles.greeting}>
            Here you will find a wealth of knowledge and ideas about different programming
            languages.
          </p>
          <p className={styles.greeting}>
            Whether you are a beginner or an experienced programmer, our articles will help you stay
            on top of the latest trends and developments in the field.
          </p>
          <button onClick={redirectToSiginPage}>
            {status === 'unauthenticated' ? 'START READING' : 'START WRITING'}
          </button>
        </div>
      </div>
      <div className={styles.animationContainer}>
        <GreetingAnimation />
      </div>
    </section>
  );
};

export default GreetingSection;
