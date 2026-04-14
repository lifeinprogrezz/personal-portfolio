"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface HeaderProps {
  activeTab: "projects" | "about"
  onTabChange: (tab: "projects" | "about") => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { language, toggleLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const handleTabChange = (tab: "projects" | "about") => {
    onTabChange(tab)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Desktop header */}
      <div className="relative hidden md:flex items-center justify-center px-6 py-4">
        {/* Logo - positioned left */}
        <div className="absolute left-6 flex items-center">
          <svg width="160" height="24" viewBox="0 0 160 24" fill="none" className="text-foreground">
            <text x="0" y="18" fontSize="16" fontWeight="bold" fill="currentColor">lifeinprogrezz </text>
          </svg>
        </div>

        {/* Navigation - centered */}
        <nav className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => handleTabChange("projects")}
            className={`relative text-xs tracking-wider transition-colors cursor-pointer pb-1 ${
              activeTab === "projects"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {translations.nav.projects[language]}
            {activeTab === "projects" && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("about")}
            className={`relative text-xs tracking-wider transition-colors cursor-pointer pb-1 ${
              activeTab === "about"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {translations.nav.aboutMe[language]}
            {activeTab === "about" && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        </nav>

        {/* Social icons + Language toggle - positioned right */}
        <div className="absolute right-6 flex items-center gap-4">
          {/* Language toggle */}
          <motion.button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center text-xs tracking-wider cursor-pointer"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a Ingles"}
          >
            <span className={`transition-colors ${language === "en" ? "text-foreground" : "text-muted-foreground"}`}>EN</span>
            <span className="text-muted-foreground/40 mx-0.5">/</span>
            <span className={`transition-colors ${language === "es" ? "text-foreground" : "text-muted-foreground"}`}>ES</span>
          </motion.button>
          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/lifeinprogrezz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
            whileHover={{ y: -2, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </motion.a>
          {/* X (Twitter) */}
          <motion.a
            href="https://x.com/lifeinprogrezz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="X"
            whileHover={{ y: -2, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/robertoquinterodelaiglesia/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
            whileHover={{ y: -2, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </motion.a>
          {/* GitHub */}
          <motion.a
            href="https://github.com/lifeinprogrezz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
            whileHover={{ y: -2, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        {/* Logo */}
        <svg width="140" height="22" viewBox="0 0 160 24" fill="none" className="text-foreground">
          <text x="0" y="18" fontSize="16" fontWeight="bold" fill="currentColor">lifeinprogrezz </text>
        </svg>

        {/* Hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 flex items-center justify-center text-foreground cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-[5px] w-5">
            <motion.span
              className="block h-px w-full bg-foreground origin-center"
              animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-full bg-foreground origin-center"
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border/30 bg-background/98 backdrop-blur-md"
          >
            <nav className="flex flex-col px-6 pt-4 pb-6 gap-1">
              {/* Navigation tabs */}
              <button
                type="button"
                onClick={() => handleTabChange("projects")}
                className={`text-left py-3 text-sm tracking-wider transition-colors cursor-pointer ${
                  activeTab === "projects"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {translations.nav.projects[language]}
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("about")}
                className={`text-left py-3 text-sm tracking-wider transition-colors cursor-pointer ${
                  activeTab === "about"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {translations.nav.aboutMe[language]}
              </button>

              {/* Divider */}
              <div className="h-px bg-border/30 my-2" />

              {/* Language toggle */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center py-3 text-sm tracking-wider cursor-pointer"
                aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a Ingles"}
              >
                <span className={`transition-colors ${language === "en" ? "text-foreground" : "text-muted-foreground"}`}>EN</span>
                <span className="text-muted-foreground/40 mx-1">/</span>
                <span className={`transition-colors ${language === "es" ? "text-foreground" : "text-muted-foreground"}`}>ES</span>
              </button>

              {/* Divider */}
              <div className="h-px bg-border/30 my-2" />

              {/* Social icons row */}
              <div className="flex items-center gap-5 py-3">
                <a
                  href="https://www.instagram.com/lifeinprogrezz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://x.com/lifeinprogrezz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="X"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/robertoquinterodelaiglesia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://github.com/lifeinprogrezz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="GitHub"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
