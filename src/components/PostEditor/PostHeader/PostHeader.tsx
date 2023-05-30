import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image, { StaticImageData } from 'next/image';
import defaultBanner from '@/assets/default_banner.png';
import styles from './postHeader.module.scss';

interface IPostHeaderProps {
  photo: string,
  setPhoto: Dispatch<SetStateAction<string>>,
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
}

const PostHeader = ({ photo, setPhoto, title, setTitle }:IPostHeaderProps):JSX.Element => {
  const [imagePreview, setImagePreview] = useState(defaultBanner);

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoto(e.target.value);
    if(e.target.files) {
      const url = URL.createObjectURL(e.target.files[0]) as unknown as StaticImageData;
      setImagePreview(url)
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
         <input type="file" accept={'.jpg,.jpeg,.png,.webp'} className={styles.banner} value={photo} onChange={(e):void => handleBannerChange(e)}/>
      </label>      
      <input type="text" autoFocus={true} className={styles.title} placeholder='Title...'  value={title} onChange={(e):void  => setTitle(e.target.value)}/>
    </div>
  )
}

export default PostHeader;