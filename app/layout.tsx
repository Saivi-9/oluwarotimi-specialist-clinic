import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cardiocare-clinic-preview.skylietimm39.chatgpt.site'),
  title: 'Oluwarotimi Specialist Clinic & Diagnostic Centre | Cardiology information',
  description: 'Clear cardiology information and consultation guidance for patients and families.',
  openGraph: {
    title: 'Oluwarotimi Specialist Clinic',
    description: 'Clear cardiology information and consultation guidance for patients and families.',
    type: 'website',
    images: [
      {
        url: 'https://cardiocare-clinic-preview.skylietimm39.chatgpt.site/olumaro-clinic-logo.jpg',
        alt: 'Oluwarotimi Specialist Clinic & Diagnostic Centre logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oluwarotimi Specialist Clinic',
    description: 'Clear cardiology information and consultation guidance for patients and families.',
    images: ['https://cardiocare-clinic-preview.skylietimm39.chatgpt.site/olumaro-clinic-logo.jpg'],
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
