import { ITag } from '@/types/interfaces';
import { Badge, useMantineTheme } from '@mantine/core';

const TagItem = ({ tag }: { tag: ITag; key: number }): JSX.Element => {
  const theme = useMantineTheme();
  const handleTag = (): void => {};

  return (
    <Badge
      key={tag.id}
      variant={'filled'}
      style={{
        backgroundColor: theme.colors.brand[2],
        textTransform: 'none',
        fontWeight: '300',
        fontSize: '1.2rem',
        cursor: 'pointer',
      }}
      size="xl"
      onClick={handleTag}
    >
      {tag.name}
    </Badge>
  );
};

export default TagItem;
