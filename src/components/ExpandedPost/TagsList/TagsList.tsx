import { ITag } from '@/types/interfaces';
import Tag from './Tag/Tag';
import styles from './tagsList.module.scss';

const TagsList = ({ tags = [] }: { tags: Array<ITag> | null }): JSX.Element => (
  <div className={styles.tagsContainer}>
    {tags?.map((tag) => (
      <Tag key={tag.id} tag={tag} size="small" />
    ))}
  </div>
);

export default TagsList;
