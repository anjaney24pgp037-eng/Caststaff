import { Ruler, Shield, Users } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const principles = [
  {
    icon: Ruler,
    title: 'Measure first',
    desc: 'No feature ships without a test set and a target. Quality is a number, not a feeling.',
  },
  {
    icon: Shield,
    title: 'Cast to last',
    desc: 'Systems are tested, documented and handed over. Code, prompts, data and evals are yours, with no lock-in to us or to one model vendor.',
  },
  {
    icon: Users,
    title: 'Small and senior',
    desc: 'Experienced engineers do the work directly, with no layers between you and them.',
  },
];

export function Principles() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-12">
            How we work
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="group relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="p-4 rounded-lg bg-accent/10 w-fit mb-4 transition-transform group-hover:scale-110">
                  <p.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-wide text-xl mb-2">{p.title}</h3>
                <p className="text-[var(--mute)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
