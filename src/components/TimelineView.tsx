import { motion } from "motion/react";
import { TimelineEvent } from "../types";
import { Calendar, Award, Briefcase, Zap, Milestone } from "lucide-react";

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export default function TimelineView({ timeline }: TimelineViewProps) {
  const getIcon = (index: number, year: string) => {
    const lowercase = year.toLowerCase();
    if (lowercase.includes("next") || lowercase.includes("목표") || lowercase.includes("향후")) {
      return <Milestone className="h-4 w-4 text-riot-red" />;
    }
    if (index === 0) return <Briefcase className="h-4 w-4 text-zinc-400" />;
    if (index === timeline.length - 2) return <Award className="h-4 w-4 text-brand-purple" />;
    return <Zap className="h-4 w-4 text-valorant-teal" />;
  };

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Middle Line */}
      <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-gradient-to-b from-brand-purple via-riot-red to-zinc-800 md:left-1/2 md:-translate-x-[0.5px]" />

      <div className="space-y-12">
        {timeline.map((event, index) => {
          const isEven = index % 2 === 0;
          const isNext = event.year.toLowerCase().includes("next") || event.year.includes("목표") || event.year.includes("향후");

          return (
            <div 
              key={event.id}
              className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center"
            >
              {/* Dot indicator */}
              <div className="absolute left-4 top-1.5 z-10 -translate-x-[15px] flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 border-2 border-riot-red text-white md:left-1/2 md:-translate-x-1/2">
                {getIcon(index, event.year)}
              </div>

              {/* Layout spacer for desktop */}
              <div className="hidden md:block w-5/12" />

              {/* Core card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-full pl-12 md:pl-0 md:w-5/12 ${
                  isEven ? "md:order-first md:text-right" : "md:text-left"
                }`}
              >
                <div className={`rounded-xl border border-white/5 bg-zinc-950 p-6 shadow-xl transition-all hover:border-white/10 ${
                  isNext 
                    ? "ring-1 ring-riot-red/30 bg-gradient-to-b from-riot-red/5 to-transparent" 
                    : ""
                }`}>
                  <div className={`flex items-center gap-2 mb-2 ${
                    isEven ? "md:justify-end" : "md:justify-start"
                  }`}>
                    <Calendar className="h-3.5 w-3.5 text-riot-red" />
                    <span className="font-mono text-xs font-bold text-riot-red tracking-wider uppercase">
                      {event.year}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-extrabold text-white tracking-wide">
                    {event.title}
                  </h4>
                  
                  <p className="font-display text-xs font-semibold text-zinc-400 mt-1 uppercase tracking-wider whitespace-pre-line">
                    {event.subtitle}
                  </p>

                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
