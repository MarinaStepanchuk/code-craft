import Image from 'next/image';
import { IPost } from '@/types/interfaces';
import defaultImage from '@/assets/default_banner.png';
import { Popover, Text, Box } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import styles from './publicationCard.module.scss';
import PostContent from '@/components/PostContent/PostContent';

const PublicationCard = ({
  post,
  status,
}: {
  key: number;
  post: IPost;
  status: 'published' | 'draft';
}): JSX.Element => {
  const { banner, title, content, createdDate, updatedDate } = post;
  const date = new Date(createdDate).getDay();
  return (
    <article>
      <div className={styles.preview}>
        <Image src={banner || defaultImage} width={150} height={150} alt="post banner" />
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
      <div className={styles.settings}>
        <span>{date}</span>
        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <IconDots size={30} strokeWidth="1.2" fill="inherit" />
          </Popover.Target>
          <Popover.Dropdown>
            <Box>
              <IconPencil size={30} strokeWidth="1.2" />
              <Text>Edit Post</Text>
            </Box>
            <Box>
              <IconTrash size={30} strokeWidth="1.2" />
              <Text>Remove Draft</Text>
            </Box>
          </Popover.Dropdown>
        </Popover>
      </div>
    </article>
  );
};

export default PublicationCard;
