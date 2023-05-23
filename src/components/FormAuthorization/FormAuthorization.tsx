'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorMessages, regEmail, regPassword } from '@/constants/common.constants';
import { useState } from 'react';
import styles from "./formAuthorization.module.scss";

interface ILoginForm {
  email: string;
  password: string;
  repeatPassword?: string;
}

const FormAuthorization = (props: { registration: boolean }): JSX.Element => {
  const { registration } = props;
  const [ emailLabel, setEmailLabel ] = useState(false);
  const [ passwordLabel, setPasswordLabel ] = useState(false);
  const [ repeatPasswordLabel, setRepeatPasswordLabel ] = useState(false);

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

    if(!registration) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    await signIn('google');
  };

  const signInWithGithub = async (): Promise<void> => {
    await signIn('github');
  };

  return (
    <div className={styles.formWrapper}>
      <h2>{registration  ? 'Sign up' : 'Sign In'}</h2>
      <div className={styles.formBox}>
        <form className="space-y-6">
        <div className={styles.inputContainer}>
          <input
            type="text"
            onClick={():void => setEmailLabel(true)}
            placeholder="Email"
            {...register('email', {
              required: ErrorMessages.fieldIsEmpty,
              pattern: { value: regEmail, message: ErrorMessages.invalidEmail },
            })}
          />
          <label className={`${emailLabel && styles.labelClick}`} htmlFor="email">Email address</label>
        </div>
        {errors.email && <span>{errors.email.message}</span>}
        <div className={styles.inputContainer}>
          <input
            type="text"
            onClick={():void => setPasswordLabel(true)}
            placeholder="Password"
            {...register('password', {
              required: ErrorMessages.fieldIsEmpty,
              pattern: { value: regPassword, message: ErrorMessages.invalidPassword },
            })}
          />
          <label htmlFor="password" className={`${passwordLabel && styles.labelClick}`}>Password</label>
        </div>
        {errors.password && <span>{errors.password.message}</span>}
        {registration && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Repeat Password"
              onClick={():void => setRepeatPasswordLabel(true)}
              {...register('repeatPassword', {
                required: ErrorMessages.fieldIsEmpty,
                validate: (value) => value === watch('password') || ErrorMessages.passwordMismatch,
              })}
            />
            <label htmlFor="repeatPassword" className={`${repeatPasswordLabel && styles.labelClick}`}>Repeat Password</label>
          </div>
        )}
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
        <button onClick={handleSubmit(onSubmitForm)}>
          {registration ? 'Sign Up With Email' : 'Sign In With Email'}
        </button>
      </form>
      <button onClick={signInWithGoogle}>
        Sign In with Google
      </button>
      <button onClick={signInWithGithub}>
        Sign In with Github
      </button>
      {registration ? (
        <p>
        Don`t have an account? 
        <Link href="/signin"> Sign in →</Link>
        </p>
      ) : (
        <p>
          Don`t have an account? 
          <Link href="/signup"> Create an account.</Link>
        </p>
      )}
    </div>
    </div>
  );
};

export default FormAuthorization;