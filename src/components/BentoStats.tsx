import { Users, Briefcase, Calendar, Award, TrendingUp } from 'lucide-react'

interface BentoStatsProps {
  totalMentorsCount: number
  interviewsBookedCount: number
  referralsPlacedCount: number
  atsAverageBoost: number
}

export function BentoStats({
  totalMentorsCount,
  interviewsBookedCount,
  referralsPlacedCount,
  atsAverageBoost,
}: BentoStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Tile 1: Mentors */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Active Alumni Mentors</span>
          <span className="p-1 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Users className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {totalMentorsCount}+
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Active Now
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Google, Microsoft, DE Shaw, Bain, McKinsey
        </p>
      </div>

      {/* Tile 2: 1:1 Mock Interviews */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Mock Interviews Booked</span>
          <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            1,240+ hrs
          </span>
          <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">
            {interviewsBookedCount} upcoming
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          DSA, System Design, Behavioral & Consulting Cases
        </p>
      </div>

      {/* Tile 3: Referrals Placed */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Referrals Placed This Term</span>
          <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Briefcase className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {referralsPlacedCount}
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            +38% vs prev sem
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Direct employee referral portal submissions
        </p>
      </div>

      {/* Tile 4: ATS Score Optimization */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Avg. ATS Match Uplift</span>
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Award className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            +{atsAverageBoost}%
          </span>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            Shortlist rate: 4.2x
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Keyword gap matching & society pitch integration
        </p>
      </div>
    </div>
  )
}
