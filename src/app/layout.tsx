import type {Metadata} from 'next';
import './globals.css';
import { GoogleAnalytics } from './GoogleAnalytics';

export const metadata: Metadata = {
  title: {
    default: 'Angu Wire Mesh — Factory-Direct Gabion Boxes & Rockfall Protection Nets | ISO 9001',
    template: '%s',
  },
  description:
    'Leading Chinese manufacturer of gabion boxes, PVC gabion, Reno mattress, active/passive rockfall protection nets. Factory direct, OEM available. ISO certified, 30+ countries exported.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  verification: {
    google: 'EHjXUQbEQyBPYcUv9s7FJ7zQB7n6Y7Z42fztR4k4MRY',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
