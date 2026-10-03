import { Brain, Map, Database, Gauge } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const services = [
  {
    icon: Brain,
    title: 'Custom AI and LLM solutions',
    desc: 'Copilots, retrieval systems and agents built on your data, with the model chosen for the job and tested on your own cases.',
    points: ['Code and prompts you own', 'Cost and latency budgets from day one', 'Guardrails and fallbacks'],
    featured: true,
  },
  {
    icon: Map,
    title: 'AI strategy and roadmaps',
    desc: 'A ranked view of where AI pays off in your product and operations, and what to build in the next two quarters.',
    points: ['Use-case scoring by value and effort', 'Build, buy or fine-tune decisions', 'Team and tooling plan'],
  },
  {
    icon: Database,
    title: 'Data foundations',
    desc: 'Pipelines, warehouses and quality checks so models get clean, current inputs.',
  },
  {
    icon: Gauge,
    title: 'Evaluation and LLMOps',
    desc: 'Test sets, regression checks and monitoring that catch quality drops before users do.',
  },
];

export function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="build" className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5">
            What we build
          </h2>
          <p className="text-[var(--mute)] max-w-[36em] mb-10 text-lg">
            Two core offers, backed by the data and evaluation work that makes them reliable.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`rounded-lg border p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                  s.featured
                    ? 'bg-ink-900 text-white border-ink-900 md:col-span-2'
                    : 'bg-[var(--panel)] border-[var(--line)]'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-none ${s.featured ? 'bg-white/10' : 'bg-accent/10'}`}>
                    <s.icon size={24} className={s.featured ? 'text-mint' : 'text-accent'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-wide text-xl mb-2.5">{s.title}</h3>
                    <p className={s.featured ? 'text-white/70' : 'text-[var(--mute)]'}>
                      {s.desc}
                    </p>
                    {s.points && (
                      <ul className="mt-3.5 space-y-1.5">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className={`flex items-center gap-2 text-[15px] ${
                              s.featured ? 'text-white/80' : 'text-[var(--mute)]'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${s.featured ? 'bg-mint' : 'bg-accent'}`} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
