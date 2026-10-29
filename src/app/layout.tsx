import './tokens.css';
import './globals.css';
import './luxury-clinic.css';
import React from 'react';
import CrisisBar from '../components/CrisisBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Better Mind | Integrated Mental Health & Whole-Person Wellness Clinic',
  description: 'Evidence-based psychiatry, clinical psychology, gut-brain nutrition, and somatic therapy in one seamless, coordinated care plan. Consult online across India or in person at designated partner clinic hubs.',
  keywords: 'online psychiatry consultation india, clinical psychologist online, gut brain nutrition, somatic yoga therapy, integrated therapy india, depression anxiety treatment, holistic mental health clinic',
  openGraph: {
    title: 'Better Mind | Integrated Mental Health & Wellness Clinic',
    description: 'Whole-person mental healthcare. Coordinate psychiatry, psychotherapy, clinical nutrition, and somatic movement in one booking.',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body>
        {/* WCAG 2.1 AA Skip Link for Keyboard / Screen Reader Navigation */}
        <a href="#main-content" className="sr-only focus:not-sr-only skip-nav-link">
          Skip to main content
        </a>

        {/* Mandatory 24/7 National Emergency Crisis Bar */}
        <CrisisBar />

        {/* Global Responsive Navigation Header */}
        <Navbar />

        {/* Page Content */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Authoritative Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
