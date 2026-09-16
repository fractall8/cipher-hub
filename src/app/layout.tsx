import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CLIENT_URL } from '@/shared/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Cipher Hub',
  description: 'Cipher Hub - Your hub for simple and secure data encryption and decryption',
  openGraph: {
    title: 'Cipher Hub',
    description: 'Cipher Hub - Your hub for simple and secure data encryption and decryption',
    url: CLIENT_URL,
    siteName: 'Cipher Hub',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} cyber-grid antialiased`}>
        <main className="flex min-h-dvh flex-col">{children}</main>
      </body>
    </html>
  );
}
