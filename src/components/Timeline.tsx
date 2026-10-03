import { Search, Prototype, Build, TrendingUp } from './TimelineIcons';
import { useReveal } from '@/hooks/useReveal';

const phases = [
  {
    icon: Search,
    period: 'Week 1',
    title: 'Discover',
    desc: 'We map goals, data and constraints, and agree how success will be measured.',
  },
  {
    icon: Prototype,
    period: 'Weeks 2 to 3',
    title: 'Prototype',
    desc: 'A working slice tested on real inputs, so risks show up early.',
  },
  {
    icon: Build,
    period: 'Weeks 4 to 8',
    title: 'Build',
    desc: 'The production system, with evaluations, monitoring and documentation.',
  },
  {
    icon: TrendingUp,
    period: 'After launch',
    title: 'Improve',
    desc: 'We track quality and cost, then tune. Your team can take over at any point.',
  },
];

export function Timeline() {
  const { ref, visible } = useReveal();

  return (
    <section id="process" className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5">
            How an engagement runs
          </h2>
          <p className="text-[var(--mute)] max-w-[36em] mb-12 text-lg">
            Short cycles, working software at every step.
          </p>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/40 to-transparent" />

            {phases.map((p, i) => (
              <div
                key={p.title}
                className="relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--bg)] border-[3px] border-accent flex items-center justify-center mb-4 transition-transform hover:scale-110">
                  <p.icon size={20} className="text-accent" />
                </div>
                <p className="text-accent text-sm font-semibold mb-1">{p.period}</p>
                <h3 className="font-wide text-xl mb-1.5">{p.title}</h3>
                <p className="text-[var(--mute)] text-[15px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
