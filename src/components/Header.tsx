import { motion } from "motion/react";
import { ShieldCheck, Lock, Unlock, Trophy } from "lucide-react";

interface HeaderProps {
  isAdminActive: boolean;
  onAdminToggle: () => void;
  onLogout: () => void;
  activeSection: string;
  language: "en" | "kr";
  onLanguageChange: (lang: "en" | "kr") => void;
}

export default function Header({ 
  isAdminActive, 
  onAdminToggle, 
  onLogout, 
  activeSection,
  language,
  onLanguageChange
}: HeaderProps) {
  const navItems = language === "kr" ? [
    { name: "소개", href: "#about", id: "about" },
    { name: "실적", href: "#impact", id: "impact" },
    { name: "프로젝트", href: "#projects", id: "projects" },
    { name: "핵심역량", href: "#skills", id: "skills" },
    { name: "커리어", href: "#timeline", id: "timeline" },
    { name: "연락처", href: "#contact", id: "contact" }
  ] : [
    { name: "About", href: "#about", id: "about" },
    { name: "Impact", href: "#impact", id: "impact" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Timeline", href: "#timeline", id: "timeline" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo - Replaced 'APAC' with 'Trophy' icon */}
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-riot-red to-brand-purple p-0.5 shadow-md shadow-riot-red/20 shrink-0"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-riot-dark text-white">
              <Trophy className="h-4 w-4 text-riot-red" />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-black tracking-widest text-white uppercase leading-tight">
              {language === "kr" ? "E스포츠 프로그램 & 파트너십" : "Esports Program & Partnership"}
            </span>
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase mt-0.5">
              {language === "kr" ? "PM 포트폴리오 @ 양이지 (YANG EZZY)" : "PM Portfolio @ YANG EZZY"}
            </span>
          </div>
        </div>

        {/* Navigation Menu with Active Glow States */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 py-1 ${
                  isActive 
                    ? "text-riot-red text-glow-red scale-105 font-extrabold animate-pulse" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeHeaderIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-riot-red rounded-full shadow-[0_0_8px_#ff4655]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Language Selection & Shrunk Admin Console Button */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle Controls */}
          <div className="flex items-center rounded-md bg-zinc-950 p-0.5 border border-white/5">
            <button
              onClick={() => onLanguageChange("kr")}
              className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider transition duration-300 ${
                language === "kr" 
                  ? "bg-riot-red text-white shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              KR
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider transition duration-300 ${
                language === "en" 
                  ? "bg-riot-red text-white shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              EN
            </button>
          </div>

          {/* Admin Controls - Smaller and more subtle */}
          {isAdminActive ? (
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-emerald-400 border border-emerald-500/20"
              >
                <ShieldCheck className="h-2.5 w-2.5" />
                CONSOLE
              </motion.div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 rounded-md bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                title="Exit Console"
              >
                <Lock className="h-2.5 w-2.5" />
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={onAdminToggle}
              className="flex items-center gap-1 rounded-md bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 px-2 py-1 text-[9px] font-mono tracking-wider text-zinc-400 hover:text-white transition duration-300"
            >
              <Unlock className="h-2.5 w-2.5 text-zinc-500 shrink-0" />
              ADMIN
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
