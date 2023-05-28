'use client'

import { useAppSelector } from '@/huks/redux';
import { useForm } from 'react-hook-form';
import styles from './profileEditor.module.scss'
import ProfileBio from '../ProfileBio/ProfileBio';
import PhotoEditor from '../PhotoEditor/PhotoEditor';
import { IFormDataProfile } from '@/types/interfaces';
import { useUpdateUserMutation } from '@/redux/services/userApi';

const ProfileEditor = (): JSX.Element => {
  const { id, name, bio, mail, twitter, instagram } = useAppSelector((state) => state.userReducer.user);
  const [updateUser, {data: user, isLoading, isError}] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      name: name || '',
      bio: bio || '',
      mail: mail || '',
      twitter: twitter || '',
      instagram: instagram || '',
      photo: '',
    },
  },
  );

  const onSubmitForm = async (data: IFormDataProfile): Promise<void> => {
    const { name: nameUser, bio: bioUser, mail: mailUser, twitter: twitterUser, instagram: instagramUser, photo } = data;
    const form = new FormData();
    form.append('id', id);
    form.append('name', nameUser);
    form.append('bio', bioUser);
    form.append('mail', mailUser);
    form.append('twitter', twitterUser);
    form.append('instagram', instagramUser);
    if (photo[0]) form.append('avatar', photo[0] as unknown as Blob);

    console.log(form.get('avatar'))



    // const dataUser = new URLSearchParams(form).toString();

    // console.log(dataUser)

    await updateUser(form);
  };

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <PhotoEditor register={register} />
        <ProfileBio register={register} watch={watch}/>
      </div>
      <button className={styles.submit} onClick={handleSubmit(onSubmitForm)}>
        {isLoading && <p>loading</p>}
        SAVE
      </button>
    </form>
  );
}

export default ProfileEditor;