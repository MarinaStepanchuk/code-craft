import { useAppSelector } from "@/huks/redux";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { IconAt, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import { IFormDataProfile } from "@/types/interfaces";
import styles from './profileBio.module.scss';

interface IProfileBioProps {
  register: UseFormRegister<IFormDataProfile>,
  watch: UseFormWatch<IFormDataProfile>,
}

const ProfileBio = ({register, watch}: IProfileBioProps): JSX.Element => {
  const { email } = useAppSelector((state) => state.userReducer.user);

  return (
    <div className={styles.containerBio}>
      <h4 className={styles.title}>{email}</h4>
      <div className={styles.formItem}>
        <label htmlFor="name">Your Name</label>
        <div className={styles.inputContainer}>
          <input type="text" {...register('name')} maxLength={50}/>
          <div className={styles.descriptionInput}>
            <p>Displayed as a header and in your responses.</p>
            <p>
              <span>{watch('name')?.length}</span>/50
            </p>
          </div>
        </div>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="bio">Bio</label>
        <div className={styles.inputContainer}>
          <input type="text" {...register('bio')} maxLength={160}/>
          <div className={styles.descriptionInput}>
            <p>Appears on your profile and next to your stories.</p>
            <p>
              <span>{watch('bio')?.length}</span>/160
            </p>
          </div>
        </div>
      </div>
      <h4 className={styles.title}>Contacts:</h4>
      <div className={styles.formItemContacts}>
        <IconBrandTwitter size="1.8rem" strokeWidth="1.2" />
        <input type="text" {...register('twitter')} maxLength={160}/>
      </div>
      <div className={styles.formItemContacts}>
        <IconAt size="1.8rem" strokeWidth="1.2" />
        <input type="text" {...register('mail')} maxLength={160}/>
      </div>
      <div className={styles.formItemContacts}>
        <IconBrandInstagram size="1.8rem" strokeWidth="1.2" />
        <input type="text" {...register('instagram')} maxLength={160}/>
      </div>
    </div>    
  )
}

export default ProfileBio;
