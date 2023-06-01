import { Dispatch, SetStateAction, useEffect } from "react";
import styles from './snackBar.module.scss';

type SnackBarType = 'alert' | 'message' | 'warning' | 'successfully';

interface ISnackBarProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  timer?: number;
  type?: SnackBarType;
  children: React.ReactNode
}

const SnackBar = ({ active, setActive, timer = 2000, type = 'message', children }: ISnackBarProps): JSX.Element => {
  let color = ''
  switch (type) {
    case 'alert': 
      color = '#dc3d21';
      break;
    case 'warning': 
      color = '#df8b00';
      break;
    case 'successfully': 
      color = '#55a12c';
      break;
    default:
      color = '#05386B';
      break;
  }

  useEffect(() => {
    setTimeout(() => {
      setActive(false);
    }, timer)
  })

  return (
    <div className={active ? `${styles.snackBar} ${styles.active}` : styles.snackBar} style={{backgroundColor: `${color}`}}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default SnackBar;