import FormAuthorization from '@/components/FormAuthorization/FormAuthorization';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const SignIn = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <FormAuthorization registration={false} />;
};

export default SignIn;
