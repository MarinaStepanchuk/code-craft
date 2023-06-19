'use client';

import { useRouter } from 'next/navigation';

const GoToMainButton = (): JSX.Element => {
  const { push } = useRouter();
  return <button onClick={(): void => push('/')}>Go Back</button>;
};

export default GoToMainButton;
