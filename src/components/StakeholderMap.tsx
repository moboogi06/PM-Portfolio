import { motion } from "motion/react";
import { ArrowRight, Cpu, HeartHandshake, Eye, Briefcase, Building, Video } from "lucide-react";

interface StakeholderMapProps {
  from: string;
  me: string;
  to: string[];
  language?: "en" | "kr";
}

export default function StakeholderMap({ from, me, to, language = "en" }: StakeholderMapProps) {
  const getIcon = (role: string, isSmall = false) => {
    const lowercase = role.toLowerCase();
    const sizeClass = isSmall ? "h-3.5 w-3.5" : "h-4.5 w-4.5";
    if (lowercase.includes("riot") || lowercase.includes("publisher") || lowercase.includes("게임사")) return <Cpu className={`${sizeClass} text-riot-red`} />;
    if (lowercase.includes("me") || lowercase.includes("program lead") || lowercase.includes("partnership") || lowercase.includes("나") || lowercase.includes("총괄")) return <Briefcase className={`${sizeClass} text-white`} />;
    if (lowercase.includes("prain") || lowercase.includes("pr") || lowercase.includes("global") || lowercase.includes("프레인") || lowercase.includes("대행")) return <HeartHandshake className={`${sizeClass} text-brand-purple`} />;
    if (lowercase.includes("venue") || lowercase.includes("베뉴") || lowercase.includes("대관")) return <Building className={`${sizeClass} text-amber-400`} />;
    if (lowercase.includes("production") || lowercase.includes("연출") || lowercase.includes("방송") || lowercase.includes("프로덕션")) return <Video className={`${sizeClass} text-valorant-teal`} />;
    return <Eye className={`${sizeClass} text-zinc-400`} />;
  };

  return (
    <div className="relative rounded-2xl border border-white/5 bg-zinc-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="absolute top-0 left-10 -translate-y-1/2 rounded-full bg-riot-red/10 border border-riot-red/30 px-3 py-1 font-mono text-[9px] text-riot-red tracking-widest uppercase">
        {language === "kr" ? "협업 및 커뮤니케이션 구조" : "Operational Architecture"}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center py-4">
        {/* Node 1: Publisher (Riot Games Korea) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900 border border-white/5 w-full text-center relative overflow-hidden min-h-[160px]"
        >
          <div className="absolute top-0 left-0 w-1 lg:w-1.5 h-full bg-riot-red" />
          <div className="mb-2.5 p-2 rounded-lg bg-riot-red/10 border border-riot-red/20 text-riot-red">
            {getIcon(from)}
          </div>
          <span className="font-display font-extrabold text-xs md:text-sm text-white tracking-wide leading-tight break-words max-w-full">
            {from}
          </span>
          <span className="font-mono text-[8px] md:text-[9px] text-zinc-500 tracking-wider uppercase mt-1.5">
            {language === "kr" ? "글로벌 퍼블리셔" : "Publisher & IP Owner"}
          </span>
        </motion.div>
 
        {/* Dynamic connection arrow 1 */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center text-zinc-600 animate-pulse">
          <ArrowRight className="h-4.5 w-4.5 text-riot-red" />
          <span className="font-mono text-[8px] text-zinc-600 mt-1 uppercase tracking-widest text-center">
            {language === "kr" ? "기획 제안" : "PROPOSE"}
          </span>
        </div>
 
        {/* Node 2: YOU (Ownership & Project Lead) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-xl bg-zinc-900 border border-brand-purple/40 w-full text-center relative overflow-hidden ring-1 ring-brand-purple/20 min-h-[190px]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-purple" />
          <div className="absolute -inset-0.5 bg-brand-purple/5 blur-lg opacity-40 rounded-xl" />
          <div className="mb-2.5 p-2 rounded-lg bg-brand-purple/20 border border-brand-purple/30 text-brand-purple shadow-lg shadow-brand-purple/20">
            {getIcon(me)}
          </div>
          <span className="font-display font-extrabold text-sm md:text-base text-white tracking-wide text-glow-purple leading-snug break-words max-w-full">
            {me}
          </span>
          <span className="font-mono text-[9px] md:text-[10px] text-emerald-400 font-semibold tracking-wider uppercase mt-1.5">
            {language === "kr" ? "프로그램 총괄 및 실행" : "Program Ownership & Execution"}
          </span>
          <span className="text-[10px] text-zinc-400 mt-2.5 italic px-1 leading-normal">
            {language === "kr"
              ? "정부 부처, 게임사 및 중계/PR 대행사 간의 비즈니스 소통 창구 일원화."
              : "Single Point of Contact aligning multiple international delivery agencies."}
          </span>
        </motion.div>
 
        {/* Dynamic connection arrow 2 */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center text-zinc-600 animate-pulse">
          <ArrowRight className="h-4.5 w-4.5 text-brand-purple" />
          <span className="font-mono text-[8px] text-zinc-600 mt-1 uppercase tracking-widest text-center">
            {language === "kr" ? "실행 조율" : "COORDINATE"}
          </span>
        </div>
 
        {/* Node 3: Deliverables Group */}
        <div className="lg:col-span-3 flex flex-col gap-3 w-full">
          {to.map((vendor, i) => (
            <motion.div 
              key={vendor}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-white/5 hover:border-white/10 transition duration-300 w-full"
            >
              <div className="p-1 rounded bg-zinc-800 border border-white/5 shrink-0">
                {getIcon(vendor, true)}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-display text-[10px] sm:text-xs font-bold text-zinc-200 leading-tight break-words">
                  {vendor}
                </span>
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider mt-0.5 break-words leading-tight">
                  {vendor.includes("Prain") || vendor.includes("프레인") || vendor.includes("대행") || vendor.includes("PR") || vendor.toLowerCase().includes("pr")
                    ? (language === "kr" ? "대행 파트너 (PR)" : "Agency Partner")
                    : vendor.includes("Venue") || vendor.includes("베뉴") || vendor.includes("대관")
                      ? (language === "kr" ? "대관 및 운영 보안" : "Location & Security")
                      : (language === "kr" ? "실시간 방송 프로덕션" : "Broadcast Production")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
