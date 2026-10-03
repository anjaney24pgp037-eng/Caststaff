import { ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { AssessmentQuiz } from './AssessmentQuiz';

export function Assessment() {
  const { ref, visible } = useReveal();

  return (
    <section id="assess" className="py-20 lg:py-28 border-b border-[var(--line)]">
      <div className="max-w-[960px] mx-auto px-6">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <h2 className="font-wide font-extrabold text-[clamp(28px,3.8vw,46px)] leading-tight tracking-tight mb-3.5">
            Free AI readiness assessment
          </h2>
          <p className="text-[var(--mute)] max-w-[40em] mb-8 text-lg">
            A free 60-minute session with a senior engineer. You leave with a one-page
            written plan: your top three use cases ranked by value and effort, the data
            gaps to close, and a recommended first build. Try the self-assessment below to
            see where you stand.
          </p>

          <div className="bg-[var(--panel)] border border-[var(--line)] rounded-lg p-6 mb-8">
            <AssessmentQuiz />
          </div>

          <div className="text-center">
            <a
              href="#call"
              className="inline-flex items-center gap-2 px-5 py-3 rounded font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 hover:scale-[1.02]"
            >
              Book your free assessment
              <ChevronRight size={18} />
            </a>
          </div>

          <p className="text-sm text-[var(--mute)] text-center mt-6 max-w-[40em] mx-auto">
            This is an indicative self-assessment, scored on your own answers. The scale and
            structure follow common maturity-model practice. Validate results in a working
            session before making investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
