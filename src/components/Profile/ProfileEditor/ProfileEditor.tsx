'use client';

import { useAppSelector } from '@/hooks/redux';
import { useForm } from 'react-hook-form';
import { IFormDataProfile } from '@/types/interfaces';
import { useUpdateUserMutation } from '@/redux/services/userApi';
import { useEffect } from 'react';
import { ErrorMessages } from '@/constants/common.constants';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';
import styles from './profileEditor.module.scss';
import ProfileBio from '../ProfileBio/ProfileBio';
import PhotoEditor from '../PhotoEditor/PhotoEditor';

const ProfileEditor = (): JSX.Element => {
  const { user: userData } = useAppSelector((state) => state.userReducer);
  const { id } = userData;
  const [updateUser, result] = useUpdateUserMutation();
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      name: '',
      bio: '',
      mail: '',
      twitter: '',
      instagram: '',
      photo: '',
    },
  });

  useEffect(() => {
    const { name, bio, mail, twitter, instagram } = userData;
    reset({
      name: name || '',
      bio: bio || '',
      mail: mail || '',
      twitter: twitter || '',
      instagram: instagram || '',
    });
  }, [userData]);

  const onSubmitForm = async (data: IFormDataProfile): Promise<void> => {
    const {
      name: nameUser,
      bio: bioUser,
      mail: mailUser,
      twitter: twitterUser,
      instagram: instagramUser,
      photo,
    } = data;
    const form = new FormData();
    form.append('id', id);
    form.append('name', nameUser);
    form.append('bio', bioUser);
    form.append('mail', mailUser);
    form.append('twitter', twitterUser);
    form.append('instagram', instagramUser);

    if (photo[0]) form.append('avatar', photo[0] as unknown as Blob);
    await updateUser(form);

    if (result.error) {
      notifications.show({
        message: ErrorMessages.errorUserUpdate,
        color: 'red',
        autoClose: 4000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    } else {
      notifications.show({
        message: 'Data saved successfully',
        color: 'green',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        <PhotoEditor register={register} setValue={setValue} />
        <ProfileBio register={register} watch={watch} />
      </div>
      <button
        className={styles.submit}
        disabled={result.isLoading}
        onClick={handleSubmit(onSubmitForm)}
      >
        {result.isLoading && <Loader variant="dots" color="white" />}
        SAVE
      </button>
    </form>
  );
};

export default ProfileEditor;
