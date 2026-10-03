import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { FlowDiagram } from './FlowDiagram';

export function Hero() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert({
      email,
      message: message || null,
      source: 'hero',
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div id="top" className="relative bg-ink-900 text-white overflow-hidden grid-bg">
      {/* gradient glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-mint/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1160px] mx-auto px-6 pt-36 pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 items-center">
          {/* Left: copy + form */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              Accepting new engagements
            </div>

            <h1 className="font-stretched font-black text-[clamp(40px,6vw,76px)] leading-[0.98] tracking-tight mb-6">
              We cast AI systems<br />
              that <span className="text-mint">stay.</span>
            </h1>

            <p className="text-lg max-w-[32em] text-white/75 mb-6 leading-relaxed">
              We design, build and evaluate LLM applications and data foundations
              for startups and scale-ups, then hand over systems your team owns
              and can keep running.
            </p>

            <p className="text-[15px] text-mint max-w-[32em] mb-8">
              Founded by a team of IIT and IIM alumni who have built and shipped
              at IBM, Flipkart, Walmart, Microsoft, Lowe's and Coursera.
            </p>

            {/* Quick form */}
            <form onSubmit={handleSubmit} className="grid gap-2.5 max-w-[470px]">
              <input
                type="email"
                placeholder="Work email"
                aria-label="Work email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-3 rounded border border-white/15 bg-white/[0.06] text-white placeholder-white/40 focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all"
              />
              <textarea
                rows={2}
                placeholder="What are you trying to build or fix with AI?"
                aria-label="What are you building"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-3 rounded border border-white/15 bg-white/[0.06] text-white placeholder-white/40 focus:border-accent-light focus:ring-1 focus:ring-accent-light outline-none transition-all resize-none"
              />
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded font-semibold bg-accent-light text-ink-900 hover:bg-mint transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                  {status === 'success' ? 'Sent' : 'Book a discovery call'}
                </button>
                <a href="#assess" className="text-[15px] text-white/70 hover:text-white transition-colors">
                  or try the free AI assessment
                </a>
              </div>
              {status === 'success' && (
                <p className="text-mint text-sm animate-fade-in">
                  Thanks! We'll be in touch within one business day.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again or email hello@caststaff.com.
                </p>
              )}
            </form>
          </div>

          {/* Right: animated SVG diagram */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <FlowDiagram />
          </div>
        </div>
      </div>

      {/* Tag marquee */}
      <TagMarquee />
    </div>
  );
}

const tags = [
  'RAG systems',
  'Agents and tool use',
  'Evaluation suites',
  'Fine-tuning',
  'Data pipelines',
  'Vector search',
  'LLMOps',
  'Governance',
];

function TagMarquee() {
  return (
    <div className="relative border-t border-white/10 overflow-hidden py-4">
      <div className="flex gap-2.5 animate-slide whitespace-nowrap">
        {[...tags, ...tags].map((t, i) => (
          <span
            key={i}
            className="px-3.5 py-1.5 border border-white/15 rounded-full text-sm text-white/50 flex-none"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
