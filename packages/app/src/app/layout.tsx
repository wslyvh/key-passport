'use client';
import { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SnapsProvider } from '@/providers/snapsProvider';
import './globals.css';

interface Props {
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body>
        <SnapsProvider>
          <div className="flex flex-col min-h-screen container max-w-xl mx-auto">
            <Header />
            <main className="my-0 p-8 flex-grow">{props.children}</main>
            <Footer />
          </div>
        </SnapsProvider>
      </body>
    </html>
  );
}
