'use client';

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { Notifications } from '@mantine/notifications';

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withNormalizeCSS
        theme={{
          fontFamily: 'Montserrat, sans-serif',
          fontSizes: {
            xs: '12px',
            sm: '12px',
            md: '14px',
            lg: '16px',
            xl: '14px',
          },
          colors: {
            brand: [
              '#d4331e',
              '#86a1ae',
              '#05386B',
              '#05386B',
              '#dee2d9',
              '#dee6e7',
              '#d4331e',
              '#d4331e',
              '#d4331e',
            ],
          },
          primaryColor: 'brand',
        }}
      >
        <Notifications />
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
