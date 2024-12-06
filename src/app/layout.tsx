import Link from 'next/link';
import './globals.css';
import type { Metadata } from 'next';
import { TanStackQueryProvider } from './providers/TanStackQueryProvider.tsx';
import logo from './icon.png';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'RGT ASSIGNMENT',
  description: 'RGT ASSIGNMENT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-xl min-h-screen mx-auto bg-white px-4 shadow-lg">
          <header className="h-15 font-bold text-lg leading-[60px] flex items-center">
            <Link href={'/'} className="flex items-center">
              <Image width={150} src={logo} alt={'logo'} />
              <span className="ml-10">RGT ASSIGNMENT</span>
            </Link>
          </header>

          <main className="pt-2.5">
            {' '}
            <TanStackQueryProvider>{children}</TanStackQueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
