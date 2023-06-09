import Image from 'next/image';
import { IPost } from '@/types/interfaces';
import defaultImage from '@/assets/default_banner.png';
import { Popover, Text, Flex, createStyles, Divider } from '@mantine/core';
import { IconDots, IconPencil, IconTrash, IconThumbUp } from '@tabler/icons-react';
import getFirstParagraph from '@/utils/getFirstParagraph';
import { useRouter } from 'next/navigation';
import Bookmark from '@/components/Bookmark/Bookmark';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useDeletePostMutation } from '@/redux/services/postsApi';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import getFormattedDate from '@/utils/getFormattedDate';
import ShareLinkButton from '@/components/ShareLinkButton/ShareLinkButton';
import { useAppSelector } from '@/hooks/redux';
import Link from 'next/link';
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
  isPublic,
}: {
  key: number;
  post: IPost;
  status: 'published' | 'draft';
  isPublic: boolean;
}): JSX.Element => {
  const { id, banner, title, content, updatedDate, likesCount, userId: authorId } = post;
  const text = `${getFirstParagraph(content as string).slice(0, 150)}...`;
  const { user } = useAppSelector((state) => state.userReducer);
  const { classes } = useStyles();
  const { push } = useRouter();
  const [deletePost, resultDelete] = useDeletePostMutation();

  const date = getFormattedDate(updatedDate);

  const editPublication = (): void => {
    push(`${Patch.me}${Patch.newPost}/${id}`);
  };

  const deletePublication = async (): Promise<void> => {
    await deletePost(id);
  };

  useEffect(() => {
    const { isError, data } = resultDelete;

    if (isError) {
      notifications.show({
        message: ErrorMessages.unknown,
        color: 'red',
        autoClose: 4000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }

    if (data) {
      notifications.show({
        message: 'The post was successfully deleted',
        color: 'green',
        autoClose: 4000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [resultDelete]);

  return (
    <article className={styles.publication}>
      <Link
        href={status === 'published' ? `${Patch.post}/${id}` : `${Patch.me}${Patch.newPost}/${id}`}
        className={styles.link}
      >
        <div className={styles.preview}>
          <div className={styles.bannerContainer}>
            <Image src={banner || defaultImage} fill quality={100} alt="post banner" />
          </div>
          <div className={styles.publicationContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>{title}</h3>
              {status === 'published' && (
                <div className={styles.iconsContainer}>
                  {authorId !== user.id && <Bookmark postId={id} />}
                  <div className={styles.likeContainer}>
                    <IconThumbUp size={26} strokeWidth="1.2" />
                    <sup>
                      {(likesCount as number) < 1000
                        ? likesCount
                        : `${((likesCount as number) / 1000).toFixed(1)}K`}
                    </sup>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.content}>{getFirstParagraph(content || '')}</div>
          </div>
        </div>
      </Link>
      <div className={styles.footer}>
        <div>
          <span>{status === 'draft' ? 'Last edited on ' : 'Published on '}</span>
          <span>{date}</span>
        </div>
        {!isPublic && (
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
                onClick={deletePublication}
              >
                <IconTrash size={17} strokeWidth="1.2" />
                <Text>{status === 'draft' ? 'Remove Draft' : 'Remove post'}</Text>
              </Flex>
            </Popover.Dropdown>
          </Popover>
        )}

        {status === 'published' && <ShareLinkButton text={text} title={title as string} />}
      </div>
      <Divider size={3} className={classes.divider} />
    </article>
  );
};

export default PublicationCard;
