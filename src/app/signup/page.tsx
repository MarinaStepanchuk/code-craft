import FormAuthorization from '@/components/FormAuthorization/FormAuthorization';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const checkSession = async (): Promise<Session | null> => {
  const session = await getServerSession(authOptions);
  return session;
};

const SignUp = async (): Promise<JSX.Element> => {
  const session = await checkSession();

  if (session) {
    redirect('/');
  }

  return <FormAuthorization registration={true} />;
};

export default SignUp;
