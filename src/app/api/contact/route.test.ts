// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { POST } from './route';

/** Minimal stand-in for a NextRequest — the handler only calls .json(). */
function req(body: unknown) {
  return { json: async () => body } as unknown as Request;
}

describe('POST /api/contact (lead capture)', () => {
  it('rejects a missing name', async () => {
    const res = await POST(req({ email: 'a@b.com' }) as never);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.message).toMatch(/name/i);
  });

  it('rejects when neither email nor phone is provided', async () => {
    const res = await POST(req({ name: 'Jane Doe' }) as never);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.message).toMatch(/email or phone/i);
  });

  it('accepts a lead with name + email', async () => {
    const res = await POST(req({ name: 'Jane Doe', email: 'jane@example.com' }) as never);
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it('accepts a lead with name + phone only', async () => {
    const res = await POST(req({ name: 'Jane Doe', phone: '+13125550123' }) as never);
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it('trims whitespace and treats a blank name as missing', async () => {
    const res = await POST(req({ name: '   ', email: 'a@b.com' }) as never);
    expect(res.status).toBe(400);
  });

  it('returns 500 on a malformed body', async () => {
    const bad = {
      json: async () => {
        throw new Error('bad json');
      },
    } as unknown as Request;
    const res = await POST(bad as never);
    expect(res.status).toBe(500);
    expect((await res.json()).ok).toBe(false);
  });
});
