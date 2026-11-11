import { useState } from 'react'
import {
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Send,
  CheckCircle,
  HelpCircle,
  Building2,
} from 'lucide-react'
import { AmaPost } from '../types'

interface AmaWallProps {
  posts: AmaPost[]
  onAddPost: (newPost: AmaPost) => void
}

export function AmaWall({ posts, onAddPost }: AmaWallProps) {
  const [upvotes, setUpvotes] = useState<Record<string, number>>({})
  const [questionInput, setQuestionInput] = useState('')
  const [categoryInput, setCategoryInput] = useState('Placement Strategy')
  const [studentName, setStudentName] = useState('')

  const handleUpvote = (postId: string) => {
    setUpvotes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }))
  }

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionInput.trim()) return

    const newPost: AmaPost = {
      id: `ama-${Date.now()}`,
      studentName: studentName.trim() || 'Thaparite Student',
      studentBranch: 'COE 3rd Year',
      question: questionInput,
      category: categoryInput,
      upvotes: 1,
      createdAt: 'Just now',
    }

    onAddPost(newPost)
    setQuestionInput('')
    setStudentName('')
  }

  return (
    <div className="space-y-6">
      {/* Ask Question Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-violet-500" />
          Ask Verified TIET Alumni Mentors
        </h3>
        <form onSubmit={handleSubmitQuestion} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name (or leave blank to remain Anonymous)"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-violet-500"
            />
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-xs font-medium"
            >
              <option value="Placement Strategy">Placement Strategy & OA Rounds</option>
              <option value="Consulting Career">Consulting & Case Studies</option>
              <option value="Quant & FinTech">Quant & High-Frequency Trading</option>
              <option value="Higher Studies">MS / PhD in US & Europe</option>
              <option value="Off-Campus Referrals">Off-Campus Referrals & ATS</option>
            </select>
          </div>

          <textarea
            rows={2}
            placeholder="Ask your career question (e.g. How to break into DE Shaw Quant roles from ENC branch?)..."
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-violet-500"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!questionInput.trim()}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Post to Alumni Q&A Wall
            </button>
          </div>
        </form>
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        {posts.map((post) => {
          const currentUpvotes = post.upvotes + (upvotes[post.id] || 0)
          return (
            <div
              key={post.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4 hover:border-violet-500/40 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                      {post.studentName}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">• {post.studentBranch}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-400">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {post.question}
                  </h4>
                </div>

                {/* Upvote Button */}
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 text-slate-700 dark:text-slate-300 font-mono text-xs transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-violet-500" />
                  <span>{currentUpvotes}</span>
                </button>
              </div>

              {/* Verified Alumnus Answer */}
              {post.answer && (
                <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-200/70 dark:border-violet-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-violet-900 dark:text-violet-200">
                        {post.answer.alumnusName}
                      </span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-violet-700 dark:text-violet-400 font-mono text-[11px]">
                        {post.answer.alumnusRole} at {post.answer.company} ('{post.answer.batch % 100})
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {post.answer.answeredAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {post.answer.text}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
