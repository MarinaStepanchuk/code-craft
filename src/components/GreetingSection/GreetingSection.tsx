import GreetingAnimation from './GreetingAnimation/GreetingAnimation';
import styles from './greetingSection.module.scss';

const GreetingSection = (): JSX.Element => (
  <section className={styles.section}>
    <div className={styles.content}>
      <div className={styles.text}>
        <h2 className={styles.title}>PROGRAM THE FUTURE</h2>
        <h2 className={styles.title}>WITH US</h2>
        <p className={styles.greeting}>
          Here you will find a wealth of knowledge and ideas about different programming languages.
        </p>
        <p className={styles.greeting}>
          Whether you are a beginner or an experienced programmer, our articles will help you stay
          on top of the latest trends and developments in the field.
        </p>
        <button>START READING</button>
      </div>
    </div>
    <div className={styles.animationContainer}>
      <GreetingAnimation />
    </div>
  </section>
);

export default GreetingSection;
