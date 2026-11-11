import { useState, useMemo } from 'react'
import {
  X,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  Eye,
  GraduationCap,
} from 'lucide-react'
import { Alumnus, MentorshipRequest } from '../types'

interface MentorshipModalProps {
  alumnus: Alumnus | null
  onClose: () => void
  onSendRequest: (req: MentorshipRequest) => void
}

const TOPICS = [
  'DSA & Coding Interview Roadmap',
  'System Design & Architecture',
  'Resume & Profile Review',
  'Off-Campus Placement Strategy',
  'Transitioning Domains (Non-tech to Tech/Quant)',
  'Higher Studies (MS/MBA Guidance)',
]

export function MentorshipModal({ alumnus, onClose, onSendRequest }: MentorshipModalProps) {
  if (!alumnus) return null

  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0])
  const [preferredSchedule, setPreferredSchedule] = useState('This Weekend (Flexible)')
  const [message, setMessage] = useState(
    `Hi ${alumnus.name}, I am a 3rd-year ${alumnus.branch} student at TIET. I saw your inspiring profile at ${alumnus.company} and would love to seek your 1:1 guidance on preparing for ${TOPICS[0].toLowerCase()}. Would you have 20 minutes for a quick mentorship sync?`
  )
  const [isSending, setIsSending] = useState(false)

  const handleApplyTemplate = (type: 'society' | 'resume' | 'general') => {
    if (type === 'society') {
      const societyText = alumnus.tietSociety ? `as a fellow member of ${alumnus.tietSociety}, ` : ''
      setMessage(
        `Hello ${alumnus.name}, greetings from Thapar! I am currently an engineering student at TIET and ${societyText}I'm reaching out to learn from your experience transitioning to ${alumnus.role} at ${alumnus.company}. Would be deeply grateful for your mentorship!`
      )
    } else if (type === 'resume') {
      setMessage(
        `Hi ${alumnus.name}, I am actively preparing for off-campus opportunities in ${alumnus.domain}. Could you please spare 15 minutes to review my resume and guide me on high-impact projects that helped you stand out at ${alumnus.company}?`
      )
    } else {
      setMessage(
        `Hi ${alumnus.name}, I am a 3rd-year ${alumnus.branch} student at TIET. I saw your inspiring profile at ${alumnus.company} and would love to seek your 1:1 guidance on preparing for ${selectedTopic.toLowerCase()}. Would you have 20 minutes for a quick mentorship sync?`
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    const newReq: MentorshipRequest = {
      id: `MENTOR-${Math.floor(1000 + Math.random() * 9000)}`,
      alumnusId: alumnus.id,
      alumnusName: alumnus.name,
      company: alumnus.company,
      topic: selectedTopic,
      message,
      preferredSchedule,
      status: 'pending',
      createdAt: 'Just now',
    }

    setTimeout(() => {
      setIsSending(false)
      onSendRequest(newReq)
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-violet-200 text-xs font-mono uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4 text-violet-300" />
            1:1 Alumni Mentorship Request Flow
          </div>
          <div className="flex items-center gap-3 mt-2">
            <img
              src={alumnus.avatarUrl}
              alt={alumnus.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white/40"
            />
            <div>
              <h3 className="text-lg font-bold flex items-center gap-1.5">
                {alumnus.name}
                {alumnus.verified && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
              </h3>
              <p className="text-xs text-violet-100/90 font-mono">
                {alumnus.role} at {alumnus.company} • Batch '{alumnus.batch % 100} ({alumnus.branch})
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Topic Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Select Mentorship Focus Area:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedTopic === topic
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Schedule */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Preferred Availability / Timeframe:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {['This Weekend (Flexible)', 'Weekday Evenings (Post 7 PM)', 'Urgent (Next 48 Hours)'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPreferredSchedule(slot)}
                  className={`p-2 rounded-xl border text-xs text-center font-medium transition-all ${
                    preferredSchedule === slot
                      ? 'border-violet-600 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Message Composition with Templates */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Personalized Message to Mentor:
              </label>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-400">Quick templates:</span>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('society')}
                  className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 hover:underline"
                >
                  Society
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('resume')}
                  className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 hover:underline"
                >
                  Resume
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate('general')}
                  className="px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 font-sans"
              required
            />
          </div>

          {/* Interactive Messaging Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Eye className="w-3.5 h-3.5 text-violet-500" />
                Live Messaging Preview (How {alumnus.name} views this in portal)
              </span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ Ready to Dispatch
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[11px] border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px]">
                    ST
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    TIET Student (3rd Year, {alumnus.branch})
                  </span>
                </div>
                <span className="text-slate-400 font-mono">Just now</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                  Topic: {selectedTopic}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {preferredSchedule}
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                "{message}"
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Dispatching Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mentorship Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
