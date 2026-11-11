import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { BentoStats } from './components/BentoStats'
import { AlumniDirectory } from './components/AlumniDirectory'
import { MockInterviewScheduler } from './components/MockInterviewScheduler'
import { ReferralComposer } from './components/ReferralComposer'
import { AmaWall } from './components/AmaWall'
import {
  MOCK_ALUMNI,
  INITIAL_BOOKINGS,
  INITIAL_REFERRALS,
  MOCK_AMA_POSTS,
} from './data/mockAlumni'
import { Alumnus, InterviewBooking, ReferralRequest, AmaPost } from './types'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState<'directory' | 'interviews' | 'referrals' | 'ama'>('directory')
  const [alumni] = useState<Alumnus[]>(MOCK_ALUMNI)
  const [bookings, setBookings] = useState<InterviewBooking[]>(INITIAL_BOOKINGS)
  const [referrals, setReferrals] = useState<ReferralRequest[]>(INITIAL_REFERRALS)
  const [amaPosts, setAmaPosts] = useState<AmaPost[]>(MOCK_AMA_POSTS)

  // Direct CTA jump state
  const [preselectedAlumnus, setPreselectedAlumnus] = useState<Alumnus | null>(null)

  // Sync dark theme class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleDark = () => setIsDark((prev) => !prev)

  const handleScheduleMockDirect = (alum: Alumnus) => {
    setPreselectedAlumnus(alum)
    setActiveTab('interviews')
  }

  const handleRequestReferralDirect = (alum: Alumnus) => {
    setPreselectedAlumnus(alum)
    setActiveTab('referrals')
  }

  const handleAddBooking = (newBooking: InterviewBooking) => {
    setBookings((prev) => [newBooking, ...prev])
  }

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId))
  }

  const handleSubmitReferral = (newReq: ReferralRequest) => {
    setReferrals((prev) => [newReq, ...prev])
  }

  const handleAddAmaPost = (newPost: AmaPost) => {
    setAmaPosts((prev) => [newPost, ...prev])
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        confirmedInterviewsCount={bookings.length}
        activeReferralsCount={referrals.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BentoStats
          totalMentorsCount={alumni.length * 40}
          interviewsBookedCount={bookings.length}
          referralsPlacedCount={184}
          atsAverageBoost={34}
        />

        {activeTab === 'directory' && (
          <AlumniDirectory
            alumni={alumni}
            onScheduleMock={handleScheduleMockDirect}
            onRequestReferral={handleRequestReferralDirect}
          />
        )}

        {activeTab === 'interviews' && (
          <MockInterviewScheduler
            bookings={bookings}
            alumni={alumni}
            preselectedAlumnus={preselectedAlumnus}
            onClearPreselection={() => setPreselectedAlumnus(null)}
            onAddBooking={handleAddBooking}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {activeTab === 'referrals' && (
          <ReferralComposer
            referrals={referrals}
            alumni={alumni}
            preselectedAlumnus={preselectedAlumnus}
            onClearPreselection={() => setPreselectedAlumnus(null)}
            onSubmitReferral={handleSubmitReferral}
          />
        )}

        {activeTab === 'ama' && (
          <AmaWall posts={amaPosts} onAddPost={handleAddAmaPost} />
        )}
      </main>
    </div>
  )
}
