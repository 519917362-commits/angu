import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Paiqi Wire Mesh - Professional Gabion Box & Rockfall Protection Net Manufacturer',
    template: '%s | Paiqi Wire Mesh',
  },
  description:
    'Leading Chinese manufacturer of gabion boxes, PVC gabion, Reno mattress, active/passive rockfall protection nets. Factory direct, OEM available. ISO certified, 30+ countries exported.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
