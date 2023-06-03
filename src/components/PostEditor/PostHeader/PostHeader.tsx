import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image, { StaticImageData } from  "next/image";
import defaultBanner from '@/assets/default_banner.png';
import { Textarea, createStyles } from "@mantine/core";
import styles from './postHeader.module.scss';

interface IPostHeaderProps {
  setBanner: Dispatch<SetStateAction<string | File>>,
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
}

const useStyles = createStyles((theme) => ({
  title: {
    width: '100%',

    'textarea': {
      border: 'none',
      outline: 'none',
      fontSize: '3rem',
      color: theme.colors.brand[2],
      fontWeight: 'bold',
    }
  },
}))

const PostHeader = ({ setBanner, title, setTitle }:IPostHeaderProps):JSX.Element => {
  const [imagePreview, setImagePreview] = useState(defaultBanner);
  const { classes } = useStyles();

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if(e.currentTarget.files?.length) {
      const files = e.currentTarget.files as unknown as FileList;
      const url = URL.createObjectURL(files[0]) as unknown as StaticImageData;
      setImagePreview(url);
      setBanner(files[0]);
    }
  }

  return (
    <div className={styles.header}>
      <label className={imagePreview === defaultBanner ? `${styles.min} ${styles.labelImg}` : `${styles.labelImg}`}>
        { imagePreview === defaultBanner ?
          <Image width={150} height={150} src={imagePreview} alt='banner post' className={styles.bannerDefault} />
          : 
          <Image fill src={imagePreview} alt='banner post' className={styles.bannerImg} />
        }
         <input type="file" accept={'.jpg,.jpeg,.png,.webp'} className={styles.banner} onChange={(e):void => handleBannerChange(e)}/>
      </label>
      <Textarea
      placeholder="Title..."
      withAsterisk
      value={title}
      autosize
      onChange={(e):void  => setTitle(e.target.value)}
      maxLength={100}
      className={classes.title}
      />
    </div>
  )
}

export default PostHeader;