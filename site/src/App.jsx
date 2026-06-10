import React, { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthPage from './pages/AuthPage'
import HudBar from './components/HudBar'
import HeroSection from './components/HeroSection'
import OperatorConsole from './components/OperatorConsole'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import LearningPath from './components/LearningPath'
import SkillsRoadmap from './components/SkillsRoadmap'
import GuideGrid from './components/GuideGrid'
import Footer from './components/Footer'

function Shell() {
  const { session } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  // Close the login screen once a session lands
  useEffect(() => {
    if (session) setShowAuth(false)
  }, [session])

  if (showAuth && !session) {
    return <AuthPage onBack={() => setShowAuth(false)} />
  }

  return (
    <div className="min-h-screen">
      <HudBar onAuthClick={() => setShowAuth(true)} />
      <main>
        <HeroSection />
        <OperatorConsole />
        <ArchitectureDiagram />
        <LearningPath />
        <SkillsRoadmap />
        <GuideGrid />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <Shell />
      </AuthProvider>
    </MotionConfig>
  )
}
