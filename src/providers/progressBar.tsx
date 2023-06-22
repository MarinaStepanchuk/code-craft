'use client';

import ProgressBar from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <>
    {children}
    <ProgressBar
      height="2.5px"
      color="#d4331e"
      options={{ showSpinner: false }}
      shallowRouting
      appDirectory
    />
  </>
);

export default ProgressBarProvider;
