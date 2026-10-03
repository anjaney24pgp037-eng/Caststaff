import { MessageSquare } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export function CaseStudies() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[1160px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5">
            Case studies
          </h2>
          <p className="text-[var(--mute)] max-w-[36em] mb-8 text-lg">
            We are a new company, so we are not padding this page.
          </p>

          <div className="border-2 border-dashed border-[var(--mute)] rounded-lg p-8 flex flex-wrap justify-between items-center gap-6">
            <p className="max-w-[34em] text-[var(--mute)] text-lg flex items-start gap-3">
              <MessageSquare size={24} className="text-accent flex-none mt-0.5" />
              Our first engagements are in progress. We will publish results here once
              clients approve. On a discovery call we can walk through how we would
              approach your problem.
            </p>
            <a
              href="#call"
              className="inline-flex items-center gap-2 px-5 py-3 rounded font-semibold border-2 border-current hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
