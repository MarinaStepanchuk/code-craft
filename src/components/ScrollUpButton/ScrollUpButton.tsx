import { IconChevronUp } from '@tabler/icons-react';
import styles from './scrollUpButton.module.scss';

const ScrollUpButton = ({ active }: { active: boolean }): JSX.Element => {
  const scroll = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`${styles.upButton} ${active ? styles.avtive : ''}`} onClick={scroll}>
      <IconChevronUp size={40} strokeWidth={2} color={'#fff'} />
    </div>
  );
};

export default ScrollUpButton;
