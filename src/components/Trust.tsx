import { ClipboardCheck, Lock, ShieldAlert, Clock } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const safeguards = [
  {
    icon: ClipboardCheck,
    title: 'Evaluations before launch',
    desc: 'A test set built from your real cases, with pass targets agreed up front and regression checks on every change.',
  },
  {
    icon: Lock,
    title: 'Your data stays yours',
    desc: 'Work happens in your environment where possible, with least-privilege access and handling rules agreed before kickoff.',
  },
  {
    icon: ShieldAlert,
    title: 'Guardrails and fallbacks',
    desc: 'Input and output checks, safe refusals, and human review where the stakes call for it.',
  },
  {
    icon: Clock,
    title: 'Cost and latency budgets',
    desc: 'Per-request spend and response times are tracked from the prototype onwards, so there are no surprises at scale.',
  },
];

export function Trust() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5">
            How we build AI you can trust
          </h2>
          <p className="text-[var(--mute)] max-w-[36em] mb-12 text-lg">
            Early-stage teams still need production-grade safeguards. These come standard.
          </p>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {safeguards.map((s, i) => (
              <div
                key={s.title}
                className="border-l-[3px] border-accent pl-5 transition-transform hover:translate-x-1"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <s.icon size={20} className="text-accent" />
                  <h3 className="font-wide text-xl">{s.title}</h3>
                </div>
                <p className="text-[var(--mute)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
