import { Tooltip, createStyles } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  iconButton: {
    cursor: 'pointer',

    '&:hover': {
      stroke: theme.colors.brand[0],
      transform: 'scale(1.1)',
      strokeWidth: '1.4',
    },
  },
}));

const ShareLinkButton = (): JSX.Element => {
  const { classes } = useStyles();
  return (
    <Tooltip label="Share" withArrow>
      <IconShare size={23} strokeWidth="1.2" className={classes.iconButton} />
    </Tooltip>
  );
};

export default ShareLinkButton;
