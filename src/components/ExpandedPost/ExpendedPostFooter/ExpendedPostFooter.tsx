import { IconMessageCircle2 } from '@tabler/icons-react';
import { Accordion, AccordionControlProps, Box, Tooltip, createStyles } from '@mantine/core';
import { lazy, Suspense } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import { IPostWithUser } from '@/types/interfaces';
import PostActions from '../PostActions/PostActions';
import styles from './expendedPostFooter.module.scss';

interface IAccordionProps extends AccordionControlProps {
  data: IPostWithUser;
}

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

function AccordionControl(props: IAccordionProps): JSX.Element {
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
        <PostActions data={props.data} />
      </div>
    </Box>
  );
}

const Comments = lazy(() => import('../Comments/Comments'));

const ExpendedPostFooter = ({ data }: { data: IPostWithUser }): JSX.Element => {
  const { classes } = useStyles();
  return (
    <footer>
      <Accordion variant="default" disableChevronRotation chevronPosition="left" chevron={false}>
        <Accordion.Item value="photos">
          <AccordionControl className={classes.control} data={data}>
            <Tooltip label="Comments" withArrow>
              <IconMessageCircle2 size={30} strokeWidth="1.2" className={classes.iconButton} />
            </Tooltip>
          </AccordionControl>

          <Accordion.Panel sx={{ borderTop: '1px solid #ced4da' }}>
            <Suspense fallback={<Preloader />}>
              <Comments data={data} />
            </Suspense>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </footer>
  );
};

export default ExpendedPostFooter;
