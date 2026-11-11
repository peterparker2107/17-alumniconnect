import { GraduationCap, Users, Moon, Sun, Sparkles, Calendar, Send, MessageSquareQuote } from 'lucide-react'

interface NavbarProps {
  activeTab: 'directory' | 'interviews' | 'referrals' | 'ama'
  setActiveTab: (tab: 'directory' | 'interviews' | 'referrals' | 'ama') => void
  isDark: boolean
  toggleDark: () => void
  confirmedInterviewsCount: number
  activeReferralsCount: number
}

export function Navbar({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  confirmedInterviewsCount,
  activeReferralsCount,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#090d16]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 dark:bg-violet-500 text-white flex items-center justify-center shadow-md shadow-violet-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  AlumniConnect
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  4,200+ TIET Mentors
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                TIET Patiala Global Alumni Mentorship & Referral Matchmaker
              </p>
            </div>
          </div>

          {/* Tab Navigation Switcher */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'directory'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Alumni Directory
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`px-3 py-1.5 rounded-lg transition-all relative ${
                activeTab === 'interviews'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1:1 Mock Interviews
              {confirmedInterviewsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-violet-600 text-white font-mono">
                  {confirmedInterviewsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={`px-3 py-1.5 rounded-lg transition-all relative ${
                activeTab === 'referrals'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ATS & Referral Hub
              {activeReferralsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white font-mono">
                  {activeReferralsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('ama')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'ama'
                  ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Alumni Q&A Wall
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Student ID pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-500 dark:text-slate-400">Student:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
                COE '25
              </span>
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-200/60 dark:border-slate-800/60">
          {(['directory', 'interviews', 'referrals', 'ama'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
                activeTab === tab
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab === 'directory' && 'Directory'}
              {tab === 'interviews' && `Mocks (${confirmedInterviewsCount})`}
              {tab === 'referrals' && `Referrals (${activeReferralsCount})`}
              {tab === 'ama' && 'Q&A Wall'}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
