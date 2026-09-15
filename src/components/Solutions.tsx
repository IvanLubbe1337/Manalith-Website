import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Cloud, 
  Database, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  X 
} from 'lucide-react';
import { soundFx } from '../utils/AudioEffects';

interface SolutionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  tag: string;
  hasNotch?: boolean;
  specs: {
    engine: string;
    throughput: string;
    security: string;
    features: string[];
  };
}

const solutions: SolutionItem[] = [
  {
    id: 'ai-workflows',
    title: 'AI Integrations & Workflows',
    icon: (
      <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-obsidian-950 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
        <Network className="w-6 h-6 stroke-[1.8]" />
      </div>
    ),
    description: 'Automated AI pipelines, IDE integrations, and custom workflow automations built for your team.',
    tag: 'WORKFLOW_OPS v2.8',
    specs: {
      engine: 'Composable AI Connectors & Event Triggers',
      throughput: 'Continuous Real-Time Dev Loop Synchronization',
      security: 'Zero-Trust Secret Isolation & OAuth2 Auditing',
      features: [
        'Turnkey integration into IDEs, CI/CD, and custom APIs',
        'Automated pull request analysis, code synthesis & unit tests',
        'Human-in-the-loop governance with customizable approval gates',
      ],
    },
  },
  {
    id: 'agent-hosting',
    title: 'Autonomous Agent Hosting',
    icon: (
      <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-obsidian-950 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
        <Cloud className="w-6 h-6 stroke-[1.8]" />
      </div>
    ),
    description: 'Host, supervise, and orchestrate autonomous AI agents with sandboxed environments and tool execution.',
    tag: 'AGENT_RUN v3.4',
    hasNotch: true, // Matching screenshot notch styling
    specs: {
      engine: 'MicroVM Isolated Agent Sandboxes & Swarm Router',
      throughput: 'Sub-millisecond Tool Invocation & IPC Dispatch',
      security: 'eBPF Kernel Isolation & Granular Capability Scopes',
      features: [
        'Multi-agent collaboration hierarchies & supervisor orchestration',
        'Dynamic tool calling, browser interaction & API execution',
        'Persistent session memory with automated checkpoint recovery',
      ],
    },
  },
  {
    id: 'second-brain-dev',
    title: 'Second Brain & Dev Projects',
    icon: (
      <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-obsidian-950 mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
        <Database className="w-6 h-6 stroke-[1.8]" />
      </div>
    ),
    description: 'Organizational knowledge graph synthesis, hybrid RAG second brains, and bespoke software engineering.',
    tag: 'NEURAL_DEV v4.0',
    specs: {
      engine: 'Hierarchical Vector Graph & Polyglot Code Engine',
      throughput: '< 15ms Hybrid Semantic & Keyword Retrieval',
      security: 'End-to-End Encrypted Knowledge Vaults',
      features: [
        'Dynamic codebase indexing, architectural memory & contextual docs',
        'Bespoke full-stack web, mobile, and cloud software development',
        'Bi-directional sync with Notion, Obsidian, GitHub, and Slack',
      ],
    },
  },
];

interface SolutionCardProps {
  solution: SolutionItem;
  onSelect: (solution: SolutionItem) => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playHudHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        soundFx.playCyberClick();
        onSelect(solution);
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`group relative rounded-xl p-8 bg-white border cursor-pointer select-none transition-all duration-300 overflow-hidden ${
        solution.hasNotch ? 'border-obsidian-950 shadow-md ring-1 ring-black/5' : 'border-neutral-200 hover:border-black'
      }`}
    >
      {/* Top Border Technical Notch for Cloud-Native Dev (matches screenshot) */}
      {solution.hasNotch && (
        <div className="absolute top-0 right-8 -translate-y-1/2 flex items-center gap-1.5 px-3 py-0.5 bg-black text-white text-[10px] font-mono-tech rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>FEATURED_NODE</span>
        </div>
      )}

      {/* Mouse Spotlight Radial Glow Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Card Header & Tag */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono-tech text-neutral-400 tracking-wider">
          {solution.tag}
        </span>
        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-obsidian-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>

      {/* Icon */}
      {solution.icon}

      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-obsidian-950 mb-3 font-sans">
        {solution.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-500 leading-relaxed font-normal">
        {solution.description}
      </p>

      {/* Bottom Technical Spec Bar */}
      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400">
        <span>INSPECT_SPEC</span>
        <span className="text-neutral-900 group-hover:underline">VIEW ARTIFACT →</span>
      </div>
    </motion.div>
  );
};

export const Solutions: React.FC = () => {
  const [activeModalSolution, setActiveModalSolution] = useState<SolutionItem | null>(null);

  return (
    <section id="solutions" className="relative py-24 sm:py-32 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header (Matches Screenshot: OUR SOLUTIONS) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200">
          <div>
            <div className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-400 mb-2">
              [CAPABILITIES :: 01]
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-obsidian-950 uppercase font-sans">
              OUR SOLUTIONS
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-500 max-w-md font-mono-tech">
            Bespoke AI integrations, autonomous agent runtimes, organizational second brains, and modern software engineering.
          </p>
        </div>

        {/* 3-Column Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <SolutionCard
              key={sol.id}
              solution={sol}
              onSelect={(selected) => setActiveModalSolution(selected)}
            />
          ))}
        </div>

      </div>

      {/* Deep Spec Telemetry Drawer / Modal */}
      <AnimatePresence>
        {activeModalSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg bg-white rounded-xl border border-neutral-200 p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModalSolution(null)}
                className="absolute top-6 right-6 p-1.5 text-neutral-400 hover:text-black rounded-sm focus-visible:outline-none"
                aria-label="Close specification"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400 mb-2">
                <span>{activeModalSolution.tag}</span>
                <span>•</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> ONLINE
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-obsidian-950 mb-4 font-sans">
                {activeModalSolution.title} Architecture
              </h3>

              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                {activeModalSolution.description}
              </p>

              <div className="space-y-4 mb-8 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-neutral-500">Core Engine:</span>
                  <span className="font-semibold text-obsidian-950">{activeModalSolution.specs.engine}</span>
                </div>
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-neutral-500">Telemetry:</span>
                  <span className="font-semibold text-obsidian-950">{activeModalSolution.specs.throughput}</span>
                </div>
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-neutral-500">Security Layer:</span>
                  <span className="font-semibold text-obsidian-950">{activeModalSolution.specs.security}</span>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <div className="text-xs font-mono-tech text-neutral-400 uppercase">Operational Guarantees:</div>
                {activeModalSolution.specs.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-obsidian-950 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveModalSolution(null)}
                className="w-full py-3 rounded-sm bg-black text-white font-mono-tech text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close Spec Inspector
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
