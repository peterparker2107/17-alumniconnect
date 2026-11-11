import { useState, useMemo } from 'react'
import {
  Search,
  Building2,
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle,
  ExternalLink,
  Calendar,
  Send,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react'
import { Alumnus, CompanyName, EngineeringBranch, CareerDomain, MentorshipRequest } from '../types'
import { MentorshipModal } from './MentorshipModal'

interface AlumniDirectoryProps {
  alumni: Alumnus[]
  onScheduleMock: (alumnus: Alumnus) => void
  onRequestReferral: (alumnus: Alumnus) => void
  onSendMentorshipRequest?: (req: MentorshipRequest) => void
}

const COMPANIES: CompanyName[] = [
  'Google',
  'Microsoft',
  'DE Shaw',
  'Bain & Company',
  'McKinsey & Company',
  'Amazon',
  'Goldman Sachs',
  'Uber',
  'Nvidia',
]

const DOMAINS: CareerDomain[] = [
  'Software Engineering',
  'Quant & HFT',
  'Product Management',
  'Management Consulting',
  'Machine Learning & AI',
  'Cloud Infrastructure',
]

export function AlumniDirectory({
  alumni,
  onScheduleMock,
  onRequestReferral,
  onSendMentorshipRequest,
}: AlumniDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [selectedBranch, setSelectedBranch] = useState<string>('all')
  const [selectedDomain, setSelectedDomain] = useState<string>('all')
  const [selectedBatch, setSelectedBatch] = useState<string>('all')
  const [mentoringAlumnus, setMentoringAlumnus] = useState<Alumnus | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const availableBatches = useMemo(() => {
    return Array.from(new Set(alumni.map((a) => a.batch))).sort((a, b) => b - a)
  }, [alumni])

  const filteredAlumni = alumni.filter((alum) => {
    const matchesSearch =
      alum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCompany = selectedCompany === 'all' || alum.company === selectedCompany
    const matchesBranch = selectedBranch === 'all' || alum.branch === selectedBranch
    const matchesDomain = selectedDomain === 'all' || alum.domain === selectedDomain
    const matchesBatch = selectedBatch === 'all' || alum.batch === Number(selectedBatch)

    return matchesSearch && matchesCompany && matchesBranch && matchesDomain && matchesBatch
  })

  const handleSendMentorship = (req: MentorshipRequest) => {
    onSendMentorshipRequest?.(req)
    setToastMessage(`Mentorship request dispatched to ${req.alumnusName} (${req.company})!`)
    setTimeout(() => setToastMessage(null), 5000)
  }

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="font-semibold text-sm">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-semibold px-2 py-1 rounded bg-emerald-200 dark:bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role (e.g. Quant, Staff SDE), skill (CUDA, Go), or club..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Batch Filter */}
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full sm:w-36 p-2.5 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Batches</option>
            {availableBatches.map((b) => (
              <option key={b} value={b}>
                Batch '{b % 100} ({b})
              </option>
            ))}
          </select>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full sm:w-40 p-2.5 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All TIET Branches</option>
            <option value="COE">Computer Engg (COE)</option>
            <option value="ENC">Electronics & Comm (ENC)</option>
            <option value="EEC">Electrical (EEC)</option>
            <option value="MECH">Mechanical (MECH)</option>
            <option value="CHE">Chemical (CHE)</option>
            <option value="Biotech">Biotechnology</option>
          </select>

          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full sm:w-44 p-2.5 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Career Domains</option>
            {DOMAINS.map((dom) => (
              <option key={dom} value={dom}>
                {dom}
              </option>
            ))}
          </select>
        </div>

        {/* Company Quick-Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap mr-1">
            Top Companies:
          </span>
          <button
            onClick={() => setSelectedCompany('all')}
            className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCompany === 'all'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Companies
          </button>
          {COMPANIES.map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCompany === comp
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAlumni.map((alum) => (
          <div
            key={alum.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={alum.avatarUrl}
                    alt={alum.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                        {alum.name}
                      </h4>
                      {alum.verified && (
                        <span title="Verified TIET Alumnus">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-semibold text-violet-600 dark:text-violet-400">
                        {alum.company}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {alum.branch} '{alum.batch % 100}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  {alum.domain}
                </span>
              </div>

              {/* Current Role & Location */}
              <div className="space-y-1 mb-3 text-xs">
                <div className="font-medium text-slate-800 dark:text-slate-200">
                  {alum.role}
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {alum.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-emerald-500" />
                    Replies {alum.responseRate}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {alum.bio}
              </p>

              {/* Thapar Society pill if available */}
              {alum.tietSociety && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-200 mb-3 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{alum.tietSociety}</span>
                </div>
              )}

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {alum.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                {alum.slotsAvailable} slots this week
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMentoringAlumnus(alum)}
                  title="Request 1:1 Mentorship & Advice"
                  className="px-2.5 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 dark:hover:bg-violet-900/60 text-violet-700 dark:text-violet-300 font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                  <span>Mentorship</span>
                </button>
                <button
                  onClick={() => onRequestReferral(alum)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3 h-3 text-violet-500" />
                  <span>Referral</span>
                </button>
                <button
                  onClick={() => onScheduleMock(alum)}
                  className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1 transition-colors"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Mock</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1:1 Mentorship Request & Messaging Preview Modal */}
      <MentorshipModal
        alumnus={mentoringAlumnus}
        onClose={() => setMentoringAlumnus(null)}
        onSendRequest={handleSendMentorship}
      />
    </div>
  )
}
