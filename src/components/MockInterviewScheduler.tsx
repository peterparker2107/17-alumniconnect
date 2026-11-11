import { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  ExternalLink,
  Plus,
  X,
  Sparkles,
  Download,
} from 'lucide-react'
import { InterviewBooking, Alumnus } from '../types'

interface MockInterviewSchedulerProps {
  bookings: InterviewBooking[]
  alumni: Alumnus[]
  preselectedAlumnus: Alumnus | null
  onClearPreselection: () => void
  onAddBooking: (booking: InterviewBooking) => void
  onCancelBooking: (id: string) => void
}

const INTERVIEW_TRACKS = [
  {
    id: 'Coding & DSA',
    desc: 'Live pair programming on LeetCode Medium/Hard, Trees, Graphs, DP',
  },
  {
    id: 'System Design',
    desc: 'High-level architectures, microservices, caches, and rate-limiters',
  },
  {
    id: 'Behavioral & Leadership',
    desc: 'Amazon Leadership Principles, STAR framework, conflict resolution',
  },
  {
    id: 'Product Sense',
    desc: 'User metrics, product intuition, A/B experiments, trade-offs',
  },
  {
    id: 'Case Study Consulting',
    desc: 'Market sizing, profitability trees, Bain/McKinsey frameworks',
  },
] as const

export function MockInterviewScheduler({
  bookings,
  alumni,
  preselectedAlumnus,
  onClearPreselection,
  onAddBooking,
  onCancelBooking,
}: MockInterviewSchedulerProps) {
  const [showBookingModal, setShowBookingModal] = useState(!!preselectedAlumnus)
  const [selectedAlumnusId, setSelectedAlumnusId] = useState(
    preselectedAlumnus?.id || alumni[0]?.id || ''
  )
  const [selectedTrack, setSelectedTrack] = useState<typeof INTERVIEW_TRACKS[number]['id']>('Coding & DSA')
  const [selectedDate, setSelectedDate] = useState('Friday, Nov 15')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('6:30 PM - 7:30 PM IST')
  const [prepNotes, setPrepNotes] = useState('')
  const [successToast, setSuccessToast] = useState<string | null>(null)

  useEffect(() => {
    if (preselectedAlumnus) {
      setSelectedAlumnusId(preselectedAlumnus.id)
      setShowBookingModal(true)
    }
  }, [preselectedAlumnus])

  const selectedAlumnus = alumni.find((a) => a.id === selectedAlumnusId) || alumni[0]

  const handleCreateBooking = () => {
    const bookingId = `MOCK-${Math.floor(1000 + Math.random() * 9000)}`
    const newBooking: InterviewBooking = {
      id: bookingId,
      alumnusId: selectedAlumnus.id,
      alumnusName: selectedAlumnus.name,
      alumnusRole: selectedAlumnus.role,
      company: selectedAlumnus.company,
      track: selectedTrack,
      scheduledDate: selectedDate,
      scheduledTime: selectedTimeSlot,
      meetLink: `https://meet.google.com/tiet-${selectedAlumnus.company.toLowerCase().slice(0, 4)}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'confirmed',
      notes: prepNotes || 'General mock interview & feedback rubric session.',
    }

    onAddBooking(newBooking)
    setShowBookingModal(false)
    onClearPreselection()
    setSuccessToast(`1:1 Mock session with ${selectedAlumnus.name} confirmed! Calendar invite generated.`)
    setTimeout(() => setSuccessToast(null), 5000)
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

      {/* Top Banner and Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-violet-500" />
            Confirmed 1-on-1 Mock Interview Schedule
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            45-minute live technical/case drills followed by 15-minute candid feedback and rubric evaluation
          </p>
        </div>

        <button
          onClick={() => setShowBookingModal(true)}
          className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Schedule New Mock Session
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
            No Upcoming Mock Interviews
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Book a slot with our verified alumni at Google, DE Shaw, McKinsey, or Microsoft.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-500/40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                      {booking.id}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Confirmed
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                      {booking.track}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Mock Interview with {booking.alumnusName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {booking.alumnusRole} at{' '}
                      <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                        {booking.company}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1 text-slate-900 dark:text-slate-200 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-violet-500" />
                      {booking.scheduledDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {booking.scheduledTime}
                    </span>
                  </div>

                  {booking.notes && (
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Notes:</span>{' '}
                      {booking.notes}
                    </div>
                  )}
                </div>

                {/* Right Actions */}
                <div className="flex flex-col gap-2 min-w-[160px]">
                  <a
                    href={booking.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <Video className="w-4 h-4" />
                    Join Video Room
                  </a>

                  <button
                    onClick={() => {
                      // Simulate ICS download
                      const icsContent = `BEGIN:VCALENDAR\nSUMMARY:Mock Interview with ${booking.alumnusName}\nEND:VCALENDAR`
                      const blob = new Blob([icsContent], { type: 'text/calendar' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `mock_interview_${booking.id}.ics`
                      a.click()
                    }}
                    className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    Download .ICS Sync
                  </button>

                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="text-[11px] text-rose-500 hover:underline text-center"
                  >
                    Cancel Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto custom-scroll">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-base">
                <Calendar className="w-5 h-5" />
                <span>Book 1-on-1 Mock Interview</span>
              </div>
              <button
                onClick={() => {
                  setShowBookingModal(false)
                  onClearPreselection()
                }}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Alumnus Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Select Mentor
              </label>
              <select
                value={selectedAlumnusId}
                onChange={(e) => setSelectedAlumnusId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                {alumni.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.company} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Track Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Interview Domain Track
              </label>
              <div className="space-y-2">
                {INTERVIEW_TRACKS.map((track) => (
                  <label
                    key={track.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                      selectedTrack === track.id
                        ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-950/30'
                        : 'border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="track"
                      checked={selectedTrack === track.id}
                      onChange={() => setSelectedTrack(track.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{track.id}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        {track.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date and Time slots */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Available Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
                >
                  <option value="Thursday, Nov 14">Thu, Nov 14</option>
                  <option value="Friday, Nov 15">Fri, Nov 15</option>
                  <option value="Saturday, Nov 16">Sat, Nov 16</option>
                  <option value="Sunday, Nov 17">Sun, Nov 17</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Time Slot (IST)
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
                >
                  <option value="5:00 PM - 6:00 PM IST">5:00 PM - 6:00 PM</option>
                  <option value="6:30 PM - 7:30 PM IST">6:30 PM - 7:30 PM</option>
                  <option value="8:00 PM - 9:00 PM IST">8:00 PM - 9:00 PM</option>
                  <option value="9:30 PM - 10:30 PM IST">9:30 PM - 10:30 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Target Companies / Specific Topics
              </label>
              <textarea
                rows={2}
                value={prepNotes}
                onChange={(e) => setPrepNotes(e.target.value)}
                placeholder="e.g. Preparing for Google L4 round, please cover dynamic programming and Trie problems..."
                className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>

            {/* Action */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleCreateBooking}
                className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md transition-all text-center"
              >
                Confirm & Sync Calendar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBookingModal(false)
                  onClearPreselection()
                }}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
