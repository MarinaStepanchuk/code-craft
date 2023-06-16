import { IChatAIMessage } from '@/types/interfaces';
import Image from 'next/image';
import AIIcon from '@/assets/assistent.svg';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { IconSend, IconRefresh } from '@tabler/icons-react';
import styles from './chat.module.scss';
import { Textarea } from '@mantine/core';
import { montserrat } from '@/app/layout';
import { initialChatValue } from '@/constants/common.constants';

interface IChat {
  setIsActive: Dispatch<SetStateAction<boolean>>;
  chatHistory: IChatAIMessage[];
  setChatHistory: Dispatch<SetStateAction<IChatAIMessage[]>>;
}

const Chat = ({ setIsActive, chatHistory, setChatHistory }: IChat): JSX.Element => {
  const [message, setMessage] = useState('');

  const handleCloseChat = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsActive(false);
  };

  const handleClearChat = (): void => {
    setChatHistory(initialChatValue);
  };

  console.log(initialChatValue);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatHeader}>
        <div className={styles.assistantContainer}>
          <Image
            src={AIIcon}
            alt={'assistant to improve the post'}
            className={styles.assistantIcon}
            width={50}
            height={50}
          />
          <div className={styles.assistant}>
            <p>ArtiBot</p>
            <p>always online</p>
          </div>
          <IconRefresh
            size="3rem"
            strokeWidth="1.2"
            className={styles.button}
            onClick={handleClearChat}
          />
        </div>

        <div
          className={styles.closeChatButton}
          onClick={(e): void => {
            handleCloseChat(e);
          }}
        >
          <span className={styles.closeLine}></span>
          <span className={styles.closeLine}></span>
        </div>
      </div>
      <div className={styles.chat}>
        {chatHistory.map((item, index) => (
          <div
            className={item.role === 'assistant' ? styles.assistantMessage : styles.userMessage}
            key={index}
          >
            {item.role === 'assistant' && (
              <Image
                src={AIIcon}
                alt={'assistant to improve the post'}
                className={styles.assistantIcon}
                width={30}
                height={30}
              />
            )}
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        <Textarea
          placeholder="Message..."
          withAsterisk
          value={message}
          autosize
          onChange={(e): void => setMessage(e.target.value)}
          className={`${styles.messageContainer} ${montserrat.className}`}
        />
        <IconSend size="2.5rem" strokeWidth="1.2" className={styles.button} />
      </div>
    </div>
  );
};

export default Chat;
