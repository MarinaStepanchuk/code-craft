import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useAppSelector } from "@/huks/redux";
import defaultProfilePhoto from '@/assets/profile_default.png';
import Image from 'next/image';
import { IFormDataProfile } from "@/types/interfaces";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ErrorMessages } from "@/constants/common.constants";
import SnackBar from "@/components/SnackBar/SnackBar";
import styles from './photoEditor.module.scss';


interface IPhotoEditorProps {
  register: UseFormRegister<IFormDataProfile>,
  setValue: UseFormSetValue<IFormDataProfile>,
}

const photoSizeLimit = 409600;

const PhotoEditor = ({ register, setValue }: IPhotoEditorProps): JSX.Element => {
  const { avatarUrl } = useAppSelector((state) => state.userReducer.user);
  const [photo, setPhoto] = useState(avatarUrl || '')
  const [ errorPhoto, setErrorPhoto ] = useState('');
  const [activeSnackBar, setActiveSnackBar] = useState(false);

  const checkPhotoSize = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.currentTarget.files as unknown as FileList;

    if (file[0]?.size > photoSizeLimit) {
      setErrorPhoto(ErrorMessages.tooBigPhoto);
      setActiveSnackBar(true);
      setValue('photo', '');
      return;
    }
    
    if(file[0]) {
      setPhoto(URL.createObjectURL(file[0] as Blob | MediaSource));
    }
  }

  const removePhoto = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPhoto('');
    setValue('photo', '');
  }

  useEffect(() => {
    if (avatarUrl) {
      setPhoto(avatarUrl);
    }
  }, [avatarUrl])
  
  return (
    <div className={styles.containerPhoto}>
      {
        photo 
        ? <Image width={140} height={140} src={photo} style={{borderRadius: '50%', objectFit: 'cover'}} alt='user photo' />
        : 
        <div className={styles.photo}>
        <Image width={50} height={50} src={defaultProfilePhoto} alt='user photo' />
        </div>
      }
      <div className={styles.containerButton}>
        <label className={styles.photoButtonLoad}>
          <input
              type="file"
              {...register('photo')}
              accept={'.jpg,.jpeg,.png, .webp'}
              className={styles.inputFile}
              onChange={(event): void => checkPhotoSize(event)}
            />
            Load
        </label>
        <button className={styles.photoButtonRemove} onClick={(e):void  => removePhoto(e)}>Remove</button>
        <SnackBar active={activeSnackBar} setActive={setActiveSnackBar} timer={3000} type='alert'>
          <div>{errorPhoto}</div>
        </SnackBar>
      </div>
    </div>
  )
}

export default PhotoEditor;