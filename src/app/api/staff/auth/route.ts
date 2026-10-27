import { NextResponse } from 'next/server';
import { globalBookingStore } from '@/lib/booking-store';

const STAFF_USERS = [
  {
    email: 'admin@bettermind.clinic',
    password: 'admin',
    name: 'Clinic Administrator',
    role: 'admin',
    practitioner_id: undefined
  },
  {
    email: 'coordinator@bettermind.clinic',
    password: 'coord',
    name: 'Ananya Roy (Care Coordinator)',
    role: 'coordinator',
    practitioner_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'
  },
  {
    email: 'dr.arun@bettermind.clinic',
    password: 'arun',
    name: 'Dr. Arun Nair (Psychiatrist)',
    role: 'practitioner',
    practitioner_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  },
  {
    email: 'dr.meera@bettermind.clinic',
    password: 'meera',
    name: 'Dr. Meera Sen (Psychologist)',
    role: 'practitioner',
    practitioner_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
  }
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = STAFF_USERS.find(u => u.email.toLowerCase() === (email || '').toLowerCase());

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        practitioner_id: user.practitioner_id
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
