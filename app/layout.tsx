import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Olumaro Medical Specialist Clinic | Cardiology information and consultations',
  description: 'Clear cardiology information and consultation guidance for patients and families.',
  openGraph: {
    title: 'Olumaro Medical Specialist Clinic',
    description: 'Clear cardiology information and consultation guidance for patients and families.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Olumaro Medical Specialist Clinic - Clear cardiology information',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olumaro Medical Specialist Clinic',
    description: 'Clear cardiology information and consultation guidance for patients and families.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
