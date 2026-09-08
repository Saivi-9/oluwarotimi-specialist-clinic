import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    let metadataBase: URL | undefined;
    try {
    metadataBase = siteUrl ? new URL(siteUrl) : undefined;
    } catch {
    metadataBase = undefined;
    }

    export const metadata: Metadata = {
    ...(metadataBase ? { metadataBase } : {}),
  title: 'Oluwarotimi Specialist Clinic | Heart & Diagnostic Care in Akure',
  description: 'Thoughtful cardiology consultations, diagnostic testing and clear appointment guidance from Oluwarotimi Specialist Clinic in Akure, Ondo State.',
  openGraph: {
    title: 'Oluwarotimi Specialist Clinic',
    description: 'Heart-focused care and diagnostic support in Akure, Ondo State.',
    type: 'website',
    images: [{ url: '/olumaro-clinic-logo.jpg', alt: 'Oluwarotimi Specialist Clinic & Diagnostic Centre logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oluwarotimi Specialist Clinic',
    description: 'Heart-focused care and diagnostic support in Akure, Ondo State.',
    images: ['/olumaro-clinic-logo.jpg'],
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
