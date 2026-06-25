import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, TrendingUp, Cpu, Award, Zap, 
  Send, Settings, ChevronRight, CheckCircle
} from "lucide-react";

import { PortfolioData, BilingualPortfolioData } from "./types";
import { DEFAULT_PORTFOLIO_DATA } from "./defaultData";

import Header from "./components/Header";
import SkillsChart from "./components/SkillsChart";
import StakeholderMap from "./components/StakeholderMap";
import TimelineView from "./components/TimelineView";
import AdminPanel from "./components/AdminPanel";
import { CAREER_HISTORY_DATA } from "./careerHistoryData";

export default function App() {
  const [bilingualData, setBilingualData] = useState<BilingualPortfolioData>(() => {
    const saved = localStorage.getItem("riot_esports_portfolio_data_bilingual");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Robust schema validation to prevent crashes from outdated/corrupt localStorage data
        if (!parsed || typeof parsed !== "object" || !parsed.kr || !parsed.en) {
          return DEFAULT_PORTFOLIO_DATA;
        }

        const requiredKeys: (keyof PortfolioData)[] = [
          "hero", "kpis", "about", "impact", "featuredProjects", "skills", "timeline", "contact"
        ];
        for (const key of requiredKeys) {
          if (!parsed.kr[key] || !parsed.en[key]) {
            return DEFAULT_PORTFOLIO_DATA;
          }
        }

        // Ensure both languages have 8 skills (including "영어 회화, 오프라인 커뮤니케이션")
        if (parsed.kr.skills && parsed.kr.skills.length < 8) {
          const defaultSkills = DEFAULT_PORTFOLIO_DATA.kr.skills;
          parsed.kr.skills = [
            ...parsed.kr.skills,
            ...defaultSkills.slice(parsed.kr.skills.length)
          ];
        }
        if (parsed.en.skills && parsed.en.skills.length < 8) {
          const defaultSkills = DEFAULT_PORTFOLIO_DATA.en.skills;
          parsed.en.skills = [
            ...parsed.en.skills,
            ...defaultSkills.slice(parsed.en.skills.length)
          ];
        }
        return parsed as BilingualPortfolioData;
      } catch (err) {
        console.error("Failed to parse portfolio data", err);
      }
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  const [defaultLang, setDefaultLang] = useState<"en" | "kr">(() => {
    const saved = localStorage.getItem("riot_esports_default_lang");
    return (saved === "en" || saved === "kr") ? (saved as "en" | "kr") : "kr"; // Default to Korean as default load language
  });

  const [language, setLanguage] = useState<"en" | "kr">(() => {
    const savedLang = localStorage.getItem("riot_esports_portfolio_lang");
    if (savedLang === "en" || savedLang === "kr") {
      return savedLang;
    }
    const savedDefault = localStorage.getItem("riot_esports_default_lang");
    return (savedDefault === "en" || savedDefault === "kr") ? (savedDefault as "en" | "kr") : "kr";
  });

  const [isAdminActive, setIsAdminActive] = useState(() => {
    return localStorage.getItem("riot_esports_admin_active") === "true";
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "metrics">("projects");
  const [activeSection, setActiveSection] = useState("about");
  const [showReports, setShowReports] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);

  const data = (bilingualData && bilingualData[language]) || (bilingualData && bilingualData.kr) || DEFAULT_PORTFOLIO_DATA.kr; // fallback to Korean or defaults if somehow undefined

  // Monitor scrolling to highlight current menu section
  useEffect(() => {
    const sections = ["about", "impact", "projects", "skills", "timeline", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // comfortable offset for headers
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run immediately on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSaveBilingual = (newBilingualData: BilingualPortfolioData) => {
    setBilingualData(newBilingualData);
    localStorage.setItem("riot_esports_portfolio_data_bilingual", JSON.stringify(newBilingualData));
  };

  const handleReset = () => {
    setBilingualData(DEFAULT_PORTFOLIO_DATA);
    localStorage.removeItem("riot_esports_portfolio_data_bilingual");
  };

  const handleLanguageChange = (lang: "en" | "kr") => {
    setLanguage(lang);
    localStorage.setItem("riot_esports_portfolio_lang", lang);
  };

  const handleDefaultLangChange = (lang: "en" | "kr") => {
    setDefaultLang(lang);
    localStorage.setItem("riot_esports_default_lang", lang);
    // If the visitor has not manually toggled the language in this session, immediately update the layout
    if (!localStorage.getItem("riot_esports_portfolio_lang")) {
      setLanguage(lang);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminActive(true);
    localStorage.setItem("riot_esports_admin_active", "true");
  };

  const handleLogout = () => {
    setIsAdminActive(false);
    localStorage.removeItem("riot_esports_admin_active");
  };

  return (
    <div className={`min-h-screen bg-[#05070c] text-zinc-100 selection:bg-riot-red selection:text-white ${language === "kr" ? "font-pretendard break-keep" : ""}`}>
      {/* Upper Admin Alert Banner when enabled */}
      {isAdminActive && (
        <div className="no-print bg-emerald-500/10 border-b border-emerald-500/20 py-3 px-4 text-center text-xs text-emerald-400 font-mono tracking-wider flex items-center justify-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {language === "kr" 
            ? `관리 콘솔 작동 중 (${language.toUpperCase()}) — 대시보드 내 지표, 설명 및 프로젝트 데이터를 수정할 수 있습니다.` 
            : `ADMIN CONSOLE OPERATIONAL (${language.toUpperCase()}) — Modify metrics, text descriptions, and project images via the console.`}
        </div>
      )}

      {/* Header Navigation */}
      <Header 
        isAdminActive={isAdminActive} 
        onAdminToggle={() => setIsAdminPanelOpen(true)} 
        onLogout={handleLogout}
        activeSection={activeSection}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36 border-b border-white/5">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-riot-red/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
          {/* Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-4 py-2 mb-6 text-xs font-mono tracking-widest text-riot-red uppercase font-bold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-riot-red animate-pulse" />
            {language === "kr" ? "글로벌 E스포츠 전략 & 프로그램" : "GLOBAL ESPORTS STRATEGY & PROGRAMS"}
          </motion.div>

          {/* Title / Subtitle */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-black tracking-tight text-white md:text-6xl uppercase leading-[1.1] mb-6"
          >
            {data.hero.headline}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-base md:text-lg text-zinc-300 font-sans tracking-wide leading-relaxed mb-12"
          >
            {data.hero.subheadline}
          </motion.p>

          {/* KPI Cards Bento grid - Standardized so no single card stands out excessively */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 text-left">
            {data.kpis.map((kpi, idx) => {
              // Elegant, unified styling for all 6 cards so they look cohesive and balanced
              const cardStyle = "border-white/5 bg-[#090d16]/80 shadow-[0_4px_20px_rgba(0,0,0,0.45)] hover:border-riot-red/25 hover:shadow-[0_0_10px_rgba(255,70,85,0.04)] transition duration-300";
              const glowStyle = "text-white text-glow-red font-black";
              const labelStyle = "text-zinc-200 font-bold";
              const badgeStyle = "text-riot-red/40";
              
              return (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.3 }}
                  className={`relative rounded-xl border p-5 shadow-lg backdrop-blur-sm transition duration-300 ${cardStyle}`}
                >
                  <div className={`absolute top-2.5 right-2.5 text-[10px] font-mono font-bold uppercase ${badgeStyle}`}>
                    #{idx + 1}
                  </div>
                  <div className={`font-display text-2xl font-black tracking-tight ${glowStyle}`}>
                    {kpi.value}
                  </div>
                  <div className={`font-display text-sm font-bold mt-1 ${labelStyle}`}>
                    {kpi.label}
                  </div>
                  <div className="font-mono text-xs text-zinc-500 mt-2 tracking-wide uppercase leading-tight">
                    {kpi.sublabel}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-b border-white/5 bg-[#070a10]/40 relative">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 md:grid-cols-3 items-start">
            <div className="md:col-span-1">
              <span className="font-mono text-xs font-bold text-riot-red tracking-widest uppercase">
                {language === "kr" ? "// 비즈니스 요약" : "// EXECUTIVE SUMMARY"}
              </span>
              <h2 className="font-display text-3xl font-black text-white uppercase mt-2 tracking-wider">
                {data.about.title}
              </h2>
              <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest mt-1 font-bold">
                {language === "kr" ? "E스포츠 운영 전문가" : "Esports Operations Specialist"}
              </p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <p className="text-base md:text-lg font-medium text-zinc-200 leading-relaxed">
                {data.about.description}
              </p>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <span className="block font-mono text-xs text-zinc-400 tracking-wider uppercase font-bold">
                  {language === "kr" ? "핵심 비즈니스 역량" : "Core Operational Strengths"}
                </span>
                <div className="grid gap-4">
                  {data.about.coreValues.map((val, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-zinc-300">
                      <CheckCircle className="h-5 w-5 text-riot-red shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Perfectly aligned using grid cols items-stretch and flex h-full */}
      <section id="impact" className="py-24 border-b border-white/5 relative">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold text-riot-red tracking-widest uppercase">
              {language === "kr" ? "// 정량적 성과 증명" : "// HIGH-SCALE OWNERSHIP"}
            </span>
            <h2 className="font-display text-4xl font-black text-white uppercase mt-2 tracking-widest">
              {language === "kr" ? "정량적 비즈니스 임팩트" : "Measurable Program Impact"}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-sans tracking-wide mt-2">
              {language === "kr" 
                ? "운영 예산 관리, 퍼블리셔 협업 및 다자간 파트너십 구축을 통해 증명한 성과 지표입니다." 
                : "Verifiable business metrics proving ownership of regional budgets, stakeholder relationships, and publisher-aligned campaigns."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {/* Program Management Card */}
            <div className="relative rounded-2xl border border-white/5 bg-[#0b0f19]/70 p-6 shadow-xl hover:border-riot-red/30 transition duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-riot-red/10 border border-riot-red/20 text-riot-red mb-5">
                  <Award className="h-6 w-6" />
                </div>
                <div className="min-h-[110px] flex flex-col justify-start">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block font-bold">
                    {data.impact.programManagement.duration}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white uppercase mt-1 leading-snug">
                    {data.impact.programManagement.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1 italic">
                    {data.impact.programManagement.subtitle}
                  </p>
                </div>

                {/* Major highlight metrics */}
                <div className="my-6 rounded-lg bg-zinc-950 p-4 border border-white/5 text-center">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                    {data.impact.programManagement.metricLabel}
                  </div>
                  <div className="font-display text-2xl font-black text-riot-red mt-1 text-glow-red">
                    {data.impact.programManagement.metricValue}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-auto pt-4 border-t border-white/5">
                {data.impact.programManagement.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs text-zinc-300">
                    <ChevronRight className="h-4.5 w-4.5 text-riot-red shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership Management Card */}
            <div className="relative rounded-2xl border border-white/5 bg-[#0b0f19]/70 p-6 shadow-xl hover:border-brand-purple/30 transition duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mb-5">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="min-h-[110px] flex flex-col justify-start">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block font-bold">
                    {data.impact.partnershipManagement.duration}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white uppercase mt-1 leading-snug">
                    {data.impact.partnershipManagement.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1 italic">
                    {data.impact.partnershipManagement.subtitle}
                  </p>
                </div>

                {/* Major highlight metrics */}
                <div className="my-6 rounded-lg bg-zinc-950 p-4 border border-white/5 text-center">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                    {data.impact.partnershipManagement.metricLabel}
                  </div>
                  <div className="font-display text-2xl font-black text-brand-purple mt-1 text-glow-purple">
                    {data.impact.partnershipManagement.metricValue}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-auto pt-4 border-t border-white/5">
                {data.impact.partnershipManagement.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs text-zinc-300">
                    <ChevronRight className="h-4.5 w-4.5 text-brand-purple shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publisher Collaboration Card */}
            <div className="relative rounded-2xl border border-white/5 bg-[#0b0f19]/70 p-6 shadow-xl hover:border-valorant-teal/30 transition duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-5">
                  <Cpu className="h-6 w-6" />
                </div>
                <div className="min-h-[110px] flex flex-col justify-start">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider block font-bold">
                    {data.impact.riotCollaboration.duration}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white uppercase mt-1 leading-snug">
                    {data.impact.riotCollaboration.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1 italic">
                    {data.impact.riotCollaboration.subtitle}
                  </p>
                </div>

                {/* Major highlight metrics */}
                <div className="my-6 rounded-lg bg-zinc-950 p-4 border border-white/5 text-center">
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                    {data.impact.riotCollaboration.metricLabel}
                  </div>
                  <div className="font-display text-2xl font-black text-emerald-400 mt-1 text-glow-teal">
                    {data.impact.riotCollaboration.metricValue}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-auto pt-4 border-t border-white/5">
                {data.impact.riotCollaboration.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs text-zinc-300">
                    <ChevronRight className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 border-b border-white/5 bg-[#03050a]/60">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold text-riot-red tracking-widest uppercase">
              {language === "kr" ? "// 사례 분석 및 주요 실무" : "// CASE STUDIES & OPERATIONAL FOCUS"}
            </span>
            <h2 className="font-display text-4xl font-black text-white uppercase mt-2 tracking-widest">
              {language === "kr" ? "주요 프로그램 및 프로젝트" : "Featured Programs & Operations"}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-sans tracking-wide mt-2">
              {language === "kr"
                ? "정부 예산 사업 총괄, 글로벌 퍼블리셔 활성화 및 구단 파트너십 세부 관리 사례입니다."
                : "Deep dives into regional programs, international publisher collaborations, and professional partner agreements."}
            </p>
          </div>

          <div className="space-y-24">
            {/* Project 1: Chungnam */}
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {data.featuredProjects.chungnam.tags.map(t => (
                    <span key={t} className="rounded bg-riot-red/10 border border-riot-red/20 px-2.5 py-1 font-mono text-[10px] text-riot-red uppercase tracking-wider font-bold">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-3xl font-black text-white uppercase leading-tight">
                  {data.featuredProjects.chungnam.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed italic font-medium">
                  {data.featuredProjects.chungnam.subtitle}
                </p>

                {/* Project 1 Cover Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
                  <img 
                    src="https://i.ibb.co/Hf7GGT9k/1.jpg" 
                    alt={data.featuredProjects.chungnam.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3">
                    <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                      {language === "kr" ? "국제/국내 e스포츠 대회" : "International/Domestic Esports Tournaments"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                      {language === "kr" ? "해결 과제:" : "The Challenge:"}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.featuredProjects.chungnam.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                      {language === "kr" ? "나의 역할 및 사업 총괄:" : "My Ownership & Role:"}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.featuredProjects.chungnam.solutionOrRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project 1 Visual results bento cards */}
              <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 p-6 rounded-xl border border-white/5 bg-zinc-950 flex flex-col justify-between shadow-md">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    {language === "kr" ? "예산 및 프로젝트 규모" : "BUDGET & SCALE SUMMARY"}
                  </span>
                  <div className="font-display text-3xl font-black text-white mt-2">
                    {data.featuredProjects.chungnam.results[0]?.value || "₩1.65 Billion"}
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {language === "kr" 
                      ? "정부 공식 예산을 효율적으로 수립·배분하고, 세부 실행안을 기획하여 사업의 전 과정을 주도적으로 총괄했습니다." 
                      : "Direct administration of public development funds, coordinating audits, compliance structures, and deliverables."}
                  </p>
                </div>

                {data.featuredProjects.chungnam.results.slice(1).map((res) => (
                  <div key={res.label} className="p-5 rounded-xl border border-white/5 bg-zinc-950 shadow-md">
                    <div className="font-display text-2xl font-black text-riot-red">
                      {res.value}
                    </div>
                    <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-1.5 leading-tight font-bold">
                      {res.label}
                    </div>
                  </div>
                ))}

                {/* Key Tournament Broadcasts Video Section */}
                <div className="sm:col-span-2 mt-2 p-5 rounded-lg bg-zinc-950 border border-white/5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-riot-red animate-pulse" />
                    <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider font-bold">
                      {language === "kr" ? "연도별 주요 대회 영상" : "Key Tournament Broadcasts"}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { 
                        year: "2023", 
                        key: "year2023" as const, 
                        videoId: "N4YvoogqiWU",
                        label: language === "kr" ? "2023 충남 도지사배 청소년 E스포츠 대회" : "2023 Chungnam Youth Esports Tournament" 
                      },
                      { 
                        year: "2024", 
                        key: "year2024" as const, 
                        videoId: "zP_FS8uIE3w",
                        label: language === "kr" ? "2024 충남도지사배 청소년 & 직장인 E스포츠 대회" : "2024 Chungnam Youth & Worker Esports Tournament" 
                      },
                      { 
                        year: "2025", 
                        key: "year2025" as const, 
                        videoId: "pZq4ZJ8GrtI",
                        label: language === "kr" ? "2025 충남도지사배 청소년 & 직장인 E스포츠 대회" : "2025 Chungnam Youth & Worker Esports Tournament" 
                      },
                    ].map((btn) => {
                      const videoUrl = data.featuredProjects.chungnam.youtubeLinks?.[btn.key] || "";
                      const thumbnailUrl = btn.videoId ? `https://img.youtube.com/vi/${btn.videoId}/hqdefault.jpg` : "";
                      return (
                        <button
                          key={btn.year}
                          onClick={() => {
                            if (videoUrl) {
                              window.open(videoUrl, "_blank", "noopener,noreferrer");
                            }
                          }}
                          className="group relative flex flex-col items-center justify-center rounded-lg overflow-hidden min-h-[110px] p-4 text-center border border-white/5 hover:border-riot-red/30 transition duration-300 cursor-pointer"
                        >
                          {thumbnailUrl && (
                            <>
                              <div 
                                className="absolute inset-0 bg-cover bg-center filter blur-[1.5px] opacity-25 group-hover:opacity-40 transition duration-300 pointer-events-none" 
                                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                              />
                              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition duration-300 pointer-events-none" />
                            </>
                          )}
                          <div className="relative z-10 flex flex-col items-center justify-center">
                            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-riot-red/20 border border-riot-red/40 text-riot-red group-hover:scale-110 group-hover:bg-riot-red group-hover:text-white transition duration-300">
                              <span className="ml-0.5 text-[10px]">▶</span>
                            </div>
                            <span className="block font-display text-xs font-bold text-white uppercase group-hover:text-riot-red transition duration-300">
                              {btn.year}
                            </span>
                            <span className="block font-mono text-[9px] text-zinc-300 mt-1 font-medium group-hover:text-white transition duration-300 max-w-full leading-snug line-clamp-2">
                              {btn.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: VALORANT Masters Bangkok */}
            <div className="grid gap-12 lg:grid-cols-12 items-start border-t border-white/5 pt-20">
              <div className="lg:col-span-5 space-y-6 lg:order-last">
                <div className="flex flex-wrap gap-2">
                  {data.featuredProjects.valorant.tags.map(t => (
                    <span key={t} className="rounded bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-1 font-mono text-[10px] text-brand-purple uppercase tracking-wider font-bold">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-3xl font-black text-white uppercase leading-tight">
                  {data.featuredProjects.valorant.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed italic font-medium">
                  {data.featuredProjects.valorant.subtitle}
                </p>

                {/* Project 2 Cover Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
                  <img 
                    src="https://i.ibb.co/h35WYRN/2.jpg" 
                    alt={data.featuredProjects.valorant.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3">
                    <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                      {language === "kr" ? "로컬 크라우드 뷰잉 활성화" : "Cross-Border Viewing Party Fanbase"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                      {language === "kr" ? "해결 과제:" : "The Challenge:"}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.featuredProjects.valorant.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                      {language === "kr" ? "활성화 해결책 및 캠페인 실행:" : "The Solution & Campaign Execution:"}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.featuredProjects.valorant.solutionOrRole}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                  {data.featuredProjects.valorant.results.map((res) => (
                    <div key={res.label} className="p-3 bg-zinc-950 rounded border border-white/10 hover:border-valorant-teal/30 transition text-center shadow-md">
                      <div className="font-display text-base font-black text-valorant-teal text-glow-teal">{res.value}</div>
                      <div className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-bold">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Stakeholder Map - Fixed layout and text clipping inside Operational Architecture */}
              <div className="lg:col-span-7 w-full">
                {data.featuredProjects.valorant.stakeholderMap && (
                  <StakeholderMap 
                    from={data.featuredProjects.valorant.stakeholderMap.from}
                    me={data.featuredProjects.valorant.stakeholderMap.me}
                    to={data.featuredProjects.valorant.stakeholderMap.to}
                    language={language}
                  />
                )}
              </div>
            </div>

            {/* Project 3: DouyuTV x LCK */}
            <div className="grid gap-12 lg:grid-cols-12 items-start border-t border-white/5 pt-20">
              <div className="lg:col-span-5 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {data.featuredProjects.douyu.tags.map(t => (
                    <span key={t} className="rounded bg-valorant-teal/10 border border-valorant-teal/20 px-2.5 py-1 font-mono text-[10px] text-valorant-teal uppercase tracking-wider font-bold">
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-3xl font-black text-white uppercase leading-tight">
                  {data.featuredProjects.douyu.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed italic font-medium">
                  {data.featuredProjects.douyu.subtitle}
                </p>

                {/* Project 3 Cover Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
                  <img 
                    src="https://i.ibb.co/kg5T47fK/3.png" 
                    alt={data.featuredProjects.douyu.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3">
                    <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                      {language === "kr" ? "정상급 프로 선수 스트리밍 허브 오퍼레이션" : "Elite Player Broadcast Hub Operations"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                      {language === "kr" ? "파트너십 당면 과제:" : "The Partnership Challenge:"}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.featuredProjects.douyu.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                      {language === "kr" ? "나의 역할 및 계약 이행:" : "Responsibilities & Operational Binds:"}
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {data.featuredProjects.douyu.solutionOrRole}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2.5">
                  <span className="block font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
                    {language === "kr" ? "참여 LCK 구단 (5개)" : "Coordinated LCK Organizations (5)"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["KT Rolster", "Hanwha Life Esports", "Gen.G Esports", "DWG KIA", "Liiv SANDBOX"].map((team) => (
                      <span key={team} className="rounded bg-zinc-950 border border-white/5 px-3 py-1.5 text-xs text-zinc-300 font-medium">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* KPI Tracker Graph/Grid for Project 3 */}
              <div className="lg:col-span-7 p-6 rounded-2xl border border-white/5 bg-zinc-950 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex flex-col">
                    <span className="font-display text-base font-bold uppercase tracking-wider text-white">
                      {language === "kr" ? "실시간 성능 데이터 허브" : "Live KPI Performance Hub"}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase mt-1 font-bold">
                      {language === "kr" ? "DouyuTV x LCK 구단 스트리밍 모니터링" : "DouyuTV x LCK Streaming Trackers"}
                    </span>
                  </div>
                  <div className="flex gap-1.5 rounded-lg bg-zinc-900 p-1">
                    <button 
                      onClick={() => setActiveTab("projects")}
                      className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition font-bold ${
                        activeTab === "projects" ? "bg-riot-red text-white" : "text-zinc-500"
                      }`}
                    >
                      {language === "kr" ? "성과 지표" : "Targets"}
                    </button>
                    <button 
                      onClick={() => setActiveTab("metrics")}
                      className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition font-bold ${
                        activeTab === "metrics" ? "bg-riot-red text-white" : "text-zinc-500"
                      }`}
                    >
                      {language === "kr" ? "이행 감사" : "Audits"}
                    </button>
                  </div>
                </div>

                {activeTab === "projects" ? (
                  <div className="space-y-4">
                    {data.featuredProjects.douyu.metrics?.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between p-4.5 rounded-lg bg-zinc-900/40 border border-white/5 shadow-sm">
                        <span className="font-display text-sm text-zinc-300 font-semibold">{metric.label}</span>
                        <span className="font-mono text-base font-bold text-riot-red text-glow-red">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded bg-zinc-900/60 border border-white/5">
                      <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                        {language === "kr" ? "방송 규정 준수 비율" : "Audited Stream Compliance Rate"}
                      </span>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="font-display text-base font-bold text-white">
                          {language === "kr" ? "99.8% 준수 완료" : "99.8% Compliance"}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">PASSED</span>
                      </div>
                    </div>
                    <div className="p-4 rounded bg-zinc-900/60 border border-white/5">
                      <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                        {language === "kr" ? "선수 소통 즉각 피드백 비율" : "Direct Player Communication Response Rate"}
                      </span>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="font-display text-base font-bold text-white">
                          {language === "kr" ? "100% 즉시 대응" : "100% (Instant SLA)"}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">PASSED</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowReports(!showReports)}
                  className="group mt-6 w-full rounded-lg bg-zinc-900/30 hover:bg-zinc-900/60 border border-dashed border-white/10 hover:border-riot-red/40 p-4 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold transition group-hover:text-riot-red">
                    {language === "kr" 
                      ? "지역 코디네이터, 퍼블리셔 및 리그 관계자 보고용 감사 리포트"
                      : "Audit report for regional coordinators, publishers, and league officials"}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                    {showReports 
                      ? (language === "kr" ? "▲ 클릭하여 리포트 닫기" : "▲ CLICK TO HIDE REPORT") 
                      : (language === "kr" ? "▼ 클릭하여 리포트 예시 보기" : "▼ CLICK TO VIEW REPORT SAMPLE")
                    }
                  </span>
                </button>

                <AnimatePresence>
                  {showReports && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="max-w-[200px] mx-auto grid grid-cols-2 gap-2 pt-2">
                        <div className="relative group overflow-hidden rounded border border-white/10 bg-zinc-950 shadow-2xl">
                          <img 
                            src="https://i.ibb.co/S4sCRBFj/2026-06-25-082204.png" 
                            className="w-full h-auto aspect-[1/1.414] object-cover transition duration-500 group-hover:scale-102" 
                            alt="Audit Report Page 1" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                            <span className="font-mono text-[8px] text-white uppercase tracking-wider bg-zinc-950/90 px-1 py-0.5 rounded border border-white/10">P1</span>
                          </div>
                        </div>
                        <div className="relative group overflow-hidden rounded border border-white/10 bg-zinc-950 shadow-2xl">
                          <img 
                            src="https://i.ibb.co/TxmTwDRy/2026-06-25-082307.png" 
                            className="w-full h-auto aspect-[1/1.414] object-cover transition duration-500 group-hover:scale-102" 
                            alt="Audit Report Page 2" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                            <span className="font-mono text-[8px] text-white uppercase tracking-wider bg-zinc-950/90 px-1 py-0.5 rounded border border-white/10">P2</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="py-24 border-b border-white/5 bg-[#05070c] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-riot-red/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold text-riot-red tracking-widest uppercase">
              {language === "kr" ? "// 종합 역량 분석표" : "// EXPERTISE PROFILE MATRIX"}
            </span>
            <h2 className="font-display text-4xl font-black text-white uppercase mt-2 tracking-widest">
              {language === "kr" ? "실무 강점 및 역량" : "Skills & Expertise"}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-sans tracking-wide mt-2">
              {language === "kr" 
                ? "파트너십 요구 사항 및 대회 운영 프로세스에 입각한 전문 지식 분포도입니다."
                : "Core professional competencies aligned against operational partnership requirements and tournament metrics."}
            </p>
          </div>

          <SkillsChart skills={data.skills} />
        </div>
      </section>

      {/* Career Timeline Section */}
      <section id="timeline" className="py-24 border-b border-white/5 bg-[#070a10]/40">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold text-riot-red tracking-widest uppercase">
              {language === "kr" ? "// 발자취" : "// FOOTPRINTS"}
            </span>
            <h2 className="font-display text-4xl font-black text-white uppercase mt-2 tracking-widest">
              {language === "kr" ? "경력 타임라인" : "Career Trajectory"}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-sans tracking-wide mt-2">
              {language === "kr"
                ? "스트리밍 계약 실무부터 총 16억 5천만 원 규모의 공공 프로젝트 책임 매니저까지의 성장을 기록합니다."
                : "Accelerated scaling from streamer contract auditing to managing ₩1.65B+ regional development budgets."}
            </p>
          </div>

          <TimelineView timeline={data.timeline} />

          {/* Complete Project History Toggler */}
          <div className="mt-16 text-center relative z-10 print:hidden">
            <button
              onClick={() => setShowFullHistory(!showFullHistory)}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-riot-red/30 bg-riot-red/5 hover:bg-riot-red/10 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-black/40 hover:border-riot-red/50 hover:shadow-riot-red/5"
            >
              <Briefcase className="h-4 w-4 text-riot-red group-hover:scale-110 transition-transform" />
              <span>
                {showFullHistory 
                  ? CAREER_HISTORY_DATA[language].buttonHide 
                  : CAREER_HISTORY_DATA[language].buttonShow
                }
              </span>
              <motion.span
                animate={{ rotate: showFullHistory ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-400 font-mono text-[10px]"
              >
                ▼
              </motion.span>
            </button>
          </div>

          <div className={`${showFullHistory ? "block" : "hidden print:block"} mt-8 max-w-3xl mx-auto print:max-w-none print:mt-12`}>
            <div className="border border-white/5 bg-zinc-950/90 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl relative print:shadow-none print:p-0">
              {/* Subtle decorative background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/2 to-transparent rounded-2xl pointer-events-none print:hidden" />
              
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-display text-lg font-black text-white uppercase tracking-wider">
                  {CAREER_HISTORY_DATA[language].title}
                </h3>
                <p className="font-mono text-[9px] text-zinc-500 tracking-widest mt-1 uppercase">
                  ESPORTS PROJECT ARCHIVE // {language === "kr" ? "총괄 및 참여 성과 목록" : "ALL PORTFOLIO DELIVERABLES"}
                </p>
              </div>

              <div className="space-y-8">
                {CAREER_HISTORY_DATA[language].years.map((y) => (
                  <div 
                    key={y.year} 
                    className="group relative grid md:grid-cols-[80px_1fr] gap-4 md:gap-6 border-l-2 border-zinc-800/60 pl-4 md:pl-0 md:border-l-0 print:break-inside-avoid print:page-break-inside-avoid"
                  >
                    {/* Year Column */}
                    <div className="flex md:flex-col md:items-start justify-start pt-1 md:border-r md:border-white/5 md:pr-4">
                      <span className="font-display text-2xl font-black tracking-tighter text-riot-red">
                        {y.year}
                      </span>
                    </div>

                    {/* Projects Breakdown Column */}
                    <div className="space-y-4">
                      {/* Main Projects */}
                      {y.main.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                            <span className="font-mono text-[9px] text-brand-purple uppercase tracking-wider font-bold">
                              {CAREER_HISTORY_DATA[language].mainLabel}
                            </span>
                          </div>
                          <ul className="grid gap-2 sm:grid-cols-2 print:grid-cols-2">
                            {y.main.map((p, pIdx) => (
                              <li 
                                key={pIdx} 
                                className="relative flex items-start gap-2 text-xs text-zinc-200 font-medium bg-zinc-900/60 border border-white/5 p-2.5 rounded-lg hover:border-white/10 transition duration-300"
                              >
                                <span className="text-brand-purple font-mono select-none mt-0.5">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Participated / Production Support */}
                      {y.participated.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-valorant-teal" />
                            <span className="font-mono text-[9px] text-valorant-teal uppercase tracking-wider font-bold">
                              {CAREER_HISTORY_DATA[language].participatedLabel}
                            </span>
                          </div>
                          <ul className="grid gap-2 sm:grid-cols-2 print:grid-cols-2">
                            {y.participated.map((p, pIdx) => (
                              <li 
                                key={pIdx} 
                                className="relative flex items-start gap-2 text-xs text-zinc-400 bg-zinc-900/30 border border-white/5 p-2.5 rounded-lg hover:border-white/10 transition duration-300"
                              >
                                <span className="text-valorant-teal font-mono select-none mt-0.5">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative bg-black">
        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
          <span className="font-mono text-xs font-bold text-riot-red tracking-widest uppercase font-black">
            {language === "kr" ? "// 채용 제안 및 기회 연결" : "// RECRUITMENT & CAREER OPPORTUNITIES"}
          </span>
          <h2 className="font-display text-4xl font-black text-white uppercase mt-2 tracking-widest">
            {language === "kr" ? "준비된 인재와 함께 프로젝트를 주도하세요" : "Ready to Drive Operational Success"}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-zinc-300 leading-relaxed mt-4 font-medium">
            {language === "kr"
              ? "글로벌 역량과 데이터 분석력, E스포츠 산업에 대한 깊은 이해도를 바탕으로 파트너와 팬 모두에게 최적의 가치를 제공하는 E스포츠 프로그램 매니저입니다. 귀사의 전략적 비전을 성공적으로 실행하고 실질적인 성과를 창출할 준비가 되어 있습니다."
              : "An Esports Program Manager who delivers optimal value to both partners and fans, powered by global capability, data-driven analytics, and deep industry expertise. I am fully prepared to successfully execute your strategic vision and generate tangible results."}
          </p>

          <div className="mt-12 flex justify-center max-w-xs mx-auto">
            {/* Email link */}
            <a
              href={`mailto:${data.contact.email}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-black hover:opacity-90 active:scale-95 transition shadow-lg text-center"
            >
              <Send className="h-4.5 w-4.5 shrink-0" />
              {language === "kr" ? "채용 제안 이메일 보내기" : "Send Career Proposal"}
            </a>
          </div>

          <div className="mt-20 border-t border-white/5 pt-8 text-center text-xs font-mono text-zinc-600 tracking-widest uppercase font-bold">
            <span>{language === "kr" ? "© 2026 E스포츠 사업 & 파트너십 포트폴리오. All rights reserved." : "© 2026 Esports Operations Portfolio. All rights reserved."}</span>
            <p className="mt-2 text-[10px] tracking-widest text-zinc-700">
              {language === "kr" 
                ? "양이지" 
                : "YANG EZZY"}
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button for Admin triggers */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdminPanelOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-riot-red to-brand-purple p-0.5 shadow-lg shadow-riot-red/20 border border-white/10 animate-pulse hover:animate-none"
          title="Open Admin Console"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950 text-white">
            <Settings className="h-5 w-5 text-riot-red" />
          </div>
        </motion.button>
      </div>

      {/* Admin Panel slider / dialog modal */}
      <AnimatePresence>
        {isAdminPanelOpen && (
          <AdminPanel
            bilingualData={bilingualData}
            onSaveBilingual={handleSaveBilingual}
            onReset={handleReset}
            isOpen={isAdminPanelOpen}
            onClose={() => setIsAdminPanelOpen(false)}
            isAdminActive={isAdminActive}
            onLoginSuccess={handleLoginSuccess}
            language={language}
            defaultLang={defaultLang}
            onDefaultLangChange={handleDefaultLangChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
