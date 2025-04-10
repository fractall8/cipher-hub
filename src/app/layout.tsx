import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CLIENT_URL } from '@/shared/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cipher Hub',
  description: 'Cipher Hub - Your hub for simple and secure data encryption and decryption',
  openGraph: {
    title: 'Cipher Hub',
    description: 'Cipher Hub - Your hub for simple and secure data encryption and decryption',
    url: CLIENT_URL,
    siteName: 'Cipher Hub',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} cyber-grid antialiased`}>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {children}
        </main>
      </body>
    </html>
  );
}
