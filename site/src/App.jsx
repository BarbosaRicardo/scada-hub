import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthPage from './pages/AuthPage'
import HeroSection from './components/HeroSection'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import LearningPath from './components/LearningPath'
import GuideGrid from './components/GuideGrid'
import Footer from './components/Footer'

function HubContent() {
  const { signOut, session } = useAuth()
  return (
    <div className="min-h-screen bg-navy-800 text-slate-100">
      {/* Minimal auth bar */}
      <div className="fixed top-0 right-0 z-50 p-4 flex items-center gap-3">
        <span className="text-xs text-slate-500 hidden sm:block">{session?.user?.email}</span>
        <button
          onClick={signOut}
          className="text-xs text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-500/50
                     px-3 py-1.5 rounded-lg transition backdrop-blur-sm bg-slate-900/50"
        >
          Sign out
        </button>
      </div>
      <HeroSection />
      <ArchitectureDiagram />
      <LearningPath />
      <GuideGrid />
      <Footer />
    </div>
  )
}

function AppInner() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-800 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return session ? <HubContent /> : <AuthPage />
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
