import Header from '@/layout/Header/Header';
// eslint-disable-next-line camelcase
import { Montserrat, Amatic_SC } from 'next/font/google';
import './globals.scss';
import { Session, getServerSession } from 'next-auth';
import ProviderToolkit from '@/redux/provider';
import styles from './layout.module.scss';
import NextAuthProvider from '../providers/providers';
import { authOptions } from './api/auth/[...nextauth]/route';
import RootStyleRegistry from '../providers/emotion';

export const montserrat = Montserrat({ subsets: ['latin'] });

export const amatic = Amatic_SC({ subsets: ['latin'], weight: '400' });

export const checkSession = async (): Promise<Session | null> => {
  const session = await getServerSession(authOptions);
  return session;
};

const RootLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
  const session = await checkSession();
  return (
    <html lang="en" className={styles.html}>
      <head></head>
      <NextAuthProvider>
        <RootStyleRegistry>
          <ProviderToolkit>
            <body className={`${styles.body} ${montserrat.className}`}>
              <Header session={session} />
              <main className={styles.main}>{children}</main>
            </body>
          </ProviderToolkit>
        </RootStyleRegistry>
      </NextAuthProvider>
    </html>
  );
};

export default RootLayout;
