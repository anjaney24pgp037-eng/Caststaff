import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useReveal } from '@/hooks/useReveal';

export function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      message: form.message || null,
      source: 'discovery_call',
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    }
  };

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <section id="call" className="py-20 lg:py-28">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} grid lg:grid-cols-[0.9fr_1.1fr] gap-12`}>
          <div>
            <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5">
              Tell us what you are building.
            </h2>
            <p className="text-[var(--mute)] max-w-[36em] text-lg">
              A 30-minute discovery call. You describe the problem; we tell you honestly
              whether and how AI fits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              placeholder="Name"
              required
              value={form.name}
              onChange={update('name')}
              className="w-full px-3.5 py-3 rounded border-[1.5px] border-[var(--line)] bg-[var(--panel)] text-ink-900 dark:text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Work email"
              required
              value={form.email}
              onChange={update('email')}
              className="w-full px-3.5 py-3 rounded border-[1.5px] border-[var(--line)] bg-[var(--panel)] text-ink-900 dark:text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
            <input
              placeholder="Company"
              value={form.company}
              onChange={update('company')}
              className="w-full px-3.5 py-3 rounded border-[1.5px] border-[var(--line)] bg-[var(--panel)] text-ink-900 dark:text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
            <textarea
              rows={4}
              placeholder="What are you trying to solve?"
              value={form.message}
              onChange={update('message')}
              className="w-full px-3.5 py-3 rounded border-[1.5px] border-[var(--line)] bg-[var(--panel)] text-ink-900 dark:text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 hover:scale-[1.01] disabled:opacity-60"
            >
              {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
              {status === 'success' && <CheckCircle2 size={18} />}
              {status === 'idle' && <ArrowRight size={18} />}
              {status === 'error' && <ArrowRight size={18} />}
              {status === 'success' ? 'Request sent' : 'Book a discovery call'}
            </button>
            {status === 'success' && (
              <p className="text-mint text-sm animate-fade-in">
                Thanks, {form.name || 'there'}! We'll reach out within one business day to schedule the call.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm">
                Something went wrong. Please try again or email hello@caststaff.com directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
