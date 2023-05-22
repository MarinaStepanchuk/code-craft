'use client'

import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email: string;
  password: string;
  repeatPassword?: string;
}

const FormAuthorization = (props: { registration: boolean }): JSX.Element => {

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

  const onSubmitForm = (data: ILoginForm): void => {
    const { email, password } = data;
  };

  return (
    <div>
      <h2>Sign up</h2>
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
      {registration ? (
        <div>
          <span>Already have an account?</span>
          <Link href="/signin">Sign in →</Link>
        </div>
      ) : (
        <div>
          <span>New to GraphQL Playground?</span>
          <Link href="/signup">Create an account.</Link>
        </div>
      )}
    </div>
  );
};

export { FormAuthorization };