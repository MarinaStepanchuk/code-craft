import Image from 'next/image';
import AIIcon from '@/assets/assistent.svg';
import { useState } from 'react';
import { IChatAIMessage } from '@/types/interfaces';
import useOutsideClick from '@/hooks/useOutsideClick';
import { initialChatValue } from '@/constants/common.constants';
import styles from './AIAssistent.module.scss';
import Chat from './Chat/Chat';

const AIAssistant = (): JSX.Element => {
  const [chatHistory, setChatHistory] = useState<IChatAIMessage[]>(initialChatValue);
  const { ref, isActive, setIsActive } = useOutsideClick(false);

  const handleButtonClick = (): void => {
    setIsActive(true);
  };

  return (
    <div className={styles.assistantWrapper} onClick={handleButtonClick} ref={ref}>
      <div className={styles.tooltip}>
        <span className={styles.tooltipText} id="myTooltip">
          Hi, I`m ArtiBot! I can help you with your writing!
        </span>
        <Image
          src={AIIcon}
          alt={'assistant to improve the post'}
          className={styles.assistantIcon}
          fill
        />
      </div>
      {isActive && (
        <Chat setIsActive={setIsActive} chatHistory={chatHistory} setChatHistory={setChatHistory} />
      )}
    </div>
  );
};

export default AIAssistant;
