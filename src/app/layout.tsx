// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { AuthBootstrapper } from '@/features/auth/AuthBootstrapper';
import { AppHeader } from '@/components/layout/AppHeader';

export const metadata: Metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AuthBootstrapper />
        <MantineProvider>
          <AppHeader />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
