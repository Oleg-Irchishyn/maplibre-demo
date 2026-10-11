import type { Metadata } from 'next';
import { StoreProvider } from '@/components/StoreProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Climate Risk Dashboard',
  description: 'Next.js + Redux Toolkit + Redux-Saga + MapLibre GL learning demo',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
