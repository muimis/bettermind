import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Better Mind | Integrated Mental Health & Wellness Clinic',
  description: 'Specialist psychiatry, psychology, nutrition and yoga care in one coordinated clinic plan. Online and in-person sessions in IST.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Mandatory Crisis Help Banner on Every Page (BRIEF.md requirement) */}
        <aside className="crisis-banner" role="complementary" aria-label="Crisis Support Information">
          <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>⚠️ <strong>In acute distress or medical emergency?</strong> Better Mind is not an emergency service.</span>
            <span>Call 24/7 National Helplines: <strong>Tele-MANAS: <a href="tel:14416">14416</a></strong> (Toll-Free) or <strong>KIRAN: <a href="tel:18005990019">1800-599-0019</a></strong> or visit your nearest hospital casualty.</span>
          </div>
        </aside>
        <main>{children}</main>
      </body>
    </html>
  );
}
