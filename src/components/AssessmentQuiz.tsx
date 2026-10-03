import { useState } from 'react';
import { ArrowRight, RotateCcw, CheckCircle2, Loader2, Printer, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Question {
  d?: number;
  t: string;
  o: string[];
}

const DIMENSIONS: [string, string, number][] = [
  ['Strategy and value', 'Strategy', 0.20],
  ['Data', 'Data', 0.20],
  ['Technology and infrastructure', 'Technology', 0.15],
  ['Talent and adoption', 'Talent', 0.15],
  ['Governance and risk', 'Governance', 0.15],
  ['AI in use and operations', 'Operations', 0.15],
];

const CONTEXT_QS: Question[] = [
  { t: 'Which area do you most want AI to improve?', o: ['Customer support', 'Sales and marketing', 'Operations and back office', 'Our product', 'Analytics and decisions'] },
  { t: 'Where are you on the AI journey today?', o: ['Not started', 'Running experiments', 'A pilot is live', 'In production'] },
];

const SECTION_QS: [number, string, string[]][] = [
  [0, 'How well defined is the business case for AI?', ['No defined case', 'Ideas listed, not prioritised', 'Prioritised use cases with estimated value', 'Funded use cases with owners and target KPIs']],
  [0, 'How is AI aligned with company strategy?', ['Not discussed by leadership', 'Discussed informally', 'Part of the annual plan', 'Tracked by leadership against outcomes']],
  [0, 'What budget and delivery plan exist?', ['None', 'Exploratory budget only', 'Budget for a first release', 'Multi-quarter budget and roadmap']],
  [1, 'Where does the data for your priority use case live?', ['Scattered across files and tools', 'Mostly in a few operational systems', 'Consolidated in a warehouse or lake', 'Governed, catalogued and owned by domain']],
  [1, 'How would you rate its quality and documentation?', ['Quality unknown', 'Known issues, little documentation', 'Quality monitored, partly documented', 'Quality targets and full lineage']],
  [1, 'How do applications access the data?', ['Manual exports', 'Reports and ad hoc queries', 'APIs or SQL for most sources', 'Versioned, tested pipelines']],
  [2, 'What does your cloud and platform setup look like?', ['Mostly on-premises or ad hoc', 'Cloud for some workloads', 'Cloud-native with standard environments', 'Infrastructure as code with CI/CD']],
  [2, 'How would AI connect to your existing systems?', ['No integration path yet', 'Possible through manual steps', 'APIs exist for key systems', 'API-first or event-driven architecture']],
  [2, 'What tooling exists to build and deploy AI?', ['None', 'Individual tools and notebooks', 'Shared tooling for experiments', 'Standard path from experiment to production']],
  [3, 'What AI and data skills do you have in-house?', ['None', 'A few people experimenting', 'A small dedicated team', 'Cross-functional team with MLOps or LLMOps skills']],
  [3, 'Who will own the system after launch?', ['Nobody identified', 'A part-time owner', 'A named engineering owner', 'Dedicated product and engineering ownership']],
  [3, 'How ready are users to adopt AI in their workflow?', ['Unaware or resistant', 'Curious, no training', 'Training and champions in place', 'Adoption tracked with feedback loops']],
  [4, 'What security and privacy requirements apply?', ['Not yet assessed', 'Assessed, not documented', 'Documented policies', 'Documented and reviewed by security or legal']],
  [4, 'How would you evaluate model quality?', ['No defined method', 'Manual spot checks', 'Test set with pass criteria', 'Automated evals and production monitoring']],
  [4, 'How are AI risks handled (errors, bias, misuse)?', ['Not considered', 'Handled case by case', 'Risk review before launch', 'Standing policy, human oversight and audit trail']],
  [5, 'What AI do you use today?', ['None', 'Individuals use public tools', 'Approved tools in some teams', 'AI embedded in products or core workflows']],
  [5, 'How have past AI projects performed?', ['No projects yet', 'Prototypes that stalled', 'Pilots that delivered value', 'Production systems with measured ROI']],
  [5, 'How do you monitor cost, latency and quality in production?', ['No AI in production', 'Not monitored', 'Basic dashboards', 'Alerts and regular optimisation']],
];

const QUESTIONS: Question[] = [
  ...CONTEXT_QS,
  ...SECTION_QS.map((q) => ({ d: q[0], t: q[1], o: q[2] })),
];

const LEVELS: [string, string][] = [
  ['Nascent', 'Choose one use case and build leadership awareness.'],
  ['Emerging', 'Prepare data and ownership before building.'],
  ['Developing', 'Prototype in a controlled scope while closing gaps.'],
  ['Established', 'Move pilots to production with evals and monitoring.'],
  ['Leading', 'Scale across workflows and optimise cost and quality.'],
];

const ACTIONS = [
  'Define a prioritised use case with a target KPI, budget and timeline.',
  'Consolidate and document the data this use case needs, with reliable access.',
  'Set up shared environments, integration APIs and a path to production.',
  'Name an accountable owner, close skill gaps and plan user adoption.',
  'Agree privacy rules, a risk review and an evaluation plan before building.',
  'Instrument cost, latency and quality, and learn from earlier projects.',
];

const SOLUTIONS: Record<number, string[]> = {
  0: ['Support copilot grounded in your help docs and tickets', 'Ticket triage and routing', 'Self-serve answer assistant with human escalation'],
  1: ['Lead research and qualification agent', 'Proposal and email drafting grounded in your content', 'Call summaries that update the CRM'],
  2: ['Document processing and data extraction', 'Workflow agents with human approval steps', 'Forecasting and anomaly alerts'],
  3: ['In-product assistant', 'Semantic search and recommendations', 'Content generation with guardrails'],
  4: ['Natural-language questions over your warehouse', 'Automated reporting and insights', 'Data quality monitoring'],
};

const STAGES: [string, string][] = [
  ['Explore', 'Pick one use case and a success metric.'],
  ['Prototype', 'A working slice on real data in 2 to 3 weeks.'],
  ['Pilot', 'Real users, with evals and guardrails.'],
  ['Production', 'Hardened, monitored, handed over.'],
  ['Scale', 'More workflows, better quality, lower cost.'],
];

function levelFromScore(p: number): number {
  if (p >= 80) return 4;
  if (p >= 60) return 3;
  if (p >= 40) return 2;
  if (p >= 20) return 1;
  return 0;
}

type Phase = 'intro' | 'quiz' | 'result';

interface Results {
  scores: number[];
  pct: number;
  levelIdx: number;
  focus: number;
  cur: number;
  nxt: number;
  low: number;
}

function computeResults(answers: number[]): Results {
  const sums = [0, 0, 0, 0, 0, 0];
  QUESTIONS.forEach((q, n) => {
    if (q.d !== undefined) sums[q.d] += answers[n];
  });

  const scores = sums.map((s) => Math.round(s / 9 * 100));
  let tot = 0;
  let low = 0;
  scores.forEach((p, k) => {
    tot += p * DIMENSIONS[k][2];
    if (p < scores[low]) low = k;
  });

  const pct = Math.round(tot);
  const levelIdx = levelFromScore(pct);
  const focus = answers[0] || 0;
  const cur = answers[1] || 0;
  const nxt = Math.min(pct >= 50 ? cur + 1 : cur, 4);

  return { scores, pct, levelIdx, focus, cur, nxt, low };
}

function buildSummary(r: Results): string {
  const lines = [
    `Readiness: ${r.pct}/100 (${LEVELS[r.levelIdx][0]})`,
    `Focus: ${QUESTIONS[0].o[r.focus]}`,
    `Journey stage: ${STAGES[r.cur][0]}`,
    ...DIMENSIONS.map((d, k) => `${d[1]}: ${r.scores[k]}`),
    `Binding constraint: ${DIMENSIONS[r.low][0]}`,
  ];
  return lines.join('\n');
}

function RadarChart({ scores }: { scores: number[] }) {
  const c = 160;
  const r = 108;
  const angleFor = (k: number) => (-90 + k * 60) * Math.PI / 180;

  const pts = (f: (k: number) => number) =>
    DIMENSIONS.map((_, k) => {
      const a = angleFor(k);
      return `${(c + r * f(k) * Math.cos(a)).toFixed(1)},${(c + r * f(k) * Math.sin(a)).toFixed(1)}`;
    }).join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 320 320" role="img" aria-label="Radar chart of six readiness dimensions" width="100%">
      {rings.map((f, i) => (
        <polygon key={i} points={pts(() => f)} fill="none" stroke="var(--line)" />
      ))}
      {DIMENSIONS.map((d, k) => {
        const a = angleFor(k);
        const x = c + (r + 22) * Math.cos(a);
        const y = c + (r + 22) * Math.sin(a);
        const an = Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle';
        return (
          <g key={k}>
            <line x1={c} y1={c} x2={(c + r * Math.cos(a)).toFixed(1)} y2={(c + r * Math.sin(a)).toFixed(1)} stroke="var(--line)" />
            <text x={x.toFixed(1)} y={(y + 4).toFixed(1)} textAnchor={an} fontSize="12" fill="var(--ink)" fontFamily="Archivo">
              {d[1]}
            </text>
          </g>
        );
      })}
      <polygon
        points={pts((k) => scores[k] / 100)}
        fill="var(--acc)"
        fillOpacity="0.25"
        stroke="var(--acc)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function AssessmentQuiz() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showMethod, setShowMethod] = useState(false);

  const start = () => { setAnswers([]); setCurrent(0); setPhase('quiz'); };
  const restart = () => { setAnswers([]); setCurrent(0); setPhase('intro'); setEmail(''); setSubmitStatus('idle'); setShowMethod(false); };

  const selectAnswer = (n: number) => {
    const next = [...answers];
    next[current] = n;
    setAnswers(next);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setPhase('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleEmailSubmit = async (r: Results) => {
    if (!email) return;
    setSubmitStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert({
      email,
      message: buildSummary(r),
      source: 'assessment',
      readiness_score: r.pct,
    });
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setEmail('');
    }
  };

  if (phase === 'intro') {
    return (
      <div className="text-center py-6">
        <h3 className="font-stretched font-black text-2xl md:text-3xl mb-3">
          AI Readiness Assessment
        </h3>
        <p className="text-[var(--mute)] max-w-[34em] mx-auto mb-6">
          A structured review across six dimensions: strategy, data, technology, talent,
          governance and operations. You receive a 0 to 100 readiness score, a five-level
          maturity rating, a journey map, matched solutions and a 90-day plan. Twenty
          questions, about six minutes.
        </p>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 hover:scale-[1.02]"
        >
          Begin assessment
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (phase === 'quiz') {
    const q = QUESTIONS[current];
    const progress = (current / QUESTIONS.length) * 100;
    const sectionLabel = q.d === undefined
      ? 'Context'
      : `Section ${q.d + 1} of 6 · ${DIMENSIONS[q.d][0]}`;

    return (
      <div className="animate-fade-in">
        <div className="h-1.5 bg-[var(--line)] rounded overflow-hidden mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-accent to-mint transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[var(--mute)] mb-1">
          Question {current + 1} of {QUESTIONS.length} · {sectionLabel}
        </p>
        <h3 className="font-wide font-bold text-xl md:text-2xl mb-4">{q.t}</h3>
        <div className="grid gap-2 mb-4">
          {q.o.map((o, n) => (
            <button
              key={n}
              onClick={() => selectAnswer(n)}
              className="text-left px-4 py-3 rounded border border-[var(--line)] bg-[var(--bg)] hover:border-accent hover:bg-accent/5 transition-all duration-200 group"
            >
              <span className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full border-2 flex-none transition-all ${answers[current] === n ? 'border-accent bg-accent' : 'border-[var(--line)] group-hover:border-accent'}`} />
                <span className="text-[15px]">{o}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={goBack}
            disabled={current === 0}
            className="text-[var(--mute)] text-sm underline hover:text-accent transition-colors disabled:invisible"
          >
            Back
          </button>
          <span className="text-sm text-[var(--mute)]">Select one to continue</span>
        </div>
      </div>
    );
  }

  // Result phase
  const r = computeResults(answers);
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="animate-fade-in">
      <h3 className="font-stretched font-black text-3xl md:text-4xl mb-1">
        AI Readiness Report
      </h3>
      <p className="text-sm text-[var(--mute)] mb-6">
        {dateStr} · Focus: {QUESTIONS[0].o[r.focus]} · Stage: {STAGES[r.cur][0]}
      </p>

      {/* Summary card */}
      <div className="bg-[var(--panel)] border border-[var(--line)] rounded-lg p-5 mb-8 grid grid-cols-[auto_1fr] gap-7 items-center max-md:grid-cols-1">
        <div className="font-stretched font-black text-5xl md:text-7xl leading-none">
          {r.pct}<span className="text-xl text-[var(--mute)] font-semibold"> / 100</span>
        </div>
        <div>
          <span className="inline-block px-2.5 py-1 rounded bg-accent text-white font-bold text-xs">
            Level {r.levelIdx + 1} · {LEVELS[r.levelIdx][0]}
          </span>
          <p className="mt-2.5 mb-1.5">
            <b>Priority:</b> {LEVELS[r.levelIdx][1]}
          </p>
          <p className="text-sm text-[var(--mute)]">
            Binding constraint: <b>{DIMENSIONS[r.low][0]}</b> ({r.scores[r.low]}). The weakest
            dimension limits how far the others can take you.
          </p>
        </div>
      </div>

      {/* Readiness by dimension: radar + table */}
      <h4 className="font-wide font-extrabold text-xl mb-3 pt-3 border-t-2 border-ink-900 dark:border-white">
        Readiness by dimension
      </h4>
      <div className="grid md:grid-cols-[340px_1fr] gap-6 items-center mb-8 max-md:grid-cols-1">
        <div>
          <RadarChart scores={r.scores} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left text-[var(--mute)] font-semibold py-2 px-2 border-b border-[var(--line)]">Dimension</th>
                <th className="text-left text-[var(--mute)] font-semibold py-2 px-2 border-b border-[var(--line)]">Score</th>
                <th className="text-left text-[var(--mute)] font-semibold py-2 px-2 border-b border-[var(--line)]">Level</th>
                <th className="text-left text-[var(--mute)] font-semibold py-2 px-2 border-b border-[var(--line)]">Finding</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((d, k) => {
                const lvl = levelFromScore(r.scores[k]);
                return (
                  <tr key={k}>
                    <td className="py-2 px-2 border-b border-[var(--line)] align-top"><b>{d[0]}</b></td>
                    <td className="py-2 px-2 border-b border-[var(--line)] align-top">{r.scores[k]}</td>
                    <td className="py-2 px-2 border-b border-[var(--line)] align-top">{LEVELS[lvl][0]}</td>
                    <td className="py-2 px-2 border-b border-[var(--line)] align-top text-[var(--mute)]">
                      {r.scores[k] < 60 ? ACTIONS[k] : 'Solid foundation. Confirm with evidence in a working session.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Journey map */}
      <h4 className="font-wide font-extrabold text-xl mb-3 pt-3 border-t-2 border-ink-900 dark:border-white">
        Position on the AI journey
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 max-md:grid-cols-1">
        {STAGES.map((s, n) => {
          const isCur = n === r.cur;
          const isNx = n === r.nxt && r.nxt !== r.cur;
          return (
            <div
              key={n}
              className={`border rounded p-3 text-sm transition-all ${
                isCur
                  ? 'bg-accent text-white border-accent'
                  : isNx
                  ? 'border-2 border-dashed border-accent'
                  : 'border border-[var(--line)] bg-[var(--panel)]'
              }`}
            >
              <span className="block text-xs font-bold mb-1 min-h-[14px]">
                {isCur ? 'You are here' : isNx ? 'Next step' : ''}
              </span>
              <b className="block text-[15px] mb-0.5">{s[0]}</b>
              <span className={isCur ? 'text-white/80' : 'text-[var(--mute)]'}>{s[1]}</span>
            </div>
          );
        })}
      </div>
      {r.nxt === r.cur && (
        <p className="text-sm text-[var(--mute)] mb-6">
          Score is below the threshold for the next stage. Close the gaps above first.
        </p>
      )}

      {/* Recommended solutions */}
      <h4 className="font-wide font-extrabold text-xl mb-2 pt-3 border-t-2 border-ink-900 dark:border-white">
        Recommended solutions
      </h4>
      <p className="text-sm text-[var(--mute)] mb-4">
        Matched to your focus on {QUESTIONS[0].o[r.focus].toLowerCase()}.
      </p>
      <div className="mb-8">
        {SOLUTIONS[r.focus].map((s, n) => (
          <div key={n} className="border-l-[3px] border-accent pl-3.5 mb-2.5">
            <h5 className="font-semibold text-[15px] m-0">{n ? 'Then: ' : 'Start with: '}{s}</h5>
          </div>
        ))}
      </div>

      {/* 90-day plan */}
      <h4 className="font-wide font-extrabold text-xl mb-3 pt-3 border-t-2 border-ink-900 dark:border-white">
        First 90 days
      </h4>
      <div className="grid md:grid-cols-3 gap-3 mb-8 max-md:grid-cols-1">
        <div className="bg-[var(--panel)] border border-[var(--line)] rounded p-4 text-sm">
          <b className="text-accent block mb-1">Days 1 to 30</b>
          {ACTIONS[r.low]}
        </div>
        <div className="bg-[var(--panel)] border border-[var(--line)] rounded p-4 text-sm">
          <b className="text-accent block mb-1">Days 31 to 60</b>
          Prototype "{SOLUTIONS[r.focus][0].toLowerCase()}" on real data and build the evaluation set.
        </div>
        <div className="bg-[var(--panel)] border border-[var(--line)] rounded p-4 text-sm">
          <b className="text-accent block mb-1">Days 61 to 90</b>
          {r.cur >= 2
            ? 'Harden the pilot, add monitoring and cost controls, and plan handover.'
            : 'Run a pilot with a small group. Track quality, cost and latency, then decide on rollout.'}
        </div>
      </div>

      {/* Methodology */}
      <div className="mb-6">
        <button
          onClick={() => setShowMethod((v) => !v)}
          className="font-semibold text-[15px] flex items-center gap-2 hover:text-accent transition-colors"
        >
          <ChevronDown size={18} className={`transition-transform ${showMethod ? 'rotate-180' : ''}`} />
          Methodology and limits
        </button>
        {showMethod && (
          <p className="text-sm text-[var(--mute)] mt-2.5 leading-relaxed">
            Each answer scores 0 to 3. A dimension score is its three answers rescaled to 0
            to 100. The overall score is a weighted average: strategy 20%, data 20%,
            technology 15%, talent 15%, governance 15%, operations 15%. Levels: Nascent 0 to
            19, Emerging 20 to 39, Developing 40 to 59, Established 60 to 79, Leading 80 to
            100. Results are self-reported and unaudited, so treat them as a starting hypothesis.
          </p>
        )}
      </div>

      {/* Next step: email capture */}
      <h4 className="font-wide font-extrabold text-xl mb-3 pt-3 border-t-2 border-ink-900 dark:border-white">
        Next step
      </h4>
      <div className="bg-[var(--panel)] border border-[var(--line)] rounded-lg p-5">
        <p className="mb-4">
          Review these results with a senior engineer in a free 60-minute session and leave
          with a one-page written plan.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <input
            type="email"
            placeholder="Work email"
            aria-label="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-[220px] px-3 py-3 rounded border border-[var(--line)] bg-[var(--bg)] text-ink-900 dark:text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
          />
          <button
            onClick={() => handleEmailSubmit(r)}
            disabled={!email || submitStatus === 'loading'}
            className="inline-flex items-center gap-2 px-5 py-3 rounded font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-200 disabled:opacity-50"
          >
            {submitStatus === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
            Book my free assessment
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded font-semibold border-[1.5px] border-current hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
          >
            <Printer size={18} />
            Print or save as PDF
          </button>
        </div>
        {submitStatus === 'success' && (
          <p className="text-mint text-sm mt-3 flex items-center gap-2">
            <CheckCircle2 size={16} /> Thanks! We'll be in touch within one business day.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 text-sm mt-3">
            Something went wrong. Please try again or email hello@caststaff.com.
          </p>
        )}
      </div>

      <button
        onClick={restart}
        className="text-[var(--mute)] text-sm underline hover:text-accent transition-colors mt-4 inline-flex items-center gap-1.5"
      >
        <RotateCcw size={14} /> Start over
      </button>
    </div>
  );
}
