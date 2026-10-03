import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const faqs = [
  {
    q: 'Which models and tools do you use?',
    a: 'Whatever fits: hosted APIs, open-weight models or a mix. We test several on your data before committing.',
  },
  {
    q: 'How long until we see something working?',
    a: 'Usually a prototype within two to three weeks of kickoff.',
  },
  {
    q: 'Do we need clean data first?',
    a: 'Not necessarily. The assessment shows what is needed, and we often fix data in parallel.',
  },
  {
    q: 'What happens to our data?',
    a: 'It stays in your environment wherever possible, and we agree handling rules before work starts.',
  },
];

export function FAQ() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-10">
            Questions we hear
          </h2>

          <div className="max-w-[760px]">
            {faqs.map((f, i) => (
              <div key={i} className="border-t border-[var(--line)] first:border-t-0">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left font-semibold gap-4 group"
                  aria-expanded={open === i}
                >
                  <span className="group-hover:text-accent transition-colors">{f.q}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-none transition-transform duration-300 text-accent ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    open === i ? 'max-h-40 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-[var(--mute)] leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
