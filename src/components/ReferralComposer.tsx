import { useState, useMemo, useEffect } from 'react'
import {
  FileText,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  Copy,
  Check,
  Award,
} from 'lucide-react'
import { ReferralRequest, Alumnus } from '../types'

interface ReferralComposerProps {
  referrals: ReferralRequest[]
  alumni: Alumnus[]
  preselectedAlumnus: Alumnus | null
  onClearPreselection: () => void
  onSubmitReferral: (req: ReferralRequest) => void
}

const COMMON_TECH_KEYWORDS = [
  'Distributed Systems',
  'Microservices',
  'Kubernetes',
  'Docker',
  'System Design',
  'Algorithms',
  'Concurrency',
  'CI/CD',
  'PostgreSQL',
  'Redis',
  'Go',
  'Python',
  'C++',
  'Java',
  'Kafka',
  'Cloud Architecture',
  'REST API',
  'AWS',
  'Azure',
]

export function ReferralComposer({
  referrals,
  alumni,
  preselectedAlumnus,
  onClearPreselection,
  onSubmitReferral,
}: ReferralComposerProps) {
  const [selectedAlumnusId, setSelectedAlumnusId] = useState(
    preselectedAlumnus?.id || alumni[0]?.id || ''
  )
  const [jobTitle, setJobTitle] = useState('Software Engineer - Core Infrastructure')
  const [jobId, setJobId] = useState('GOOG-SYS-49102')
  const [jobDescription, setJobDescription] = useState(
    'Looking for a software engineer to design, implement, and optimize distributed systems, microservices, and high-performance algorithms. Experience with Go, C++, Kubernetes, Docker, and Concurrency is required.'
  )
  const [resumeText, setResumeText] = useState(
    '4th-year COE student at TIET Patiala. Built distributed cloud services using Go and Docker. Strong background in Algorithms, Data Structures, Concurrency, and PostgreSQL. Ex-Technical Lead at Creative Computing Society (CCS).'
  )
  const [activeTemplate, setActiveTemplate] = useState<'society' | 'polite' | 'project'>('society')
  const [selectedSociety, setSelectedSociety] = useState('Creative Computing Society (CCS)')
  const [copiedPitch, setCopiedPitch] = useState(false)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  useEffect(() => {
    if (preselectedAlumnus) {
      setSelectedAlumnusId(preselectedAlumnus.id)
    }
  }, [preselectedAlumnus])

  const selectedAlumnus = alumni.find((a) => a.id === selectedAlumnusId) || alumni[0]

  // Interactive ATS scoring calculation
  const atsAnalysis = useMemo(() => {
    const jdLower = jobDescription.toLowerCase()
    const resumeLower = resumeText.toLowerCase()

    const jdKeywords = COMMON_TECH_KEYWORDS.filter((kw) => jdLower.includes(kw.toLowerCase()))
    const targetKeywords = jdKeywords.length > 0 ? jdKeywords : COMMON_TECH_KEYWORDS.slice(0, 6)

    const matched = targetKeywords.filter((kw) => resumeLower.includes(kw.toLowerCase()))
    const missing = targetKeywords.filter((kw) => !resumeLower.includes(kw.toLowerCase()))

    const score = Math.min(98, Math.max(35, Math.round((matched.length / targetKeywords.length) * 100)))

    return {
      score,
      matched,
      missing,
    }
  }, [jobDescription, resumeText])

  // Dynamic pitch generation
  const generatedPitch = useMemo(() => {
    if (activeTemplate === 'society') {
      return `Hello ${selectedAlumnus.name}, I hope you are having a great week! I am currently a student at TIET Patiala and an active member of ${selectedSociety}. Having followed your impactful journey at ${selectedAlumnus.company}, I am very interested in the ${jobTitle} (Job ID: ${jobId}) opening. My profile aligns with ${atsAnalysis.matched.slice(0, 3).join(', ')} and I would be immensely grateful if you would consider referring me!`
    }
    if (activeTemplate === 'polite') {
      return `Dear ${selectedAlumnus.name}, greetings! I am a final-year engineering student from TIET. I am reaching out to politely ask if you have bandwidth to submit an internal referral for the ${jobTitle} position (Job ID: ${jobId}) at ${selectedAlumnus.company}. My ATS fit score is ${atsAnalysis.score}% and I have attached my resume and GitHub for your review.`
    }
    return `Hi ${selectedAlumnus.name}! I recently developed an open-source distributed service solving high-concurrency data streaming. Given your focus on systems at ${selectedAlumnus.company}, I am excited to apply for ${jobTitle} (Req ID: ${jobId}). Would love an opportunity for an employee referral!`
  }, [activeTemplate, selectedAlumnus, selectedSociety, jobTitle, jobId, atsAnalysis])

  const handleSubmit = () => {
    const newRef: ReferralRequest = {
      id: `REF-${Math.floor(3000 + Math.random() * 7000)}`,
      alumnusName: selectedAlumnus.name,
      company: selectedAlumnus.company,
      jobTitle,
      jobId,
      matchScore: atsAnalysis.score,
      pitchText: generatedPitch,
      resumeUrl: 'thapar_student_resume_2025.pdf',
      status: 'submitted',
      submittedAt: 'Just now',
      tietSocietyReferenced: activeTemplate === 'society' ? selectedSociety : undefined,
    }

    onSubmitReferral(newRef)
    setSuccessToast(`Referral request dispatched to ${selectedAlumnus.name} at ${selectedAlumnus.company}!`)
    setTimeout(() => setSuccessToast(null), 5000)
  }

  const handleCopyPitch = () => {
    navigator.clipboard?.writeText(generatedPitch)
    setCopiedPitch(true)
    setTimeout(() => setCopiedPitch(false), 2000)
  }

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="font-semibold text-sm">{successToast}</p>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-xs font-semibold px-2 py-1 rounded bg-emerald-200 dark:bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: Composer & ATS Matcher (Left 7 cols) + Pipeline (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Target Alumnus & Job Details */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-violet-500" />
              1. Target Alumnus & Opportunity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Recipient Alumnus
                </label>
                <select
                  value={selectedAlumnusId}
                  onChange={(e) => setSelectedAlumnusId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-violet-500"
                >
                  {alumni.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.company} — {a.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Company Job Req ID
                </label>
                <input
                  type="text"
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
                  placeholder="e.g. GOOG-10492"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Target Role Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium"
              />
            </div>
          </div>

          {/* Card: ATS Resume Keyword Fit Analyzer */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-500" />
                2. ATS Keyword Matcher
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">Fit Score:</span>
                <span
                  className={`text-sm font-bold font-mono px-2 py-0.5 rounded-full ${
                    atsAnalysis.score >= 80
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {atsAnalysis.score}% Match
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Job Description Excerpt (Requirements)
              </label>
              <textarea
                rows={2}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Your Resume Bullets & Tech Skills
              </label>
              <textarea
                rows={3}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
              />
            </div>

            {/* Keyword tags breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-500 font-medium">Matched Keywords:</span>
                {atsAnalysis.matched.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono text-[11px]"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>

              {atsAnalysis.missing.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-500 font-medium">Missing Keywords:</span>
                  {atsAnalysis.missing.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-mono text-[11px]"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Card: AI Referral Pitch Generator */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" />
                3. Tailored Referral Pitch
              </h3>
              <button
                onClick={handleCopyPitch}
                className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 font-medium"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'Copied' : 'Copy Pitch'}</span>
              </button>
            </div>

            {/* Template selector */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTemplate('society')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTemplate === 'society'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                TIET Society Connection
              </button>
              <button
                type="button"
                onClick={() => setActiveTemplate('polite')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTemplate === 'polite'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Polite Cold Referral
              </button>
              <button
                type="button"
                onClick={() => setActiveTemplate('project')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTemplate === 'project'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                High-Impact Project
              </button>
            </div>

            {activeTemplate === 'society' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Shared Society
                </label>
                <select
                  value={selectedSociety}
                  onChange={(e) => setSelectedSociety(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                >
                  <option value="Creative Computing Society (CCS)">Creative Computing Society (CCS)</option>
                  <option value="OWASP Student Chapter">OWASP Student Chapter</option>
                  <option value="Microsoft Learn Student Chapter (MLSC)">Microsoft Learn Student Chapter (MLSC)</option>
                  <option value="Rotaract Club Thapar">Rotaract Club Thapar</option>
                  <option value="Mudra Cultural Society">Mudra Cultural Society</option>
                  <option value="Urja TIET">Urja TIET</option>
                  <option value="LITSOC Thapar">LITSOC Thapar</option>
                </select>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              {generatedPitch}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Referral Request & Notify Alumnus</span>
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Referral Tracking Pipeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-emerald-500" />
              Active Referral Applications ({referrals.length})
            </h3>

            <div className="space-y-3">
              {referrals.map((ref) => (
                <div
                  key={ref.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-2 hover:border-violet-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-violet-600 dark:text-violet-400">
                      {ref.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                        ref.status === 'referral_placed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : ref.status === 'under_review'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {ref.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{ref.jobTitle}</h5>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {ref.company} • Req: {ref.jobId}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800 font-mono">
                    <span>Mentor: {ref.alumnusName}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {ref.matchScore}% ATS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
