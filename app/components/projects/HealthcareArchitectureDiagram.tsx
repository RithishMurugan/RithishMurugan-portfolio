"use client";

const NODES = [
  { id: "ehr", label: "EHR / FHIR", sub: "Clinical data", x: 8, y: 50 },
  { id: "kafka", label: "Kafka", sub: "Event bus", x: 28, y: 28 },
  { id: "api", label: "FastAPI", sub: "Services", x: 28, y: 72 },
  { id: "rag", label: "RAG + LangGraph", sub: "AI orchestration", x: 52, y: 50 },
  { id: "safety", label: "HITL + PII", sub: "Safeguards", x: 72, y: 28 },
  { id: "ui", label: "React UI", sub: "Clinician review", x: 72, y: 72 },
  { id: "cloud", label: "AWS EKS", sub: "Production", x: 92, y: 50 },
] as const;

const EDGES: [string, string][] = [
  ["ehr", "kafka"],
  ["ehr", "api"],
  ["kafka", "rag"],
  ["api", "rag"],
  ["rag", "safety"],
  ["rag", "ui"],
  ["safety", "ui"],
  ["ui", "cloud"],
  ["rag", "cloud"],
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

interface HealthcareArchitectureDiagramProps {
  className?: string;
  animated?: boolean;
}

export default function HealthcareArchitectureDiagram({ className = "", animated = true }: HealthcareArchitectureDiagramProps) {
  return (
    <div className={`relative w-full ${className}`} role="img" aria-label="Healthcare AI platform architecture diagram">
      <svg viewBox="0 0 400 200" className="h-auto w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="arch-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-cta)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--color-cta)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-cta)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="arch-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {EDGES.map(([from, to], i) => {
          const a = getNode(from);
          const b = getNode(to);
          const x1 = (a.x / 100) * 400;
          const y1 = (a.y / 100) * 200;
          const x2 = (b.x / 100) * 400;
          const y2 = (b.y / 100) * 200;
          return (
            <g key={`${from}-${to}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#arch-line)" strokeWidth="1.5" opacity="0.6" />
              {animated && (
                <circle r="3" fill="var(--color-cta)" opacity="0.9">
                  <animateMotion
                    dur={`${2.5 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {NODES.map((node) => {
          const cx = (node.x / 100) * 400;
          const cy = (node.y / 100) * 200;
          return (
            <g key={node.id} filter="url(#arch-glow)">
              <circle cx={cx} cy={cy} r="22" fill="var(--color-card)" stroke="var(--color-cta)" strokeWidth="1.5" opacity="0.95" />
              <circle cx={cx} cy={cy} r="6" fill="var(--color-cta)" />
              <text x={cx} y={cy + 36} textAnchor="middle" fill="var(--color-foreground)" fontSize="9" fontWeight="500" style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace" }}>
                {node.label}
              </text>
              <text x={cx} y={cy + 48} textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="7" style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace" }}>
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Mini UI mockup panel for clinician review interface */
export function ClinicianReviewMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-card shadow-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">Copilot Review · Abridge</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-cta">AI Summary</p>
          <p className="text-xs leading-relaxed text-foreground">
            Patient history consolidated from 5 clinical domains. Recommended follow-up based on risk model output.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">✓ Grounded</span>
          <span className="rounded-md bg-cta/10 px-2 py-1 text-[10px] font-medium text-cta">3 Citations</span>
          <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">HITL Review</span>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg border border-border bg-background py-2 text-center text-[10px] font-medium text-muted-foreground">
            Request changes
          </div>
          <div className="flex-1 rounded-lg bg-cta py-2 text-center text-[10px] font-semibold text-white">
            Approve
          </div>
        </div>
      </div>
    </div>
  );
}
