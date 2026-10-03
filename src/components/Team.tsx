import { useReveal } from '@/hooks/useReveal';

const companies = ['IBM', 'Flipkart', 'Walmart', 'Microsoft', "Lowe's", 'Coursera'];

export function Team() {
  const { ref, visible } = useReveal();

  return (
    <section id="team" className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5 max-w-[17em]">
            A team of IIT and IIM alumni who cast systems that stay.
          </h2>
          <p className="text-[var(--mute)] max-w-[36em] mb-10 text-lg">
            Like a casting, a system should hold its shape under load and long after it
            leaves our hands. Between us we have worked on large products and platforms at:
          </p>

          <div className="flex flex-wrap gap-3 mb-5">
            {companies.map((c) => (
              <span
                key={c}
                className="px-5 py-3 border-2 border-ink-900 dark:border-white rounded font-wide font-bold text-lg bg-[var(--panel)] transition-all hover:scale-105 hover:border-accent hover:text-accent cursor-default"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="text-sm text-[var(--mute)] max-w-[36em]">
            These are former employers of our team members, not client endorsements. You
            work directly with senior people from day one.
          </p>
        </div>
      </div>
    </section>
  );
}
