import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthPage from './pages/AuthPage'
import HeroSection from './components/HeroSection'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import LearningPath from './components/LearningPath'
import GuideGrid from './components/GuideGrid'
import Footer from './components/Footer'

function HubContent() {
  return (
    <div className="min-h-screen bg-navy-800 text-slate-100">
      <HeroSection />
      <ArchitectureDiagram />
      <LearningPath />
      <GuideGrid />
      <Footer />
    </div>
  )
}

export default function App() {
  return <HubContent />
}
