import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'ZAUQ COLLECTION - Premium Fashion Brand',
  description: 'Discover luxury fashion at ZAUQ COLLECTION. Premium clothing for men and women in Pakistan.',
  keywords: 'ZAUQ, fashion, premium clothing, Pakistani fashion, designer wear',
  authors: [{ name: 'ZAUQ COLLECTION' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}