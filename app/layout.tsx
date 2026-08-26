import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cardiocare-clinic-preview.skylietimm39.chatgpt.site'),
  title: 'Oluwarotimi Specialist Clinic & Diagnostic Centre | Cardiology care in Akure',
  description: 'Consultant cardiology care, diagnostic testing and clear appointment guidance in Akure, Ondo State.',
  openGraph: {
    title: 'Oluwarotimi Specialist Clinic',
    description: 'Consultant cardiology care, diagnostic testing and appointment guidance in Akure, Ondo State.',
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
    description: 'Consultant cardiology care, diagnostic testing and appointment guidance in Akure, Ondo State.',
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
