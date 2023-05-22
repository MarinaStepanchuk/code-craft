'use client'

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email: string;
  password: string;
  repeatPassword?: string;
}

const FormAuthorization = (props: { registration: boolean }): JSX.Element => {
  const { data: session } = useSession();

  const { registration } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmitForm = async (data: ILoginForm): Promise<void> => {
    const { email, password } = data;

    if(!registration) {
      const result =  await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
    }
  };

  useEffect(() => {
    console.log(session?.user)
  }, [session])

  const signInWithGoogle = async (): Promise<void> => {
    await signIn('google');
    console.log(session?.user)
    
  };

  const signInWithGithub = async (): Promise<void> => {
    await signIn('github');
  };

  return (
    <div>
      <h2>{registration  ? 'Sign up' : 'Sign In'}</h2>
      <form>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'empty',
            })}
          />
        </div>
        {errors.email && <span>{errors.email.message}</span>}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Password"
            {...register('password', {
              required: 'empty',
            })}
          />
        </div>
        {errors.password && <span>{errors.password.message}</span>}
        {registration && (
          <div>
            <label htmlFor="repeatPassword">Repeat password</label>
            <input
              type="text"
              placeholder="Repeat Password"
              {...register('repeatPassword', {
                required: 'empty',
              })}
            />
          </div>
        )}
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
        <button onClick={handleSubmit(onSubmitForm)}>{registration ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={signInWithGithub}>Sign In with Github</button>
      {registration ? (
        <div>
          <span>Already have an account?</span>
          <Link href="/signin">Sign in →</Link>
        </div>
      ) : (
        <div>
          <span>Don`t have an account?</span>
          <Link href="/signup">Create an account.</Link>
        </div>
      )}
    </div>
  );
};

export default FormAuthorization;