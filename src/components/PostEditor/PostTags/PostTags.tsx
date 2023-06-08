import { ActionIcon, Badge, useMantineTheme } from '@mantine/core';
import { IconX, IconPlus } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import styles from './postTags.module.scss';

interface IPostTagsProps {
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
  tags: Array<string>;
  setTags: Dispatch<SetStateAction<string[]>>;
}

const PostTags = ({ tag, setTag, tags, setTags }: IPostTagsProps): JSX.Element => {
  const theme = useMantineTheme();

  const addTag = (): void => {
    if (tags.includes(tag)) {
      setTag('');
      return;
    }

    if (tag.length >= 2) {
      setTags([...tags, tag]);
      setTag('');
    }
  };
  const removeTag = (index: number): void => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className={styles.tagsContainer}>
      <label className={styles.tagsInputContainer}>
        <span>Enter your tags:</span>
        <input
          type="text"
          className={styles.tagsInput}
          value={tag}
          placeholder="tags..."
          onChange={(e): void => setTag(e.target.value)}
          maxLength={30}
        />
        <div className={styles.plus}>
          <IconPlus size={20} strokeWidth={1.2} color={'#fff'} onClick={addTag} />
        </div>
      </label>
      <div className={styles.badges}>
        {tags.map((item, index) => (
          <Badge
            key={index}
            variant={'filled'}
            pr={3}
            sx={{ backgroundColor: theme.colors.brand[2] }}
            rightSection={
              <ActionIcon
                size="md"
                radius="xl"
                variant="transparent"
                onClick={(): void => removeTag(index)}
              >
                <IconX size={'10rem'} color={'#fff'} />
              </ActionIcon>
            }
            size="xl"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PostTags;
