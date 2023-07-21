import { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import './globals.css';

interface Props {
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen container max-w-xl mx-auto border border-1">
          <Header />
          <main className="my-0 py-16">{props.children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
