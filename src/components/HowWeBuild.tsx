import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Cpu, Layers, Check, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/AudioEffects';

interface PipelineStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  details: string;
  metrics: string;
  state: 'complete' | 'active' | 'pending';
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'step-1',
    title: 'Workflow Audit',
    icon: <Terminal className="w-6 h-6 stroke-[1.8]" />,
    subtitle: 'Process & Stack Mapping',
    details: 'Comprehensive audit of your existing developer workflows, repetitive bottlenecks, and internal knowledge repositories.',
    metrics: '100% Workflow Visibility',
    state: 'complete',
  },
  {
    id: 'step-2',
    title: 'Second Brain',
    icon: <Database className="w-6 h-6 stroke-[1.8]" />,
    subtitle: 'Knowledge Graph & Memory',
    details: 'Ingesting and indexing documentation, codebase context, and operational history into a unified, privacy-first second brain.',
    metrics: '< 15ms Hybrid Retrieval',
    state: 'complete',
  },
  {
    id: 'step-3',
    title: 'Agent Hosting',
    icon: <Cpu className="w-6 h-6 stroke-[1.8]" />,
    subtitle: 'Sandboxed Tool Execution',
    details: 'Deploying isolated, persistent agent runtimes equipped with custom tools, browser automation, and secure API integrations.',
    metrics: '0ms Cold Start Sandbox',
    state: 'active',
  },
  {
    id: 'step-4',
    title: 'Software Dev',
    icon: <Layers className="w-6 h-6 stroke-[1.8]" />,
    subtitle: 'Bespoke Engineering & Ops',
    details: 'End-to-end full-stack software development, automated CI/CD loop integration, and human-in-the-loop operational guardrails.',
    metrics: '10x Dev Throughput',
    state: 'active',
  },
];

export const HowWeBuild: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  return (
    <section id="how-we-build" className="relative py-24 sm:py-32 bg-white border-t border-neutral-100 overflow-hidden">
      {/* Micro-dot grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header (Matches Screenshot: HOW WE BUILD) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-neutral-200">
          <div>
            <div className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-400 mb-2">
              [PIPELINE ARCHITECTURE :: 02]
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-obsidian-950 uppercase font-sans">
              HOW WE BUILD
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono-tech text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-sm border border-neutral-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CONTINUOUS DELIVERY & AGENTIC PIPELINE ACTIVE</span>
          </div>
        </div>

        {/* The 4 Pipeline Nodes (Matches Screenshot: Data Intake -> ML Pipeline -> Deployment -> MLOps) */}
        <div className="relative mb-16">
          
          {/* Animated Connecting Line with traveling photon pulse (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-neutral-200 -z-0">
            <motion.div
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {pipelineSteps.map((step, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Step Card */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => soundFx.playHudHover()}
                    onClick={() => {
                      soundFx.playCyberClick();
                      setSelectedStep(idx);
                    }}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 relative bg-white cursor-pointer ${
                      isSelected
                        ? 'border-obsidian-950 shadow-[0_12px_30px_rgba(0,0,0,0.08)] ring-1 ring-black'
                        : 'border-neutral-200 hover:border-black hover:shadow-sm'
                    }`}
                  >
                    {/* Top Step ID & Indicator */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-mono-tech text-neutral-400">
                        STAGE 0{idx + 1}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          step.state === 'complete'
                            ? 'bg-emerald-500'
                            : step.state === 'active'
                            ? 'bg-obsidian-950 animate-ping'
                            : 'bg-neutral-300'
                        }`}
                      />
                    </div>

                    {/* Icon Box */}
                    <div
                      className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 ${
                        isSelected
                          ? 'bg-obsidian-950 text-white shadow-md'
                          : 'bg-neutral-100 text-obsidian-950 group-hover:bg-neutral-200'
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold tracking-tight text-obsidian-950 mb-1 font-sans">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <div className="text-xs font-mono-tech text-neutral-500 mb-3">
                      {step.subtitle}
                    </div>

                    {/* Metric Tag */}
                    <div className="inline-block px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-[10px] font-mono-tech text-obsidian-950 rounded">
                      {step.metrics}
                    </div>
                  </motion.button>

                  {/* Flow Arrow for Mobile */}
                  {idx < pipelineSteps.length - 1 && (
                    <div className="md:hidden py-3 text-neutral-300">
                      ↓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Deep Pipeline Inspector Card */}
        <motion.div
          key={selectedStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 text-xs font-mono-tech text-neutral-500 mb-2">
                <span>INSPECTING STAGE 0{selectedStep + 1}</span>
                <span>/</span>
                <span className="text-black font-semibold uppercase">{pipelineSteps[selectedStep].title}</span>
              </div>
              <h4 className="text-2xl font-bold tracking-tight text-obsidian-950 mb-3 font-sans">
                {pipelineSteps[selectedStep].subtitle}
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl font-normal">
                {pipelineSteps[selectedStep].details}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs">
                <div className="text-[10px] font-mono-tech text-neutral-400 uppercase">Live Node Telemetry</div>
                <div className="text-lg font-bold text-obsidian-950 mt-1 font-sans">
                  {pipelineSteps[selectedStep].metrics}
                </div>
                <div className="text-[11px] font-mono-tech text-emerald-600 flex items-center gap-1.5 mt-0.5">
                  <Check className="w-3.5 h-3.5" /> Verification Check Passed
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedStep((prev) => (prev + 1) % pipelineSteps.length)}
                  className="flex-1 py-2.5 px-4 bg-obsidian-950 text-white rounded font-mono-tech text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  <span>NEXT STAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
