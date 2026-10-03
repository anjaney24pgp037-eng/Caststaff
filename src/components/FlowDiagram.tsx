export function FlowDiagram() {
  return (
    <svg
      viewBox="0 0 560 340"
      role="img"
      aria-label="Diagram: your data flows through retrieval and pipelines into a model, monitored by evaluations"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A2855" />
          <stop offset="100%" stopColor="#121C45" />
        </linearGradient>
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8EA0FF" />
          <stop offset="100%" stopColor="#7CF0C8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      <path d="M150 170C185 170 185 76 215 76" fill="none" stroke="#7CF0C8" strokeWidth="2" strokeDasharray="6 8" className="animate-flow" />
      <path d="M150 170C185 170 185 264 215 264" fill="none" stroke="#7CF0C8" strokeWidth="2" strokeDasharray="6 8" className="animate-flow" />
      <path d="M345 76C380 76 380 170 410 170" fill="none" stroke="#7CF0C8" strokeWidth="2" strokeDasharray="6 8" className="animate-flow" />
      <path d="M345 264C380 264 380 170 410 170" fill="none" stroke="#7CF0C8" strokeWidth="2" strokeDasharray="6 8" className="animate-flow" />
      <path d="M475 196V270" fill="none" stroke="#7CF0C8" strokeWidth="2" strokeDasharray="6 8" className="animate-flow" />

      {/* Nodes */}
      <g>
        <rect x="20" y="144" width="130" height="52" rx="8" fill="url(#nodeGrad)" stroke="#8EA0FF" strokeWidth="1.5" filter="url(#glow)" />
        <text x="36" y="168" fill="#EAF0F8" fontWeight="600" fontSize="15" fontFamily="Archivo">Your data</text>
        <text x="36" y="184" fill="#EAF0F8" fontSize="11" opacity="0.5" fontFamily="Archivo">docs, DBs, APIs</text>
      </g>
      <g>
        <rect x="215" y="50" width="130" height="52" rx="8" fill="url(#nodeGrad)" stroke="#8EA0FF" strokeWidth="1.5" filter="url(#glow)" />
        <text x="231" y="74" fill="#EAF0F8" fontWeight="600" fontSize="15" fontFamily="Archivo">Retrieval</text>
        <text x="231" y="90" fill="#EAF0F8" fontSize="11" opacity="0.5" fontFamily="Archivo">search + rerank</text>
      </g>
      <g>
        <rect x="215" y="238" width="130" height="52" rx="8" fill="url(#nodeGrad)" stroke="#8EA0FF" strokeWidth="1.5" filter="url(#glow)" />
        <text x="231" y="262" fill="#EAF0F8" fontWeight="600" fontSize="15" fontFamily="Archivo">Pipelines</text>
        <text x="231" y="278" fill="#EAF0F8" fontSize="11" opacity="0.5" fontFamily="Archivo">clean, version</text>
      </g>
      <g>
        <rect x="410" y="144" width="130" height="52" rx="8" fill="url(#keyGrad)" stroke="#8EA0FF" strokeWidth="1.5" filter="url(#glow)" />
        <text x="426" y="168" fill="#0A1230" fontWeight="700" fontSize="15" fontFamily="Archivo">Model</text>
        <text x="426" y="184" fill="#0A1230" fontSize="11" opacity="0.6" fontFamily="Archivo">prompts, tools</text>
      </g>
      <g>
        <rect x="410" y="270" width="130" height="52" rx="8" fill="url(#nodeGrad)" stroke="#8EA0FF" strokeWidth="1.5" filter="url(#glow)" />
        <text x="426" y="294" fill="#EAF0F8" fontWeight="600" fontSize="15" fontFamily="Archivo">Evals</text>
        <text x="426" y="310" fill="#EAF0F8" fontSize="11" opacity="0.5" fontFamily="Archivo">quality, cost</text>
      </g>
    </svg>
  );
}
