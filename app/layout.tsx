import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZAUQ COLLECTION - Premium Fashion Brand',
  description: 'Discover luxury fashion at ZAUQ COLLECTION',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}