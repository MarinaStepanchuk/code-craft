import Image from 'next/image';
import errorPhoto from '@/assets/404page.png';
import styles from './not-found.module.scss';

const NotFoundPage = (): JSX.Element => (
  <div className={styles.errorPage}>
    <div className={styles.message}>
      <p>Ooops...</p>
      <p>Page not found</p>
      <p>
        The page you are looking for doesn’t exist or an other error occurred, go back to home page.
      </p>
      <a href="/" className={styles.backButton}>
        Go Back
      </a>
    </div>
    <div className={styles.containerImage}>
      <Image
        src={errorPhoto}
        alt="error page"
        className={styles.imgBanner}
        fill={true}
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>
);
export default NotFoundPage;
