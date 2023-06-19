'use client';

import { IconAt } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './emailButton.module.scss';

const EmailButton = ({ email, mail }: { email: string; mail: string | undefined }): JSX.Element => {
  const [tooltipText, setTooltipText] = useState('Copy email');

  const copyEmail = (): void => {
    navigator.clipboard.writeText(mail || email);
    setTooltipText('Email is copied');
  };

  const outFunc = (): void => {
    setTooltipText('Copy email');
  };

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipText} id="myTooltip">
        {tooltipText}
      </span>
      <IconAt size="1.8rem" strokeWidth="1.2" onClick={copyEmail} onMouseLeave={outFunc} />
    </div>
  );
};

export default EmailButton;
