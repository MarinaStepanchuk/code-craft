import Image from 'next/image';
import { IPost } from '@/types/interfaces';
import defaultImage from '@/assets/default_banner.png';
import { Popover, Text, Flex, createStyles, Divider } from '@mantine/core';
import { IconDots, IconPencil, IconTrash, IconShare } from '@tabler/icons-react';
import getFirstParagraph from '@/utils/getFirstParagraph';
import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import styles from './publicationCard.module.scss';

const useStyles = createStyles((theme) => ({
  dropdown: {
    fontSize: '1.4rem',
    borderRadius: '0.5rem',
    color: theme.colors.brand[3],
  },
  iconButton: {
    cursor: 'pointer',
    fill: theme.colors.brand[3],

    '&:hover': {
      fill: theme.colors.brand[0],
      stroke: theme.colors.brand[0],
      transform: 'scale(1.1)',
    },
  },
  dropdownItem: {
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  divider: {
    width: '100%',
    margin: '1.5rem auto',
  },
}));

const PublicationCard = ({
  post,
  status,
}: {
  key: number;
  post: IPost;
  status: 'published' | 'draft';
}): JSX.Element => {
  const { id, banner, title, content, updatedDate } = post;
  const { classes } = useStyles();
  const { push } = useRouter();

  const date = new Date(updatedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const editPublication = (): void => {
    push(`${Patch.me}${Patch.newPost}/${id}`);
  };

  return (
    <article className={styles.publication}>
      <div className={styles.preview}>
        <Image src={banner || defaultImage} width={100} height={100} alt="post banner" />
        <div className={styles.publicationContainer}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.content}>{getFirstParagraph(content || '')}</div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <span>{status === 'draft' ? 'Last edited on ' : 'Published on '}</span>
          <span>{date}</span>
        </div>
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <IconDots size={30} strokeWidth="1.2" className={classes.iconButton} />
          </Popover.Target>
          <Popover.Dropdown className={classes.dropdown}>
            <Flex
              gap="0.5rem"
              align="center"
              className={classes.dropdownItem}
              onClick={editPublication}
            >
              <IconPencil size={17} strokeWidth="1.2" />
              <Text>{status === 'draft' ? 'Edit Draft' : 'Edit post'}</Text>
            </Flex>
            <Flex
              gap="0.5rem"
              align="center"
              className={classes.dropdownItem}
              sx={{ color: 'red' }}
            >
              <IconTrash size={17} strokeWidth="1.2" />
              <Text>{status === 'draft' ? 'Remove Draft' : 'Remove post'}</Text>
            </Flex>
          </Popover.Dropdown>
        </Popover>
        {status === 'published' && (
          <IconShare size={20} strokeWidth="1.2" className={classes.iconButton} />
        )}
      </div>
      <Divider size={3} className={classes.divider} />
    </article>
  );
};

export default PublicationCard;
