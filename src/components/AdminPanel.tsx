import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Lock, ShieldCheck, Eye, Save, RotateCcw, 
  Settings, Award, Zap, TrendingUp, HelpCircle, Trash2, Plus 
} from "lucide-react";
import { PortfolioData, KPICard, SkillItem, TimelineEvent } from "../types";
import { DEFAULT_PORTFOLIO_DATA } from "../defaultData";

interface AdminPanelProps {
  bilingualData: { kr: PortfolioData; en: PortfolioData };
  onSaveBilingual: (newBilingualData: { kr: PortfolioData; en: PortfolioData }) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
  isAdminActive: boolean;
  onLoginSuccess: () => void;
  language?: "en" | "kr";
  defaultLang: "en" | "kr";
  onDefaultLangChange: (lang: "en" | "kr") => void;
}

type TabType = "general" | "kpis" | "impact" | "projects" | "skills" | "timeline";

export default function AdminPanel({
  bilingualData,
  onSaveBilingual,
  onReset,
  isOpen,
  onClose,
  isAdminActive,
  onLoginSuccess,
  language = "kr",
  defaultLang,
  onDefaultLangChange
}: AdminPanelProps) {
  // Login flow
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active edit tab
  const [activeTab, setActiveTab] = useState<TabType>("general");

  // Master bilingual state
  const [localBilingualData, setLocalBilingualData] = useState<{ kr: PortfolioData; en: PortfolioData }>(bilingualData || DEFAULT_PORTFOLIO_DATA);
  // Current editing language in admin panel (defaults to current app language)
  const [editLang, setEditLang] = useState<"kr" | "en">(language || "kr");


  // Local copies of state for editing initialized to editLang safely
  const safeLang = localBilingualData && localBilingualData[editLang] ? editLang : "kr";
  const currentLangData = (localBilingualData && localBilingualData[safeLang]) || DEFAULT_PORTFOLIO_DATA.kr;

  const [editedHero, setEditedHero] = useState(currentLangData.hero);
  const [editedAbout, setEditedAbout] = useState(currentLangData.about);
  const [editedKpis, setEditedKpis] = useState<KPICard[]>(currentLangData.kpis || []);
  const [editedImpact, setEditedImpact] = useState(currentLangData.impact);
  const [editedProjects, setEditedProjects] = useState(currentLangData.featuredProjects);
  const [editedSkills, setEditedSkills] = useState<SkillItem[]>(currentLangData.skills || []);
  const [editedTimeline, setEditedTimeline] = useState<TimelineEvent[]>(currentLangData.timeline || []);

  // Synchronize values when panel is opened or when edit language changes
  const syncStates = (lang: "kr" | "en" = editLang) => {
    const targetData = (localBilingualData && localBilingualData[lang]) || DEFAULT_PORTFOLIO_DATA[lang];
    if (!targetData) return;
    setEditedHero(targetData.hero);
    setEditedAbout(targetData.about);
    setEditedKpis(targetData.kpis || []);
    setEditedImpact(targetData.impact);
    setEditedProjects(targetData.featuredProjects);
    setEditedSkills(targetData.skills || []);
    setEditedTimeline(targetData.timeline || []);
  };

  const syncProjectImages = (
    source: typeof editedProjects,
    target: typeof editedProjects
  ): typeof editedProjects => {
    if (!source || !target) return target || source;
    return {
      chungnam: {
        ...(target.chungnam || {}),
        imageUrl: source?.chungnam?.imageUrl ?? target?.chungnam?.imageUrl,
        reportImage1: source?.chungnam?.reportImage1 ?? target?.chungnam?.reportImage1,
        reportImage2: source?.chungnam?.reportImage2 ?? target?.chungnam?.reportImage2,
      },
      valorant: {
        ...(target.valorant || {}),
        imageUrl: source?.valorant?.imageUrl ?? target?.valorant?.imageUrl,
        reportImage1: source?.valorant?.reportImage1 ?? target?.valorant?.reportImage1,
        reportImage2: source?.valorant?.reportImage2 ?? target?.valorant?.reportImage2,
      },
      douyu: {
        ...(target.douyu || {}),
        imageUrl: source?.douyu?.imageUrl ?? target?.douyu?.imageUrl,
        reportImage1: source?.douyu?.reportImage1 ?? target?.douyu?.reportImage1,
        reportImage2: source?.douyu?.reportImage2 ?? target?.douyu?.reportImage2,
      }
    } as any;
  };

  const handleEditLangChange = (newLang: "kr" | "en") => {
    if (newLang === editLang) return;

    const otherLang = editLang === "kr" ? "en" : "kr";

    // Synchronize project images so they are kept in common
    const syncedOtherProjects = syncProjectImages(editedProjects, localBilingualData[otherLang].featuredProjects);

    // 1. Save current edits to localBilingualData for current editLang
    const currentEdits: PortfolioData = {
      hero: editedHero,
      about: editedAbout,
      kpis: editedKpis,
      impact: editedImpact,
      featuredProjects: editedProjects,
      skills: editedSkills,
      timeline: editedTimeline,
      contact: localBilingualData[editLang].contact
    };

    const updatedBilingual = {
      ...localBilingualData,
      [editLang]: currentEdits,
      [otherLang]: {
        ...localBilingualData[otherLang],
        featuredProjects: syncedOtherProjects
      }
    };

    setLocalBilingualData(updatedBilingual);

    // 2. Load the edits for the new editLang from updatedBilingual
    const targetData = updatedBilingual[newLang];
    setEditedHero(targetData.hero);
    setEditedAbout(targetData.about);
    setEditedKpis(targetData.kpis);
    setEditedImpact(targetData.impact);
    setEditedProjects(targetData.featuredProjects);
    setEditedSkills(targetData.skills);
    setEditedTimeline(targetData.timeline);

    // 3. Set the active editLang
    setEditLang(newLang);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "0710") {
      setLoginError(false);
      onLoginSuccess();
      setPassword("");
      // Sync state with current editLang when logged in successfully
      const targetData = localBilingualData[editLang];
      setEditedHero(targetData.hero);
      setEditedAbout(targetData.about);
      setEditedKpis(targetData.kpis);
      setEditedImpact(targetData.impact);
      setEditedProjects(targetData.featuredProjects);
      setEditedSkills(targetData.skills);
      setEditedTimeline(targetData.timeline);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveAll = () => {
    const otherLang = editLang === "kr" ? "en" : "kr";

    // Synchronize project images so they are kept in common
    const syncedOtherProjects = syncProjectImages(editedProjects, localBilingualData[otherLang].featuredProjects);

    const currentEdits: PortfolioData = {
      hero: editedHero,
      about: editedAbout,
      kpis: editedKpis,
      impact: editedImpact,
      featuredProjects: editedProjects,
      skills: editedSkills,
      timeline: editedTimeline,
      contact: localBilingualData[editLang].contact
    };

    const finalBilingualData = {
      ...localBilingualData,
      [editLang]: currentEdits,
      [otherLang]: {
        ...localBilingualData[otherLang],
        featuredProjects: syncedOtherProjects
      }
    };

    onSaveBilingual(finalBilingualData);
    onClose();
  };

  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to reset all portfolio data for BOTH languages to default? This cannot be undone.")) {
      onReset();
      onClose();
    }
  };

  // Helper functions for dynamic lists (KPIs, Skills, Timeline)
  const handleKpiChange = (index: number, field: keyof KPICard, value: string) => {
    const updated = [...editedKpis];
    updated[index] = { ...updated[index], [field]: value };
    setEditedKpis(updated);
  };

  const handleSkillChange = (index: number, field: keyof SkillItem, value: string | number) => {
    const updated = [...editedSkills];
    updated[index] = { ...updated[index], [field]: value };
    setEditedSkills(updated);
  };

  const handleAddTimeline = () => {
    const newEvent: TimelineEvent = {
      id: `time-${Date.now()}`,
      year: "2026",
      title: "New Program Title",
      subtitle: "Role or Agency",
      description: "Brief summary of achievements and stakeholder impact."
    };
    setEditedTimeline([...editedTimeline, newEvent]);
  };

  const handleRemoveTimeline = (id: string) => {
    setEditedTimeline(editedTimeline.filter(t => t.id !== id));
  };

  const handleTimelineChange = (id: string, field: keyof TimelineEvent, value: string) => {
    setEditedTimeline(editedTimeline.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-white/10 bg-[#0b0e14] text-white shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-zinc-950 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Settings className="h-5 w-5 text-riot-red" />
            <h3 className="font-display text-base md:text-lg font-bold uppercase tracking-wider">
              Esports Portfolio Admin Console
            </h3>
            <span className="rounded bg-riot-red/10 border border-riot-red/20 px-2 py-0.5 font-mono text-[9px] text-riot-red uppercase tracking-wider font-bold">
              Editing: {editLang.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language switch controls */}
            <div className="flex items-center gap-1 rounded-lg bg-zinc-900 border border-white/5 p-1 select-none">
              <button
                type="button"
                onClick={() => handleEditLangChange("kr")}
                className={`rounded px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition ${
                  editLang === "kr"
                    ? "bg-riot-red text-white shadow-lg shadow-riot-red/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                KR
              </button>
              <button
                type="button"
                onClick={() => handleEditLangChange("en")}
                className={`rounded px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition ${
                  editLang === "en"
                    ? "bg-riot-red text-white shadow-lg shadow-riot-red/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <button 
              onClick={onClose}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isAdminActive ? (
          /* Password Authentication Screen */
          <div className="flex flex-1 flex-col items-center justify-center p-8">
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="w-full max-w-md rounded-2xl border border-white/5 bg-zinc-950/80 p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-riot-red/10 border border-riot-red/20 text-riot-red">
                <Lock className="h-5 w-5" />
              </div>
              <h4 className="font-display text-lg font-extrabold tracking-wide text-white uppercase">
                Access Restricted
              </h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Please enter the administrator credentials to manage portfolio metrics, programs, and strategic partnerships.
              </p>

              <form onSubmit={handleLogin} className="mt-6 text-left">
                <label className="block font-mono text-[10px] text-zinc-400 tracking-wider uppercase mb-1.5">
                  {language === "kr" ? "관리자 비밀번호" : "Admin Passcode"}
                </label>
                <input
                  type="password"
                  placeholder="••••"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-center font-mono text-sm tracking-widest text-white placeholder-zinc-600 focus:border-riot-red focus:outline-none focus:ring-1 focus:ring-riot-red"
                  required
                  autoFocus
                />
                
                {loginError && (
                  <p className="mt-2 text-center font-mono text-[10px] text-riot-red tracking-wide uppercase">
                    Incorrect Passcode. Access Denied.
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-5 w-full rounded-lg bg-gradient-to-r from-brand-purple to-riot-red py-3 text-xs font-bold tracking-widest uppercase text-white hover:opacity-90 active:scale-95 transition"
                >
                  Authorize Console
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* Main Editor Layout */
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-56 border-r border-white/5 bg-zinc-950 p-4 space-y-1">
              <span className="block font-mono text-[9px] text-zinc-500 tracking-wider uppercase mb-3 px-2">
                Edit Sections
              </span>
              {[
                { id: "general", label: "General & About", icon: <Award className="h-4 w-4" /> },
                { id: "kpis", label: "KPI Metrics", icon: <Zap className="h-4 w-4" /> },
                { id: "impact", label: "Impact Cards", icon: <TrendingUp className="h-4 w-4" /> },
                { id: "projects", label: "Featured Projects", icon: <Settings className="h-4 w-4" /> },
                { id: "skills", label: "JD Skills", icon: <HelpCircle className="h-4 w-4" /> },
                { id: "timeline", label: "Career Timeline", icon: <Settings className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition ${
                    activeTab === tab.id
                      ? "bg-riot-red/10 text-riot-red border-l-2 border-riot-red"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}

              <div className="pt-8 border-t border-white/5 mt-8 px-2">
                <button
                  onClick={handleResetClick}
                  className="flex w-full items-center justify-center gap-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2 font-mono text-[10px] text-zinc-400 hover:text-white transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* Tab Form Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-zinc-900/40">
              <AnimatePresence mode="wait">
                {activeTab === "general" && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-5"
                  >
                    <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2 text-zinc-300">
                      General Hero & Profile Information
                    </h4>

                    {/* Default load language config */}
                    <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/50 space-y-3">
                      <label className="block font-mono text-[10px] text-riot-red font-bold uppercase tracking-wider">
                        {language === "kr" ? "홈페이지 첫 로딩 기본 언어 설정" : "Homepage Default Language (First Load)"}
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold cursor-pointer select-none">
                          <input
                            type="radio"
                            name="defaultLang"
                            value="kr"
                            checked={defaultLang === "kr"}
                            onChange={() => onDefaultLangChange("kr")}
                            className="accent-riot-red h-4 w-4"
                          />
                          <span>{language === "kr" ? "한국어 (KR)" : "Korean (KR)"}</span>
                        </label>
                        <label className="flex items-center gap-2.5 text-xs text-zinc-300 font-semibold cursor-pointer select-none">
                          <input
                            type="radio"
                            name="defaultLang"
                            value="en"
                            checked={defaultLang === "en"}
                            onChange={() => onDefaultLangChange("en")}
                            className="accent-riot-red h-4 w-4"
                          />
                          <span>{language === "kr" ? "English (EN)" : "English (EN)"}</span>
                        </label>
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        {language === "kr" 
                          ? "* 사용자가 별도로 언어를 변경하지 않고 처음 홈페이지에 방문했을 때 표시될 기본 언어를 지정합니다." 
                          : "* Configures which language is shown automatically to first-time website visitors before any manual toggle is made."}
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-400 uppercase mb-1">Portfolio Title</label>
                      <input
                        type="text"
                        value={editedHero.title}
                        onChange={(e) => setEditedHero({ ...editedHero, title: e.target.value })}
                        className="w-full rounded border border-white/10 bg-zinc-950 p-2 text-xs text-white focus:border-brand-purple focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-400 uppercase mb-1">Hero Main Headline</label>
                      <input
                        type="text"
                        value={editedHero.headline}
                        onChange={(e) => setEditedHero({ ...editedHero, headline: e.target.value })}
                        className="w-full rounded border border-white/10 bg-zinc-950 p-2 text-xs text-white focus:border-brand-purple focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-400 uppercase mb-1">Hero Subheadline</label>
                      <textarea
                        rows={2}
                        value={editedHero.subheadline}
                        onChange={(e) => setEditedHero({ ...editedHero, subheadline: e.target.value })}
                        className="w-full rounded border border-white/10 bg-zinc-950 p-2 text-xs text-white focus:border-brand-purple focus:outline-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <label className="block font-mono text-[9px] text-zinc-400 uppercase mb-1">About Me Summary (Who I Am)</label>
                      <textarea
                        rows={4}
                        value={editedAbout.description}
                        onChange={(e) => setEditedAbout({ ...editedAbout, description: e.target.value })}
                        className="w-full rounded border border-white/10 bg-zinc-950 p-2 text-xs text-white focus:border-brand-purple focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === "kpis" && (
                  <motion.div
                    key="kpis"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2 text-zinc-300">
                      Core KPI Performance Cards
                    </h4>
                    <p className="text-[11px] text-zinc-400 mb-3">
                      Modify the verified metrics and descriptions visible right on the main fold of the website.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {editedKpis.map((kpi, idx) => (
                        <div key={kpi.id} className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-2">
                          <span className="font-mono text-[9px] text-riot-red uppercase tracking-wider">Metric Card #{idx + 1}</span>
                          <div>
                            <label className="block font-mono text-[8px] text-zinc-500 uppercase">Value (e.g., ₩1.65B+)</label>
                            <input
                              type="text"
                              value={kpi.value}
                              onChange={(e) => handleKpiChange(idx, "value", e.target.value)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs font-bold text-white focus:border-brand-purple focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[8px] text-zinc-500 uppercase">Primary Title</label>
                            <input
                              type="text"
                              value={kpi.label}
                              onChange={(e) => handleKpiChange(idx, "label", e.target.value)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white focus:border-brand-purple focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[8px] text-zinc-500 uppercase">Sub-label (Scope detail)</label>
                            <input
                              type="text"
                              value={kpi.sublabel}
                              onChange={(e) => handleKpiChange(idx, "sublabel", e.target.value)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white focus:border-brand-purple focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "impact" && (
                  <motion.div
                    key="impact"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2 text-zinc-300">
                      Impact & Ownership Category Sections
                    </h4>

                    {/* Program Management */}
                    <div className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3">
                      <span className="font-mono text-[9px] text-riot-red tracking-wider uppercase font-bold">1. Program Management Card</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Program Title</label>
                          <input
                            type="text"
                            value={editedImpact.programManagement.title}
                            onChange={(e) => setEditedImpact({
                              ...editedImpact,
                              programManagement: { ...editedImpact.programManagement, title: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Key Metric Value</label>
                          <input
                            type="text"
                            value={editedImpact.programManagement.metricValue}
                            onChange={(e) => setEditedImpact({
                              ...editedImpact,
                              programManagement: { ...editedImpact.programManagement, metricValue: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Partnership Management */}
                    <div className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3">
                      <span className="font-mono text-[9px] text-brand-purple tracking-wider uppercase font-bold">2. Partnership Management Card</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Partnership Title</label>
                          <input
                            type="text"
                            value={editedImpact.partnershipManagement.title}
                            onChange={(e) => setEditedImpact({
                              ...editedImpact,
                              partnershipManagement: { ...editedImpact.partnershipManagement, title: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Key Metric Value</label>
                          <input
                            type="text"
                            value={editedImpact.partnershipManagement.metricValue}
                            onChange={(e) => setEditedImpact({
                              ...editedImpact,
                              partnershipManagement: { ...editedImpact.partnershipManagement, metricValue: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Riot Collaboration */}
                    <div className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3">
                      <span className="font-mono text-[9px] text-valorant-teal tracking-wider uppercase font-bold">3. Riot Games Collaboration Card</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Campaign/Event Title</label>
                          <input
                            type="text"
                            value={editedImpact.riotCollaboration.title}
                            onChange={(e) => setEditedImpact({
                              ...editedImpact,
                              riotCollaboration: { ...editedImpact.riotCollaboration, title: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Key Metric Value</label>
                          <input
                            type="text"
                            value={editedImpact.riotCollaboration.metricValue}
                            onChange={(e) => setEditedImpact({
                              ...editedImpact,
                              riotCollaboration: { ...editedImpact.riotCollaboration, metricValue: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2 text-zinc-300">
                      Featured Project Overviews & Metrics
                    </h4>

                    {/* Project 1 Editor */}
                    <div className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3">
                      <span className="font-mono text-[10px] text-riot-red uppercase font-bold">Project 1: Chungnam Esports Development</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Project Title</label>
                          <input
                            type="text"
                            value={editedProjects.chungnam.title}
                            onChange={(e) => setEditedProjects({
                              ...editedProjects,
                              chungnam: { ...editedProjects.chungnam, title: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Project Subtitle</label>
                          <input
                            type="text"
                            value={editedProjects.chungnam.subtitle}
                            onChange={(e) => setEditedProjects({
                              ...editedProjects,
                              chungnam: { ...editedProjects.chungnam, subtitle: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                      </div>


                      <div>
                        <label className="block font-mono text-[8px] text-zinc-400 uppercase">Challenge Statement</label>
                        <textarea
                          rows={2}
                          value={editedProjects.chungnam.challenge}
                          onChange={(e) => setEditedProjects({
                            ...editedProjects,
                            chungnam: { ...editedProjects.chungnam, challenge: e.target.value }
                          })}
                          className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[8px] text-zinc-400 uppercase">My Role Description</label>
                        <textarea
                          rows={2}
                          value={editedProjects.chungnam.solutionOrRole}
                          onChange={(e) => setEditedProjects({
                            ...editedProjects,
                            chungnam: { ...editedProjects.chungnam, solutionOrRole: e.target.value }
                          })}
                          className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                        />
                      </div>

                      {/* Project Metrics (Results) */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                          Project Metrics (Value & Label)
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {editedProjects.chungnam.results.map((res, index) => (
                            <div key={index} className="p-2 rounded bg-zinc-900 border border-white/5 space-y-1">
                              <span className="block font-mono text-[8px] text-zinc-500 font-bold uppercase">Metric #{index + 1}</span>
                              <div>
                                <label className="block font-mono text-[7px] text-zinc-400 uppercase">Value</label>
                                <input
                                  type="text"
                                  value={res.value}
                                  onChange={(e) => {
                                    const updatedResults = [...editedProjects.chungnam.results];
                                    updatedResults[index] = { ...res, value: e.target.value };
                                    setEditedProjects({
                                      ...editedProjects,
                                      chungnam: { ...editedProjects.chungnam, results: updatedResults }
                                    });
                                  }}
                                  className="w-full rounded border border-white/10 bg-zinc-950 p-1 text-xs text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="block font-mono text-[7px] text-zinc-400 uppercase">Label</label>
                                <input
                                  type="text"
                                  value={res.label}
                                  onChange={(e) => {
                                    const updatedResults = [...editedProjects.chungnam.results];
                                    updatedResults[index] = { ...res, label: e.target.value };
                                    setEditedProjects({
                                      ...editedProjects,
                                      chungnam: { ...editedProjects.chungnam, results: updatedResults }
                                    });
                                  }}
                                  className="w-full rounded border border-white/10 bg-zinc-950 p-1 text-xs text-white"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* YouTube Broadcast Links */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                          YouTube Broadcast Links (Tournament Videos)
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">2023 Video URL</label>
                            <input
                              type="text"
                              value={editedProjects.chungnam.youtubeLinks?.year2023 || ""}
                              onChange={(e) => setEditedProjects({
                                ...editedProjects,
                                chungnam: {
                                  ...editedProjects.chungnam,
                                  youtubeLinks: {
                                    year2023: e.target.value,
                                    year2024: editedProjects.chungnam.youtubeLinks?.year2024 || "",
                                    year2025: editedProjects.chungnam.youtubeLinks?.year2025 || "",
                                  }
                                }
                              })}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">2024 Video URL</label>
                            <input
                              type="text"
                              value={editedProjects.chungnam.youtubeLinks?.year2024 || ""}
                              onChange={(e) => setEditedProjects({
                                ...editedProjects,
                                chungnam: {
                                  ...editedProjects.chungnam,
                                  youtubeLinks: {
                                    year2023: editedProjects.chungnam.youtubeLinks?.year2023 || "",
                                    year2024: e.target.value,
                                    year2025: editedProjects.chungnam.youtubeLinks?.year2025 || "",
                                  }
                                }
                              })}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">2025 Video URL</label>
                            <input
                              type="text"
                              value={editedProjects.chungnam.youtubeLinks?.year2025 || ""}
                              onChange={(e) => setEditedProjects({
                                ...editedProjects,
                                chungnam: {
                                  ...editedProjects.chungnam,
                                  youtubeLinks: {
                                    year2023: editedProjects.chungnam.youtubeLinks?.year2023 || "",
                                    year2024: editedProjects.chungnam.youtubeLinks?.year2024 || "",
                                    year2025: e.target.value,
                                  }
                                }
                              })}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project 2 Editor */}
                    <div className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3">
                      <span className="font-mono text-[10px] text-brand-purple uppercase font-bold">Project 2: VALORANT Masters Bangkok Activation</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Project Title</label>
                          <input
                            type="text"
                            value={editedProjects.valorant.title}
                            onChange={(e) => setEditedProjects({
                              ...editedProjects,
                              valorant: { ...editedProjects.valorant, title: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Project Subtitle</label>
                          <input
                            type="text"
                            value={editedProjects.valorant.subtitle}
                            onChange={(e) => setEditedProjects({
                              ...editedProjects,
                              valorant: { ...editedProjects.valorant, subtitle: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                      </div>


                      <div>
                        <label className="block font-mono text-[8px] text-zinc-400 uppercase">Challenge Statement</label>
                        <textarea
                          rows={2}
                          value={editedProjects.valorant.challenge}
                          onChange={(e) => setEditedProjects({
                            ...editedProjects,
                            valorant: { ...editedProjects.valorant, challenge: e.target.value }
                          })}
                          className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[8px] text-zinc-400 uppercase">My Solution/Role</label>
                        <textarea
                          rows={2}
                          value={editedProjects.valorant.solutionOrRole}
                          onChange={(e) => setEditedProjects({
                            ...editedProjects,
                            valorant: { ...editedProjects.valorant, solutionOrRole: e.target.value }
                          })}
                          className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                        />
                      </div>

                      {/* Project Metrics (Results) */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                          Project Metrics (Value & Label)
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {editedProjects.valorant.results.map((res, index) => (
                            <div key={index} className="p-2 rounded bg-zinc-900 border border-white/5 space-y-1">
                              <span className="block font-mono text-[8px] text-zinc-500 font-bold uppercase">Metric #{index + 1}</span>
                              <div>
                                <label className="block font-mono text-[7px] text-zinc-400 uppercase">Value</label>
                                <input
                                  type="text"
                                  value={res.value}
                                  onChange={(e) => {
                                    const updatedResults = [...editedProjects.valorant.results];
                                    updatedResults[index] = { ...res, value: e.target.value };
                                    setEditedProjects({
                                      ...editedProjects,
                                      valorant: { ...editedProjects.valorant, results: updatedResults }
                                    });
                                  }}
                                  className="w-full rounded border border-white/10 bg-zinc-950 p-1 text-xs text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="block font-mono text-[7px] text-zinc-400 uppercase">Label</label>
                                <input
                                  type="text"
                                  value={res.label}
                                  onChange={(e) => {
                                    const updatedResults = [...editedProjects.valorant.results];
                                    updatedResults[index] = { ...res, label: e.target.value };
                                    setEditedProjects({
                                      ...editedProjects,
                                      valorant: { ...editedProjects.valorant, results: updatedResults }
                                    });
                                  }}
                                  className="w-full rounded border border-white/10 bg-zinc-950 p-1 text-xs text-white font-medium"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project 3 Editor */}
                    <div className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3">
                      <span className="font-mono text-[10px] text-valorant-teal uppercase font-bold">Project 3: DouyuTV x LCK Partnership</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Project Title</label>
                          <input
                            type="text"
                            value={editedProjects.douyu.title}
                            onChange={(e) => setEditedProjects({
                              ...editedProjects,
                              douyu: { ...editedProjects.douyu, title: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8px] text-zinc-400 uppercase">Project Subtitle</label>
                          <input
                            type="text"
                            value={editedProjects.douyu.subtitle}
                            onChange={(e) => setEditedProjects({
                              ...editedProjects,
                              douyu: { ...editedProjects.douyu, subtitle: e.target.value }
                            })}
                            className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                          />
                        </div>
                      </div>


                      <div>
                        <label className="block font-mono text-[8px] text-zinc-400 uppercase">Challenge Statement</label>
                        <textarea
                          rows={2}
                          value={editedProjects.douyu.challenge}
                          onChange={(e) => setEditedProjects({
                            ...editedProjects,
                            douyu: { ...editedProjects.douyu, challenge: e.target.value }
                          })}
                          className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[8px] text-zinc-400 uppercase">My Responsibilities/Role</label>
                        <textarea
                          rows={2}
                          value={editedProjects.douyu.solutionOrRole}
                          onChange={(e) => setEditedProjects({
                            ...editedProjects,
                            douyu: { ...editedProjects.douyu, solutionOrRole: e.target.value }
                          })}
                          className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                        />
                      </div>

                      {/* Project Metrics (Results) */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">
                          Project Metrics (Value & Label)
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {editedProjects.douyu.results.map((res, index) => (
                            <div key={index} className="p-2 rounded bg-zinc-900 border border-white/5 space-y-1">
                              <span className="block font-mono text-[8px] text-zinc-500 font-bold uppercase">Metric #{index + 1}</span>
                              <div>
                                <label className="block font-mono text-[7px] text-zinc-400 uppercase">Value</label>
                                <input
                                  type="text"
                                  value={res.value}
                                  onChange={(e) => {
                                    const updatedResults = [...editedProjects.douyu.results];
                                    updatedResults[index] = { ...res, value: e.target.value };
                                    setEditedProjects({
                                      ...editedProjects,
                                      douyu: { ...editedProjects.douyu, results: updatedResults }
                                    });
                                  }}
                                  className="w-full rounded border border-white/10 bg-zinc-950 p-1 text-xs text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="block font-mono text-[7px] text-zinc-400 uppercase">Label</label>
                                <input
                                  type="text"
                                  value={res.label}
                                  onChange={(e) => {
                                    const updatedResults = [...editedProjects.douyu.results];
                                    updatedResults[index] = { ...res, label: e.target.value };
                                    setEditedProjects({
                                      ...editedProjects,
                                      douyu: { ...editedProjects.douyu, results: updatedResults }
                                    });
                                  }}
                                  className="w-full rounded border border-white/10 bg-zinc-950 p-1 text-xs text-white font-medium"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>


                    </div>
                  </motion.div>
                )}

                {activeTab === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display font-bold text-sm tracking-wider uppercase border-b border-white/5 pb-2 text-zinc-300">
                      Riot JD Specific Professional Competencies
                    </h4>
                    <p className="text-[11px] text-zinc-400 mb-3">
                      Adjust capabilities and percentages based on the specific job requirements.
                    </p>

                    <div className="space-y-3">
                      {editedSkills.map((skill, idx) => (
                        <div key={skill.name} className="flex items-center gap-4 bg-zinc-950 p-3 rounded border border-white/5">
                          <span className="font-mono text-[10px] text-zinc-500 w-6">#{idx + 1}</span>
                          <div className="flex-1">
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">Skill Name</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white"
                            />
                          </div>
                          <div className="w-24">
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">Percentage (%)</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={skill.percentage}
                              onChange={(e) => handleSkillChange(idx, "percentage", parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white text-center font-mono font-bold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-300">
                        Interactive Career Timeline Events
                      </h4>
                      <button
                        onClick={handleAddTimeline}
                        className="flex items-center gap-1 rounded bg-riot-red hover:bg-riot-red/90 px-2.5 py-1 text-[10px] font-bold uppercase text-white transition"
                      >
                        <Plus className="h-3 w-3" />
                        Add Event
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editedTimeline.map((item, idx) => (
                        <div key={item.id} className="p-4 rounded-lg bg-zinc-950 border border-white/5 space-y-3 relative">
                          <button
                            onClick={() => handleRemoveTimeline(item.id)}
                            className="absolute top-3 right-3 rounded p-1 text-zinc-500 hover:bg-zinc-900 hover:text-riot-red transition"
                            title="Delete Event"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <span className="font-mono text-[9px] text-riot-red uppercase tracking-wider font-bold">Timeline Event #{idx + 1}</span>
                          
                          <div className="grid grid-cols-4 gap-3">
                            <div className="col-span-1">
                              <label className="block font-mono text-[8px] text-zinc-400 uppercase">Year / Period</label>
                              <input
                                type="text"
                                value={item.year}
                                onChange={(e) => handleTimelineChange(item.id, "year", e.target.value)}
                                className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-mono"
                              />
                            </div>
                            <div className="col-span-3">
                              <label className="block font-mono text-[8px] text-zinc-400 uppercase">Event Title</label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleTimelineChange(item.id, "title", e.target.value)}
                                className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">Role / Organisation</label>
                            <input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => handleTimelineChange(item.id, "subtitle", e.target.value)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-white font-semibold text-zinc-300"
                            />
                          </div>

                          <div>
                            <label className="block font-mono text-[8px] text-zinc-400 uppercase">Details (Event summary)</label>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) => handleTimelineChange(item.id, "description", e.target.value)}
                              className="w-full rounded border border-white/10 bg-zinc-900 p-1.5 text-xs text-zinc-300 focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        {isAdminActive && (
          <div className="flex items-center justify-between border-t border-white/5 bg-zinc-950 px-6 py-4">
            <p className="font-mono text-[9px] text-zinc-500 tracking-wider">
              PORTFOLIO MANAGEMENT SYSTEMS: VERIFIED SECURE ACTIVE SESSION
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-white/10 hover:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-5 py-2 text-xs font-bold uppercase text-black transition shadow-lg shadow-emerald-500/10"
              >
                <Save className="h-4 w-4" />
                Commit Changes
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
