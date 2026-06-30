import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickContactModal from './QuickContactModal';

function mockFetchOk() {
  const fn = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  });
  global.fetch = fn as unknown as typeof fetch;
  return fn;
}

/** Submit the form directly (bypasses jsdom's HTML5 constraint validation, which is
 *  inconsistent in tests) so we exercise the component's own validation + submit logic. */
function submitForm() {
  const form = screen.getByPlaceholderText('John Doe').closest('form')!;
  fireEvent.submit(form);
}

describe('QuickContactModal', () => {
  beforeEach(() => {
    mockFetchOk();
  });

  it('renders nothing when closed', () => {
    render(<QuickContactModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText("Let's talk")).not.toBeInTheDocument();
  });

  it('renders through a portal to document.body when open', async () => {
    const { container } = render(<QuickContactModal isOpen onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement(); // portaled out of its own container
    const heading = await screen.findByText("Let's talk");
    expect(document.body).toContainElement(heading); // …and into the body
  });

  it('shows the Name field so it is always reachable', async () => {
    render(<QuickContactModal isOpen onClose={() => {}} />);
    expect(await screen.findByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('john@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('(312) 555-0123')).toBeInTheDocument();
  });

  it('requires a name', async () => {
    const fetchFn = mockFetchOk();
    render(<QuickContactModal isOpen onClose={() => {}} />);
    await screen.findByPlaceholderText('John Doe');
    submitForm();
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('requires an email or phone', async () => {
    render(<QuickContactModal isOpen onClose={() => {}} />);
    await userEvent.type(await screen.findByPlaceholderText('John Doe'), 'Jane Doe');
    submitForm();
    expect(await screen.findByText(/add an email or phone/i)).toBeInTheDocument();
  });

  it('rejects an invalid email', async () => {
    render(<QuickContactModal isOpen onClose={() => {}} />);
    await userEvent.type(await screen.findByPlaceholderText('John Doe'), 'Jane');
    await userEvent.type(screen.getByPlaceholderText('john@email.com'), 'not-an-email');
    submitForm();
    expect(await screen.findByText(/doesn.t look right/i)).toBeInTheDocument();
  });

  it('submits a valid lead and shows the success state', async () => {
    const fetchFn = mockFetchOk();
    render(<QuickContactModal isOpen onClose={() => {}} />);
    await userEvent.type(await screen.findByPlaceholderText('John Doe'), 'Jane Doe');
    await userEvent.type(screen.getByPlaceholderText('john@email.com'), 'jane@example.com');
    submitForm();

    await waitFor(() =>
      expect(fetchFn).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({ method: 'POST' })
      )
    );
    const body = JSON.parse((fetchFn.mock.calls[0][1] as RequestInit).body as string);
    expect(body).toMatchObject({ name: 'Jane Doe', email: 'jane@example.com' });

    expect(await screen.findByText(/you.re all set/i)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<QuickContactModal isOpen onClose={onClose} />);
    await userEvent.click(await screen.findByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
