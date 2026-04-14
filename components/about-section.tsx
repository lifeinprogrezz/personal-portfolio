"use client"

import React from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

const aboutPhotos = [
  { src: "/images/roberto-1.jpg", position: "center 30%", captionKey: "SCHOOL SHOOTING" as const },
  { src: "/images/roberto-4.jpeg", position: "center center", captionKey: "SPRING AT BARCELONA" as const },
  { src: "/images/roberto-3.jpeg", position: "center center", captionKey: "CIES ISLANDS" as const },
  { src: "/images/roberto-2.jpeg", position: "center 85%", captionKey: "RANDOM SELFIE" as const },
  { src: "/images/roberto-7.jpeg", position: "center center", captionKey: "LIFETIME FRIEND" as const },
]

const easeInOutCubic = [0.25, 0.1, 0.25, 1.0]

// Brand colors from Projects section
const brandColors = {
  teal: "#5EEAD4",    // Gliquid
  indigo: "#818CF8",  // Tierra Labs
  red: "#E63946",     // Baile Das Piranhas
  pink: "#D946EF",    // Equilibre
  amber: "#FBBF24",   // Hermes DeFi
}

const stats = [
  { number: "$500M+", labelKey: "onChainVolume" as const },
  { number: "$900K+", labelKey: "capitalSecured" as const },
  { number: "$650K+", labelKey: "revenueGenerated" as const },
]

interface ApproachItem {
  number: string
  index: number
  color: string
}

const approach: ApproachItem[] = [
  { number: "01", index: 0, color: brandColors.teal },
  { number: "02", index: 1, color: brandColors.indigo },
  { number: "03", index: 2, color: brandColors.red },
  { number: "04", index: 3, color: brandColors.amber },
]

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="h-px bg-border"
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.6, ease: easeInOutCubic, delay }}
      style={{ transformOrigin: "left" }}
    />
  )
}

function FadeInSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 35, filter: "blur(3px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 35, filter: "blur(3px)" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function ApproachCard({ item, index, title, description }: { item: ApproachItem; index: number; title: string; description: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: easeInOutCubic, delay: index * 0.1 }}
      className="group relative py-5"
    >
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="flex items-start gap-6 pl-4 border-l-2 transition-colors duration-300"
          style={{
            borderLeftColor: "transparent",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = item.color }}
          onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "transparent" }}
        >
          {/* Number with color accent */}
          <div className="flex-shrink-0">
            <span
              className="text-xs font-mono tracking-wider"
              style={{ color: item.color }}
            >
              {item.number}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground mb-2 tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
      <div className="h-px bg-border mt-5" />
    </motion.div>
  )
}

function PhotoCarousel() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % aboutPhotos.length)
  }, [])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + aboutPhotos.length) % aboutPhotos.length)
  }, [])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 5000)
    return () => clearInterval(timer)
  }, [goToNext])

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  }

  const currentCaption = translations.photoCaptions[aboutPhotos[currentIndex].captionKey]?.[language] ?? aboutPhotos[currentIndex].captionKey

  return (
    <div className="w-full lg:w-72 relative group">
      {/* Image container */}
      <div className="relative h-80 overflow-hidden cursor-pointer" onClick={goToNext}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.04] }}
              transition={{ duration: 5, ease: "linear" }}
            >
              <Image
                src={aboutPhotos[currentIndex].src}
                alt="Roberto Quintero"
                fill
                className="object-cover"
                style={{ objectPosition: aboutPhotos[currentIndex].position }}
                sizes="(max-width: 1024px) 100vw, 288px"
                priority={currentIndex === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay at bottom for caption */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Caption and counter */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
          <p className="text-xs tracking-widest text-white/80">
            {currentCaption}
          </p>
          <p className="text-xs font-mono text-white/50">
            {String(currentIndex + 1).padStart(2, "0")}/{String(aboutPhotos.length).padStart(2, "0")}
          </p>
        </div>

        {/* Prev/Next click zones */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goToPrev() }}
          className="absolute left-0 top-0 h-full w-1/3 cursor-w-resize opacity-0"
          aria-label="Previous photo"
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goToNext() }}
          className="absolute right-0 top-0 h-full w-1/3 cursor-e-resize opacity-0"
          aria-label="Next photo"
        />
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-3 justify-center">
        {aboutPhotos.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
            className="p-0.5"
            aria-label={`Go to photo ${i + 1}`}
          >
            <div
              className="h-px transition-all duration-300"
              style={{
                width: i === currentIndex ? "16px" : "8px",
                backgroundColor: i === currentIndex ? "#818CF8" : "rgba(255,255,255,0.2)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const { language } = useLanguage()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-background"
    >
      {/* Section header */}
      <div className="px-6 md:px-12 pt-20 pb-6 md:pt-24 md:pb-16">
        <FadeInSection>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-4">
                {translations.about.sectionLabel[language]}
              </p>
              <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-tight tracking-tight text-balance max-w-2xl">
                {translations.about.heading.prefix[language]}
                <span style={{ color: "#5EEAD4" }}>{translations.about.heading.products[language]}</span>
                {translations.about.heading.from[language]}
                <span style={{ color: "#818CF8" }}>{translations.about.heading.zero[language]}</span>
                {translations.about.heading.to[language]}
                <span style={{ color: "#D946EF" }}>{translations.about.heading.one[language]}</span>
              </h2>
            </div>
            <p className="text-xs tracking-wider text-muted-foreground mt-2 hidden lg:block">
              05
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Bio + Photo grid */}
      <div className="px-6 md:px-12">
        <AnimatedLine />
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 py-4 md:py-8">
          {/* Bio text */}
          <FadeInSection className="flex-1" delay={0.1}>
            <div className="max-w-lg">
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {translations.about.bio1[language]}{" "}
                <a href="https://rankings.ft.com/rankings/3006/mba-2026" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity" style={{ color: "#818CF8" }}>ESADE</a>{" "}
                {translations.about.bio1End[language]}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {translations.about.bio2[language]}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {translations.about.bio3[language]}
              </p>
            </div>
          </FadeInSection>

          {/* Photo carousel */}
          <FadeInSection className="flex-shrink-0" delay={0.2}>
            <PhotoCarousel />
          </FadeInSection>
        </div>
      </div>

      {/* Stats row - centered, large numbers, no color dots */}
      <div className="px-6 md:px-12 pb-10 md:pb-20">
        <AnimatedLine />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-px pt-10 sm:pt-16 pb-4">
          {stats.map((stat, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div
                className="group cursor-default text-center"
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <motion.p
                  className="text-4xl md:text-5xl font-medium text-foreground mb-3 font-mono"
                  animate={{
                    scale: hoveredStat === i ? 1.08 : 1,
                    y: hoveredStat === i ? -3 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-xs tracking-widest text-muted-foreground">
                  {translations.about.stats[stat.labelKey][language]}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {/* How I Work / Approach */}
      <div className="px-6 md:px-12 pb-2">
        <AnimatedLine />
        <FadeInSection className="pt-10 pb-2">
          <p className="text-xs tracking-widest text-muted-foreground">
            {translations.about.howIWork[language]}
          </p>
        </FadeInSection>
        <div>
          {approach.map((item, i) => (
            <ApproachCard
              key={i}
              item={item}
              index={i}
              title={translations.about.approach[item.index].title[language]}
              description={translations.about.approach[item.index].description[language]}
            />
          ))}
        </div>
      </div>

      {/* SoundCloud Widget */}
      <div className="px-6 md:px-12 pb-16">
        <FadeInSection>
          <div className="mb-8">
            <p className="text-xs tracking-widest text-muted-foreground mb-4">
              {translations.about.nowPlaying[language]}
            </p>
            <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight text-balance max-w-lg">
              {translations.about.soundQuote[language]}
            </h3>
          </div>
          <div className="w-full overflow-hidden rounded-sm border border-border">
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Feemtriplin%2Fif-i-wanted-to&color=%235EEAD4&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
              title="SoundCloud Player"
            />
          </div>
        </FadeInSection>
      </div>

      {/* Contact */}
      <div className="px-6 md:px-12 pb-16">
        <AnimatedLine />
        <FadeInSection className="pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-4">
                {translations.about.contact[language]}
              </p>
              <h3 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight text-balance max-w-lg">
                {translations.about.letsChat[language]}
              </h3>
            </div>

            <motion.a
              href="https://zcal.co/lifeinprogrezz/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-foreground text-background text-sm tracking-wider cursor-pointer shrink-0"
              whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(129, 140, 248, 0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {translations.about.connect[language]}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </FadeInSection>
      </div>

      {/* Footer accent line with brand colors */}
      <div className="px-6 md:px-12 pb-12">
        <div className="flex gap-0 h-px w-full">
          {Object.values(brandColors).map((color, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between pt-6">
          <p className="text-xs tracking-wider text-muted-foreground/40">
            Roberto Quintero
          </p>
          <p className="text-xs tracking-wider text-muted-foreground/40">
            2026
          </p>
        </div>
      </div>
    </section>
  )
}
