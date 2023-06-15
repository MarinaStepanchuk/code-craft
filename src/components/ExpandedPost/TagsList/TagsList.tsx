import { ITag } from '@/types/interfaces';
import TagItem from './TagItem/TagItem';
import styles from './tagsList.module.scss';

const TagsList = ({ tags = [] }: { tags: Array<ITag> | null }): JSX.Element => (
  <div className={styles.tagsContainer}>
    {tags?.map((tag) => (
      <TagItem key={tag.id} tag={tag} />
    ))}
  </div>
);

export default TagsList;
