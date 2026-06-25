import { motion } from "motion/react";
import { SkillItem } from "../types";
import { Trophy, HeartHandshake, Tv, GitMerge, Sparkles, BarChart3, Mail, Languages, FileText } from "lucide-react";

interface SkillsChartProps {
  skills: SkillItem[];
}

export default function SkillsChart({ skills }: SkillsChartProps) {
  // Map skills to icons for added visual impact
  const getSkillIcon = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("program") || lowercase.includes("프로그램")) return <Trophy className="h-4 w-4 text-riot-red" />;
    if (lowercase.includes("partnership") || lowercase.includes("파트너십")) return <HeartHandshake className="h-4 w-4 text-brand-purple" />;
    if (lowercase.includes("broadcast") || lowercase.includes("방송") || lowercase.includes("프로덕션")) return <Tv className="h-4 w-4 text-valorant-teal" />;
    if (lowercase.includes("stakeholder") || lowercase.includes("이해관계자")) return <GitMerge className="h-4 w-4 text-amber-400" />;
    if (lowercase.includes("event") || lowercase.includes("이벤트")) return <Sparkles className="h-4 w-4 text-rose-500" />;
    if (lowercase.includes("data") || lowercase.includes("데이터") || lowercase.includes("보고")) return <BarChart3 className="h-4 w-4 text-indigo-400" />;
    if (lowercase.includes("서면") || lowercase.includes("written") || lowercase.includes("contract") || lowercase.includes("계약") || lowercase.includes("mail") || lowercase.includes("메일")) return <FileText className="h-4 w-4 text-sky-400" />;
    if (lowercase.includes("speaking") || lowercase.includes("회화") || lowercase.includes("커뮤니케이션") || lowercase.includes("communication")) return <Languages className="h-4 w-4 text-emerald-400" />;
    return <Mail className="h-4 w-4 text-zinc-400" />;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {skills.map((skill, index) => (
        <div 
          key={skill.name} 
          className="relative rounded-xl border border-white/5 bg-zinc-950 p-5 shadow-lg shadow-black/50 transition-all hover:border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-white/5">
                {getSkillIcon(skill.name)}
              </div>
              <span className="font-display text-sm font-bold tracking-wide text-white">
                {skill.name}
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-riot-red bg-riot-red/10 px-2 py-0.5 rounded-md">
              {skill.percentage}%
            </span>
          </div>

          {/* Bar track */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-purple via-riot-red to-rose-400"
              style={{
                boxShadow: "0 0 10px rgba(255, 70, 85, 0.4)"
              }}
            />
          </div>
          
          <div className="flex justify-between mt-2 font-mono text-[9px] text-zinc-500 tracking-wider uppercase">
            <span>OPERATIONAL CAPABILITY</span>
            <span>EXPERT LEVEL</span>
          </div>
        </div>
      ))}
    </div>
  );
}
