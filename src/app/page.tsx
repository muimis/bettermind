export default function HomePage() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Better Mind</h1>
      <p>Online clinic booking — coming soon.</p>
      <p style={{ color: '#666', marginTop: '2rem' }}>
        API routes available at <code>/api/staff/services</code>, <code>/api/staff/bookings</code>, <code>/api/staff/auth</code>
      </p>
    </main>
  );
}
