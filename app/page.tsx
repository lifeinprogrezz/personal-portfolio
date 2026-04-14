"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Header } from "@/components/header"
import { ProjectFeed } from "@/components/project-feed"
import { AboutSection } from "@/components/about-section"
import { LanguageProvider } from "@/lib/language-context"

const pageTransition = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(4px)" },
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"projects" | "about">("projects")
  // Check if returning from a case study (skip curtain animation)
  const [returningFromCase] = useState(() => {
    try {
      return !!sessionStorage.getItem("portfolio-scroll-y")
    } catch { return false }
  })

  const [curtainPhase, setCurtainPhase] = useState<"closed" | "line" | "split" | "done">(
    returningFromCase ? "done" : "closed"
  )

  // Restore scroll position when returning from a case study
  useEffect(() => {
    try {
      const savedY = sessionStorage.getItem("portfolio-scroll-y")
      if (savedY) {
        const y = parseInt(savedY, 10)
        sessionStorage.removeItem("portfolio-scroll-y")
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior })
        })
      }
    } catch {}
  }, [])

  // Orchestrate curtain phases (skip if returning from case study)
  useEffect(() => {
    if (returningFromCase) return
    const t1 = setTimeout(() => setCurtainPhase("line"), 150)
    const t2 = setTimeout(() => setCurtainPhase("split"), 700)
    const t3 = setTimeout(() => setCurtainPhase("done"), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [returningFromCase])

  const isDone = curtainPhase === "done"

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-background">
        {/* Cinematic split-curtain overlay */}
        <AnimatePresence>
          {!isDone && (
            <>
              {/* Top half */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-1/2 bg-background z-50 pointer-events-none"
                initial={{ y: 0 }}
                animate={{ y: curtainPhase === "split" ? "-100%" : 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              />
              {/* Bottom half */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 h-1/2 bg-background z-50 pointer-events-none"
                initial={{ y: 0 }}
                animate={{ y: curtainPhase === "split" ? "100%" : 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              />
              {/* Brand gradient line at center */}
              <motion.div
                className="fixed top-1/2 left-0 right-0 h-[2px] z-50 pointer-events-none -translate-y-1/2"
                style={{
                  background: "linear-gradient(90deg, #2dd4bf, #818cf8, #f87171, #f472b6, #fbbf24)",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: curtainPhase === "closed" ? 0 : curtainPhase === "line" ? 1 : 1,
                  opacity: curtainPhase === "closed" ? 0 : curtainPhase === "split" ? 0 : 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Header staggers in after curtain */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isDone ? 1 : 0, y: isDone ? 0 : 12 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Header activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectFeed />
            </motion.div>
          )}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </LanguageProvider>
  )
}
