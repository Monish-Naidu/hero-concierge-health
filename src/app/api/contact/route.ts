import { NextRequest, NextResponse } from 'next/server';

// Simple lead-capture endpoint for the "Get a Callback" header form.
// Records the lead so the team can follow up. No external API key required —
// if an email/CRM integration is added later, hook it in where noted below.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

    // Validation: name is required, plus at least one way to reach them.
    if (!name) {
      return NextResponse.json(
        { ok: false, message: 'Please tell us your name.' },
        { status: 400 }
      );
    }
    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, message: 'Please give us an email or phone number.' },
        { status: 400 }
      );
    }

    const lead = {
      name,
      email,
      phone,
      receivedAt: new Date().toISOString(),
      source: 'header-callback-form',
    };

    // For now we log the lead so it's captured on the server.
    // TODO: forward to email/CRM (e.g. info@heromenshealth.com) once credentials are available.
    console.log('[Callback Lead]', lead);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Callback Lead] error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
