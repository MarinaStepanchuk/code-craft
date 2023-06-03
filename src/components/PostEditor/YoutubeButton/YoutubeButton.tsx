import { Popover, TextInput } from '@mantine/core';
import { useDisclosure, useInputState, useWindowEvent } from '@mantine/hooks';
import { IconBrandYoutube } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import styles from './youtubeButton.module.scss';

const YoutubeButton = ({ editor }: { editor: Editor | null }): JSX.Element => {
  const [url, setUrl] = useInputState('');
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpen = (): void => {
    open();
    const linkData = editor?.getAttributes('link');
    setUrl(linkData?.href || '');
  };

  const handleClose = (): void => {
    close();
    setUrl('');
  };

  const setYoutubeLink = (): void => {
    handleClose();

    if (url === '') {
      editor?.chain().focus().extendMarkRange('youtube').clearContent().run();
      return;
    }

    editor?.commands.setYoutubeVideo({
      src: url,
    });
  };

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setYoutubeLink();
    }
  };

  useWindowEvent('edit-link', handleOpen, false);

  return (
    <Popover
      width={300}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onClose={handleClose}
    >
      <Popover.Target>
        <div className={styles.videoButton} onClick={handleOpen}>
          <IconBrandYoutube size={17} strokeWidth="1.2" />
        </div>
      </Popover.Target>
      <Popover.Dropdown className={styles.popoverYoutubeContainer}>
        <TextInput
          placeholder="www.youtube.com/example"
          type="url"
          value={url}
          onChange={setUrl}
          onKeyDown={handleInputKeydown}
          className={styles.popoverYoutubeInput}
        />
        <div onClick={setYoutubeLink} className={styles.saveYoutubeLink}>
          Save
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default YoutubeButton;
