import styles from './aside.module.scss';

const Aside = (): JSX.Element => {
  const a = 1;
  return (
    <aside className={styles.aside}>
      <div>Recommendations</div>
    </aside>
  );
};

export default Aside;
