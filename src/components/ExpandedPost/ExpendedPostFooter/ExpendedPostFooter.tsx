import { IconMessageCircle2 } from '@tabler/icons-react';
import { Accordion, AccordionControlProps, Box, Tooltip, createStyles } from '@mantine/core';
import CommentsList from '../CommentsList/CommentsList';
import PostActions from '../PostActions/PostActions';
import styles from './expendedPostFooter.module.scss';

const useStyles = createStyles((theme) => ({
  iconButton: {
    cursor: 'pointer',

    '&:hover': {
      stroke: theme.colors.brand[0],
      transform: 'scale(1.1)',
      strokeWidth: '1.4',
    },
  },
  control: {
    padding: '0',
    width: 'max-content',

    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}));

function AccordionControl(props: AccordionControlProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Accordion.Control {...props} />
      <div className={styles.actionContainer}>
        <PostActions />
      </div>
    </Box>
  );
}

const ExpendedPostFooter = (): JSX.Element => {
  const { classes } = useStyles();
  return (
    <footer>
      <Accordion variant="default" disableChevronRotation chevronPosition="left" chevron={false}>
        <Accordion.Item value="photos">
          <AccordionControl className={classes.control}>
            <Tooltip label="Comments" withArrow>
              <IconMessageCircle2 size={30} strokeWidth="1.2" className={classes.iconButton} />
            </Tooltip>
          </AccordionControl>

          <Accordion.Panel sx={{ borderTop: '1px solid #ced4da' }}>
            <CommentsList />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <p>jafkdsndsldm</p>
    </footer>
  );
};

export default ExpendedPostFooter;
