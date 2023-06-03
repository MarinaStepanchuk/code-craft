import FormAuthorization from '@/components/FormAuthorization/FormAuthorization';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const SignUp = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return <FormAuthorization registration={true} />;
};

export default SignUp;
