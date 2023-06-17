import { IChatAIMessage } from '@/types/interfaces';
import Image from 'next/image';
import AIIcon from '@/assets/assistent.svg';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import { IconSend, IconRefresh } from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { montserrat } from '@/app/layout';
import { ErrorMessages, initialChatValue } from '@/constants/common.constants';
import { useSendMessageMutation } from '@/redux/services/chatApi';
import styles from './chat.module.scss';

interface IChat {
  setIsActive: Dispatch<SetStateAction<boolean>>;
  chatHistory: IChatAIMessage[];
  setChatHistory: Dispatch<SetStateAction<IChatAIMessage[]>>;
}

const Chat = ({ setIsActive, chatHistory, setChatHistory }: IChat): JSX.Element => {
  const [message, setMessage] = useState('');
  const [sendMessage, resultSendMessage] = useSendMessageMutation();
  const refChat = useRef<HTMLDivElement>(null);

  const handleCloseChat = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsActive(false);
  };

  const handleClearChat = (): void => {
    setChatHistory(initialChatValue);
  };

  useEffect(() => {
    if (resultSendMessage.data) {
      setChatHistory([
        ...chatHistory,
        {
          role: resultSendMessage.data.role,
          content: resultSendMessage.data.content,
        },
      ]);
      setMessage('');
    }

    if (resultSendMessage.isError) {
      setChatHistory([
        ...chatHistory,
        {
          role: 'error',
          content: ErrorMessages.unknown,
        },
      ]);
    }
  }, [resultSendMessage]);

  const handleSendMessage = async (): Promise<void> => {
    setChatHistory([
      ...chatHistory,
      {
        role: 'user',
        content: message,
      },
    ]);
    await sendMessage(message);
  };

  useLayoutEffect(() => {
    refChat.current?.scrollIntoView(false);
  }, [chatHistory]);

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
      <div className={styles.chatContainer}>
        <div className={styles.chat}>
          {chatHistory.map((item, index) => (
            <div
              className={`${item.role === 'user' ? styles.userMessage : styles.assistantMessage} ${
                item.role === 'error' ? styles.errorMessage : ''
              }`}
              key={index}
            >
              {(item.role === 'assistant' || item.role === 'error') && (
                <Image
                  src={AIIcon}
                  alt={'assistant to improve the post'}
                  className={styles.assistantIcon}
                  width={30}
                  height={30}
                />
              )}
              <div>{item.content}</div>
            </div>
          ))}
        </div>
        {resultSendMessage.isLoading && <p className={styles.loader}>Preparing an answer...</p>}
        <div ref={refChat} className={styles.scrollContainer}></div>
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
        {resultSendMessage.isLoading || message.length < 10 ? (
          <IconSend
            size="2.5rem"
            strokeWidth="1.2"
            className={styles.button}
            style={{ opacity: '0.6' }}
          />
        ) : (
          <IconSend
            size="2.5rem"
            strokeWidth="1.2"
            className={styles.button}
            onClick={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
