'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessages, Patch, regEmail, regPassword } from '@/constants/common.constants';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import googleIcon from '@/assets/icon-google.svg';
import { useRegisterUserMutation } from '@/redux/services/userApi';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { IBackendError } from '@/types/interfaces';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import styles from './formAuthorization.module.scss';
import Modal from '../Modal/Modal';

interface ILoginForm {
  email: string;
  password: string;
  repeatPassword?: string;
}

const FormAuthorization = (props: { registration: boolean }): JSX.Element => {
  const { registration } = props;
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { data: user, isLoading, isError, error }] = useRegisterUserMutation();
  const { push } = useRouter();
  const { ref, isActive, setIsActive } = useOutsideClick(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmitForm = async (data: ILoginForm): Promise<void> => {
    const { email, password } = data;

    if (!registration) {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
      if (res?.error) {
        notifications.show({
          message: ErrorMessages.invalidData,
          color: 'red',
          autoClose: 3000,
          withBorder: true,
          styles: () => ({
            description: { fontSize: '1.4rem' },
          }),
        });
      } else {
        push('/');
      }
    } else {
      await registerUser({ email, password });
    }
  };

  useEffect(() => {
    if (isError) {
      notifications.show({
        message: (error as IBackendError)?.data.message || '',
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }

    if (user) {
      setIsActive(true);
    }
  }, [user, isError]);

  const signInWithGoogle = async (): Promise<void> => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/',
    });
  };

  const redirect = (): void => {
    push('/');
  };

  return (
    <div className={styles.formWrapper}>
      <h2>{registration ? 'Sign up' : 'Sign In'}</h2>
      <div className={styles.formBox}>
        <form>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Email"
              {...register('email', {
                required: ErrorMessages.fieldIsEmpty,
                pattern: { value: regEmail, message: ErrorMessages.invalidEmail },
              })}
            />
            <label className={styles.labelClick} htmlFor="email">
              Email address
            </label>
          </div>
          {errors.email && <span>{errors.email.message}</span>}
          <div className={styles.inputContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: ErrorMessages.fieldIsEmpty,
                pattern: { value: regPassword, message: ErrorMessages.invalidPassword },
              })}
            />
            {showPassword ? (
              <IconEye
                size="2.5rem"
                strokeWidth="1.2"
                className={styles.eye}
                onClick={(): void => setShowPassword(false)}
              />
            ) : (
              <IconEyeOff
                size="2.5rem"
                strokeWidth="1.2"
                className={styles.eye}
                onClick={(): void => setShowPassword(true)}
              />
            )}
            <label htmlFor="password" className={styles.labelClick}>
              Password
            </label>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
          {registration && (
            <div className={styles.inputContainer}>
              <input
                type={showRepeatPassword ? 'text' : 'password'}
                placeholder="Repeat Password"
                {...register('repeatPassword', {
                  required: ErrorMessages.fieldIsEmpty,
                  validate: (value: string) =>
                    value === watch('password') || ErrorMessages.passwordMismatch,
                })}
              />
              {showRepeatPassword ? (
                <IconEye
                  size="2.5rem"
                  strokeWidth="1.2"
                  className={styles.eye}
                  onClick={(): void => setShowRepeatPassword(false)}
                />
              ) : (
                <IconEyeOff
                  size="2.5rem"
                  strokeWidth="1.2"
                  className={styles.eye}
                  onClick={(): void => setShowRepeatPassword(true)}
                />
              )}
              <label htmlFor="repeatPassword" className={styles.labelClick}>
                Repeat Password
              </label>
            </div>
          )}
          {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
          <button onClick={handleSubmit(onSubmitForm)} disabled={isLoading}>
            {registration ? 'Sign Up With Email' : 'Sign In With Email'}
          </button>
        </form>
        <button onClick={signInWithGoogle} disabled={isLoading}>
          <Image width={30} height={30} src={googleIcon} alt="register by google" />
          Sign In with Google
        </button>
        {registration ? (
          <p>
            Don`t have an account?
            <Link href={Patch.signIn}> Sign in →</Link>
          </p>
        ) : (
          <p className={styles.changeModeButton}>
            <span>Don`t have an account?</span>
            <Link href={Patch.signUp}> Create an account.</Link>
          </p>
        )}
      </div>
      {isActive && (
        <Modal setIsActive={setIsActive} isActive={isActive} ref={ref} cb={redirect}>
          <p>
            Registration was successful, an email has been sent to you to confirm, please click on
            the link inside the email.
          </p>
          <p>After closing the window you will be redirected to the main page.</p>
        </Modal>
      )}
    </div>
  );
};

export default FormAuthorization;
