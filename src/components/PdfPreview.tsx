import { motion } from "motion/react";
import { FileText, Sparkles, CheckCircle, Eye } from "lucide-react";
import { BilingualPortfolioData, PortfolioData } from "../types";

interface PdfPreviewProps {
  language: "en" | "kr";
  data: PortfolioData;
}

export default function PdfPreview({ language, data }: PdfPreviewProps) {
  // Translate labels based on the active language
  const isKr = language === "kr";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-[340px] md:w-[600px] bg-[#090d16] border border-white/10 rounded-xl p-4 shadow-2xl z-50 pointer-events-none"
    >
      {/* Glow highlight */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-brand-purple/20 via-riot-red/20 to-valorant-teal/20 opacity-50 blur-[2px] -z-10" />

      {/* Header of the preview */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-riot-red" />
          <span className="font-mono text-[10px] font-extrabold tracking-widest text-zinc-300 uppercase">
            {isKr ? "PDF 출력 레이아웃 실시간 미리보기" : "PDF PRINT LAYOUT LIVE PREVIEW"}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">
            {isKr ? "고화질 다크테마" : "HD Dark Theme"}
          </span>
        </div>
      </div>

      {/* Grid of Pages - Showing 3 pages of the PDF */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* PAGE 1: Overview & KPI */}
        <div className="bg-[#05070c] border border-white/5 rounded p-2 text-[6px] text-zinc-400 select-none flex flex-col justify-between h-[160px] md:h-[220px] transition-all hover:border-riot-red/30 relative overflow-hidden">
          {/* Header watermark */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-riot-red" />
          
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[4px] text-zinc-500 border-b border-white/5 pb-0.5">
              <span>PAGE 1</span>
              <span>YANG EZZY</span>
            </div>
            {/* Hero Title replica */}
            <div className="space-y-0.5">
              <div className="h-1.5 w-4/5 bg-white/10 rounded" />
              <div className="h-1 w-3/5 bg-riot-red/20 rounded" />
            </div>
            {/* Description lines */}
            <div className="space-y-0.5 opacity-60">
              <div className="h-[2px] w-full bg-zinc-700 rounded" />
              <div className="h-[2px] w-full bg-zinc-700 rounded" />
              <div className="h-[2px] w-3/4 bg-zinc-700 rounded" />
            </div>
            {/* KPI Cards representation (6 columns/grids) */}
            <div className="grid grid-cols-3 gap-0.5 pt-1">
              {data.kpis.map((kpi, i) => (
                <div key={kpi.id || i} className="border border-white/5 bg-[#090d16] p-0.5 rounded text-[4px] space-y-0.5">
                  <div className="text-white font-extrabold text-[4px] scale-[0.8] origin-left truncate">{kpi.value}</div>
                  <div className="text-[3px] text-zinc-500 scale-[0.7] origin-left truncate">{kpi.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-1 text-[4px] text-zinc-600 flex justify-between items-center">
            <span>KPIs & Overview</span>
            <span className="scale-75 text-riot-red">●</span>
          </div>
        </div>

        {/* PAGE 2: Projects & Core Skills */}
        <div className="bg-[#05070c] border border-white/5 rounded p-2 text-[6px] text-zinc-400 select-none flex flex-col justify-between h-[160px] md:h-[220px] transition-all hover:border-brand-purple/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-riot-red to-brand-purple" />
          
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[4px] text-zinc-500 border-b border-white/5 pb-0.5">
              <span>PAGE 2</span>
              <span>PROJECTS</span>
            </div>
            {/* Section title */}
            <div className="h-1 w-1/2 bg-white/20 rounded" />
            
            {/* Project list replica */}
            <div className="space-y-1">
              {/* Chungnam */}
              <div className="p-0.5 rounded bg-zinc-900 border border-white/5 flex gap-1 items-center">
                <div className="w-2 h-2 rounded bg-brand-purple/30 shrink-0" />
                <div className="w-full space-y-[1px]">
                  <div className="h-1 w-2/3 bg-zinc-300 rounded" />
                  <div className="h-[1px] w-full bg-zinc-600 rounded" />
                </div>
              </div>
              {/* Valorant */}
              <div className="p-0.5 rounded bg-zinc-900 border border-white/5 flex gap-1 items-center">
                <div className="w-2 h-2 rounded bg-riot-red/30 shrink-0" />
                <div className="w-full space-y-[1px]">
                  <div className="h-1 w-3/4 bg-zinc-300 rounded" />
                  <div className="h-[1px] w-4/5 bg-zinc-600 rounded" />
                </div>
              </div>
              {/* Douyu */}
              <div className="p-0.5 rounded bg-zinc-900 border border-white/5 flex gap-1 items-center">
                <div className="w-2 h-2 rounded bg-valorant-teal/30 shrink-0" />
                <div className="w-full space-y-[1px]">
                  <div className="h-1 w-1/2 bg-zinc-300 rounded" />
                  <div className="h-[1px] w-full bg-zinc-600 rounded" />
                </div>
              </div>
            </div>

            {/* Skills replica */}
            <div className="space-y-0.5 pt-0.5">
              <div className="h-[1px] w-1/3 bg-white/20 rounded" />
              <div className="space-y-[1px]">
                <div className="h-1 bg-gradient-to-r from-brand-purple to-riot-red rounded w-[85%]" />
                <div className="h-1 bg-gradient-to-r from-brand-purple to-riot-red rounded w-[75%]" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-1 text-[4px] text-zinc-600 flex justify-between items-center">
            <span>Portfolio Projects</span>
            <span className="scale-75 text-brand-purple">●</span>
          </div>
        </div>

        {/* PAGE 3: Timeline & Contacts */}
        <div className="bg-[#05070c] border border-white/5 rounded p-2 text-[6px] text-zinc-400 select-none flex flex-col justify-between h-[160px] md:h-[220px] transition-all hover:border-valorant-teal/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-valorant-teal" />
          
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[4px] text-zinc-500 border-b border-white/5 pb-0.5">
              <span>PAGE 3</span>
              <span>TIMELINE</span>
            </div>
            {/* Section title */}
            <div className="h-1 w-1/2 bg-white/20 rounded" />
            
            {/* Timeline nodes */}
            <div className="relative pl-1.5 space-y-1.5 border-l border-white/10 ml-0.5 py-0.5">
              <div className="relative">
                <div className="absolute -left-[7.5px] top-0.5 w-1.5 h-1.5 rounded-full bg-riot-red border border-white/20" />
                <div className="h-[2px] w-1/3 bg-zinc-300 rounded mb-[1px]" />
                <div className="h-[1px] w-full bg-zinc-600 rounded" />
              </div>
              <div className="relative">
                <div className="absolute -left-[7.5px] top-0.5 w-1.5 h-1.5 rounded-full bg-brand-purple border border-white/20" />
                <div className="h-[2px] w-1/2 bg-zinc-300 rounded mb-[1px]" />
                <div className="h-[1px] w-full bg-zinc-600 rounded" />
              </div>
              <div className="relative">
                <div className="absolute -left-[7.5px] top-0.5 w-1.5 h-1.5 rounded-full bg-valorant-teal border border-white/20" />
                <div className="h-[2px] w-1/3 bg-zinc-300 rounded mb-[1px]" />
                <div className="h-[1px] w-4/5 bg-zinc-600 rounded" />
              </div>
            </div>

            {/* Micro Signature / Footer */}
            <div className="pt-1.5 space-y-0.5 text-center">
              <div className="inline-block h-1.5 w-10 bg-white/5 rounded" />
              <div className="text-[3px] text-zinc-600 scale-[0.8]">YANG EZZY</div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-1 text-[4px] text-zinc-600 flex justify-between items-center">
            <span>Career Timeline</span>
            <span className="scale-75 text-valorant-teal">●</span>
          </div>
        </div>
      </div>

      {/* Info indicator */}
      <div className="mt-3 text-center border-t border-white/5 pt-2 flex items-center justify-center gap-1 text-[9px] font-mono text-zinc-400">
        <Sparkles className="h-3 w-3 text-riot-red shrink-0" />
        <span>
          {isKr 
            ? "고대비 색상, 어두운 고화질 배경 그대로 깨끗하게 인쇄됩니다."
            : "High contrast colors and premium dark slate render with full accuracy."}
        </span>
      </div>
    </motion.div>
  );
}
