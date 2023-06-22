'use client';

import ProgressBar from 'next-nprogress-bar';

const ProgressProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <>
    {children}
    <ProgressBar
      height="4px"
      color="#fffd00"
      options={{ showSpinner: false }}
      shallowRouting
      appDirectory
    />
  </>
);

export default ProgressProvider;
