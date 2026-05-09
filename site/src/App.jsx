import React from 'react'
import HeroSection from './components/HeroSection'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import LearningPath from './components/LearningPath'
import GuideGrid from './components/GuideGrid'
import Footer from './components/Footer'

export default function App() {
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
