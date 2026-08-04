import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ZAUQ COLLECTION',
  description: 'Premium Fashion Brand',
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
        <Toaster />
      </body>
    </html>
  );
}