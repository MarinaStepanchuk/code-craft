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

interface IShareLinkProps {
  text: string;
  title: string;
}

const ShareLinkButton = ({ text, title }: IShareLinkProps): JSX.Element => {
  const { classes } = useStyles();
  const shareHandler = (): void => {
    if (navigator.share) {
      navigator.share({
        text,
        url: window.location.href,
        title,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Tooltip label="Share" withArrow onClick={shareHandler}>
      <IconShare size={23} strokeWidth="1.2" className={classes.iconButton} />
    </Tooltip>
  );
};

export default ShareLinkButton;
