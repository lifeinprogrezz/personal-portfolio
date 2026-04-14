"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { caseStudies } from "@/lib/case-studies"
import { projects } from "@/lib/projects"
import { CaseStudyFooter } from "@/components/case-study-footer"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

const easeInOutCubic = [0.25, 0.1, 0.25, 1.0]

// Parse markdown-style [text](url) links in text content
function renderTextWithLinks(text: string, brandColor: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: brandColor }}
        className="underline underline-offset-2 hover:opacity-80 transition-opacity"
      >
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex === 0) return text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

const isVideo = (src: string) => {
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg"]
  return videoExtensions.some((ext) => src.toLowerCase().includes(ext))
}

const isYouTube = (src: string) => {
  return src.includes("youtube.com/watch") || src.includes("youtu.be/")
}

const getYouTubeId = (src: string) => {
  const match = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

interface LightboxCluster {
  images: { src: string; caption?: string }[]
  currentIndex: number
}

function ImageLightbox({
  cluster,
  alt,
  onClose,
  onNavigate,
}: {
  cluster: LightboxCluster
  alt: string
  onClose: () => void
  onNavigate: (newIndex: number) => void
}) {
  const { images, currentIndex } = cluster
  const current = images[currentIndex]
  const hasMultiple = images.length > 1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  // Touch swipe support for mobile lightbox navigation
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0 && hasNext) {
        onNavigate(currentIndex + 1)
      } else if (deltaX > 0 && hasPrev) {
        onNavigate(currentIndex - 1)
      }
    }
    touchStartRef.current = null
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1)
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose, onNavigate, currentIndex, hasPrev, hasNext])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button for mobile */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 md:hidden text-muted-foreground hover:text-foreground z-10 p-2"
          aria-label="Close lightbox"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Image with click zones for navigation */}
        <div className="relative">
          <Image
            key={current.src}
            src={current.src}
            alt={alt}
            width={1600}
            height={1200}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
            sizes="90vw"
          />
          {hasMultiple && (
            <div className="absolute inset-0 flex">
              {/* Left click zone */}
              <button
                type="button"
                className={`w-1/2 h-full ${hasPrev ? "cursor-w-resize" : "cursor-zoom-out"}`}
                onClick={() => hasPrev ? onNavigate(currentIndex - 1) : onClose()}
                aria-label={hasPrev ? "Previous image" : "Close"}
              />
              {/* Right click zone */}
              <button
                type="button"
                className={`w-1/2 h-full ${hasNext ? "cursor-e-resize" : "cursor-zoom-out"}`}
                onClick={() => hasNext ? onNavigate(currentIndex + 1) : onClose()}
                aria-label={hasNext ? "Next image" : "Close"}
              />
            </div>
          )}
          {!hasMultiple && (
            <button
              type="button"
              className="absolute inset-0 cursor-zoom-out"
              onClick={onClose}
              aria-label="Close"
            />
          )}
        </div>

        {/* Caption + counter */}
        <motion.div
          className="mt-3 flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          {current.caption && (
            <p className="text-xs tracking-wider text-muted-foreground text-center">
              {current.caption}
            </p>
          )}
          {hasMultiple && (
            <p className="text-[10px] tracking-widest text-muted-foreground/50">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
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
      initial={{ opacity: 0, y: 28, filter: "blur(3px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(3px)" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function CaseStudyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "-100px" })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="w-full aspect-video relative overflow-hidden bg-muted">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-full object-contain"
        src={src}
      />
    </div>
  )
}

function CaseStudyPageInner() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { language, toggleLanguage } = useLanguage()
  const [lightboxCluster, setLightboxCluster] = useState<LightboxCluster | null>(null)

  const openLightbox = useCallback((cluster: { src: string; caption?: string }[], startIndex: number) => {
    setLightboxCluster({ images: cluster, currentIndex: startIndex })
  }, [])
  const navigateLightbox = useCallback((newIndex: number) => {
    setLightboxCluster((prev) => prev ? { ...prev, currentIndex: newIndex } : null)
  }, [])
  const closeLightbox = useCallback(() => setLightboxCluster(null), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const project = projects.find((p) => p.caseStudySlug === slug)
  const caseStudy = caseStudies.find((cs) => cs.slug === slug)

  // Get translated sections for this case study
  const translatedSections = translations.caseStudySections[slug as keyof typeof translations.caseStudySections]

  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">
            {translations.caseStudyPage.projectNotFound[language]}
          </h1>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {translations.caseStudyPage.backToHome[language]}
          </Link>
        </div>
      </div>
    )
  }

  const logoFilter =
    project.id === "equilibre-finance"
      ? "brightness(1.4) contrast(1.1)"
      : project.id === "hermes-defi"
        ? "saturate(1.5) contrast(1.15)"
        : "none"

  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [showProgress, setShowProgress] = useState(false)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowProgress(latest > 0.02)
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Cinematic page entrance */}
      <motion.div
        className="fixed inset-0 bg-background z-[70] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      />
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${project.brandColor}88, ${project.brandColor})`,
          opacity: showProgress ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Compact header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      >
        <div className="grid grid-cols-3 items-center px-6 md:px-12 py-4">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              // Use back() for smoother transition + scroll restore
              if (window.history.length > 1) {
                router.back()
              } else {
                router.push("/")
              }
            }}
            className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer justify-self-start"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12L6 8L10 4" />
            </svg>
            {translations.caseStudyPage.back[language]}
          </button>

          {/* Project logo + name */}
          <div className="flex items-center gap-3 justify-self-center">
            <div className="relative w-7 h-7 overflow-hidden rounded-md">
              <Image
                src={project.logo || "/placeholder.svg"}
                alt={`${project.title} logo`}
                fill
                className={project.id === "baile-das-piranhas" ? "object-contain" : "object-cover"}
                sizes="28px"
                style={{
                  filter: logoFilter,
                  objectPosition: "center center",
                }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {project.title}
            </span>
          </div>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer justify-self-end"
          >
            <span className={language === "en" ? "text-foreground font-medium" : ""}>EN</span>
            {" / "}
            <span className={language === "es" ? "text-foreground font-medium" : ""}>ES</span>
          </button>
        </div>
      </motion.header>

      {/* Content */}
      <motion.div
        className="pt-24 pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
      >
        {/* Hero section with stats */}
        <div className="px-6 md:px-12 mb-16">
          <FadeInSection>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-xs tracking-widest text-muted-foreground mb-8">
              {project.location} / {project.year} / {(() => {
                const pt = translations.productTypes[project.productType as keyof typeof translations.productTypes]
                return pt ? pt[language].toUpperCase() : project.productType.toUpperCase()
              })()}
            </p>
          </FadeInSection>

          {/* Stats row */}
          <FadeInSection delay={0.1}>
            <div className="flex flex-wrap gap-8 mb-8">
              {project.caseStudyStats.map((stat, i) => {
                const statLabelTranslation = translations.projectStatLabels[stat.label as keyof typeof translations.projectStatLabels]
                const translatedLabel = statLabelTranslation ? statLabelTranslation[language] : stat.label
                return (
                  <div key={i} className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-xs tracking-wider text-muted-foreground">
                      {translatedLabel}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="h-px bg-border" />

            {/* Data Sources */}
            {caseStudy.dataSources && caseStudy.dataSources.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-xs tracking-wider text-muted-foreground">
                  {translations.caseStudyPage.dataSource[language]}
                </span>
                {caseStudy.dataSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: project.brandColor }}
                    className="text-xs tracking-wider underline underline-offset-2 hover:opacity-80 transition-opacity"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
            )}
          </FadeInSection>
        </div>

        {/* Medium-style content sections */}
        <div className="max-w-3xl mx-auto px-6">
          {(() => {
            const elements: React.ReactNode[] = []
            let i = 0

            // Simple content-based lookup: find the translation by matching the English text
            const getTranslatedContent = (englishContent: string): string => {
              if (language === "en" || !translatedSections?.sections) {
                return englishContent
              }
              // Find the translation entry whose "en" value matches the original content
              const match = translatedSections.sections.find(
                (entry) => entry.en === englishContent
              )
              return match?.es ?? englishContent
            }

            while (i < caseStudy.sections.length) {
              const section = caseStudy.sections[i]

              if (section.type === "heading") {
                const content = getTranslatedContent(section.content)
                // Detect section numbers like "01", "02", "03" at the start
                const sectionNumberMatch = content.match(/^(\d+)\s+(.*)/)
                const hasNumber = !!sectionNumberMatch
                const sectionNumber = hasNumber ? sectionNumberMatch[1] : null
                const headingText = hasNumber ? sectionNumberMatch[2] : content

                elements.push(
                  <FadeInSection key={i} delay={0.05}>
                    <h2 className="text-xl md:text-2xl font-medium tracking-tight mt-12 mb-4">
                      {hasNumber && sectionNumber && (
                        <span style={{ color: project.brandColor }}>{sectionNumber} </span>
                      )}
                      <span className="text-foreground">{headingText}</span>
                    </h2>
                  </FadeInSection>
                )
                i++
                continue
              }

              if (section.type === "text") {
                const content = getTranslatedContent(section.content)
                elements.push(
                  <FadeInSection key={i} delay={0.05}>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                      {renderTextWithLinks(content, project.brandColor)}
                    </p>
                  </FadeInSection>
                )
                i++
                continue
              }

              if (section.type === "labeled-text") {
                const content = getTranslatedContent(section.content)
                elements.push(
                  <FadeInSection key={i} delay={0.05}>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                      <span className="text-muted-foreground">{section.label}</span>{" "}
                      {content}
                    </p>
                  </FadeInSection>
                )
                i++
                continue
              }

              if (section.type === "break") {
                // Break simply increments i to separate consecutive image groups
                i++
                continue
              }

              if (section.type === "spotify") {
                // Extract album ID from Spotify URL
                const spotifyUrl = section.content
                const albumMatch = spotifyUrl.match(/album\/([a-zA-Z0-9]+)/)
                const albumId = albumMatch ? albumMatch[1] : null
                if (albumId) {
                  elements.push(
                    <FadeInSection key={i} delay={0.1} className="my-8">
                      <div className="rounded-sm overflow-hidden">
                        <iframe
                          src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
                          width="100%"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded-xl"
                          style={{ border: "none" }}
                        />
                      </div>
                    </FadeInSection>
                  )
                }
                i++
                continue
              }

              if (section.type === "image-mosaic") {
                const { layout, images, compact } = section as { type: "image-mosaic"; layout: string; images: string[]; compact?: boolean }
                elements.push(
                  <FadeInSection
                    key={`mosaic-${i}`}
                    delay={0.1}
                    className="my-8"
                  >
                    <div className="border border-border rounded-sm overflow-hidden bg-muted/30">
                      {layout === "4-row" && (() => {
                        const cluster = images.map((src) => ({ src, caption: caseStudy.captions?.[src] }))
                        return (
                        <div className="grid grid-cols-2 md:grid-cols-4">
                          {images.map((src, idx) => (
                            <button
                              type="button"
                              key={idx}
                              className={`relative overflow-hidden cursor-zoom-in block ${
                                idx < images.length - 1 ? "border-r border-border" : ""
                              }`}
                              onClick={() => openLightbox(cluster, idx)}
                            >
                              <Image
                                src={src}
                                alt={`${project.title} case study`}
                                width={300}
                                height={600}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 25vw, 192px"
                              />
                            </button>
                          ))}
                        </div>
                        )
                      })()}
                      {layout === "1-top-2-bottom" && images.length >= 3 && (() => {
                        const cluster = images.map((src) => ({ src, caption: caseStudy.captions?.[src] }))
                        return (
                        <>
                          {/* Constrained image on top */}
                          <div className="flex justify-center py-4 bg-muted/20">
                            <button
                              type="button"
                              className="relative overflow-hidden cursor-zoom-in block max-w-[80%] md:max-w-[55%]"
                              onClick={() => openLightbox(cluster, 0)}
                            >
                              <Image
                                src={images[0]}
                                alt={`${project.title} case study`}
                                width={500}
                                height={500}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 55vw, 420px"
                              />
                            </button>
                          </div>
                          <div className="border-t border-border" />
                          {/* Two images side by side on bottom */}
                          <div className="grid grid-cols-2">
                            <button
                              type="button"
                              className="relative overflow-hidden cursor-zoom-in block border-r border-border"
                              onClick={() => openLightbox(cluster, 1)}
                            >
                              <Image
                                src={images[1]}
                                alt={`${project.title} case study`}
                                width={400}
                                height={250}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 50vw, 384px"
                              />
                            </button>
                            <button
                              type="button"
                              className="relative overflow-hidden cursor-zoom-in block"
                              onClick={() => openLightbox(cluster, 2)}
                            >
                              <Image
                                src={images[2]}
                                alt={`${project.title} case study`}
                                width={400}
                                height={250}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 50vw, 384px"
                              />
                            </button>
                          </div>
                        </>
                        )
                      })()}
                      {layout === "2-top-1-bottom" && images.length >= 3 && (() => {
                        const cluster = images.map((src) => ({ src, caption: caseStudy.captions?.[src] }))
                        return (
                        <>
                          {/* Two images side by side on top */}
                          <div className="grid grid-cols-2">
                            <button
                              type="button"
                              className="relative overflow-hidden cursor-zoom-in block border-r border-border"
                              onClick={() => openLightbox(cluster, 0)}
                            >
                              <Image
                                src={images[0]}
                                alt={`${project.title} case study`}
                                width={400}
                                height={250}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 50vw, 384px"
                              />
                            </button>
                            <button
                              type="button"
                              className="relative overflow-hidden cursor-zoom-in block"
                              onClick={() => openLightbox(cluster, 1)}
                            >
                              <Image
                                src={images[1]}
                                alt={`${project.title} case study`}
                                width={400}
                                height={250}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 50vw, 384px"
                              />
                            </button>
                          </div>
                          <div className="border-t border-border" />
                          {/* Constrained image on bottom */}
                          <div className="flex justify-center py-4 bg-muted/20">
                            <button
                              type="button"
                              className={`relative overflow-hidden cursor-zoom-in block ${compact ? "max-w-[45%]" : "max-w-[70%]"}`}
                              onClick={() => openLightbox(cluster, 2)}
                            >
                              <Image
                                src={images[2]}
                                alt={`${project.title} case study`}
                                width={600}
                                height={375}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 70vw, 540px"
                              />
                            </button>
                          </div>
                        </>
                        )
                      })()}
                      {layout === "2x2-grid" && images.length >= 4 && (() => {
                        const cluster = images.map((src) => ({ src, caption: caseStudy.captions?.[src] }))
                        return (
                        <div className="grid grid-cols-2">
                          {images.slice(0, 4).map((src, idx) => (
                            <button
                              type="button"
                              key={idx}
                              className={`relative overflow-hidden cursor-zoom-in block ${
                                idx % 2 === 0 ? "border-r border-border" : ""
                              } ${
                                idx < 2 ? "border-b border-border" : ""
                              }`}
                              onClick={() => openLightbox(cluster, idx)}
                            >
                              <Image
                                src={src}
                                alt={`${project.title} case study`}
                                width={400}
                                height={250}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes="(max-width: 768px) 50vw, 384px"
                              />
                            </button>
                          ))}
                        </div>
                        )
                      })()}
                    </div>
                  </FadeInSection>
                )
                i++
                continue
              }

              if (section.type === "image") {
                // Collect consecutive images into a group
                const imageGroup: { content: string; index: number; maxWidth?: string }[] = []
                while (
                  i < caseStudy.sections.length &&
                  caseStudy.sections[i].type === "image"
                ) {
                  const sec = caseStudy.sections[i] as { type: "image"; content: string; maxWidth?: string }
                  imageGroup.push({
                    content: sec.content,
                    index: i,
                    maxWidth: sec.maxWidth,
                  })
                  i++
                }

                // Separate videos, YouTube embeds, and static images
                const videos = imageGroup.filter((img) => isVideo(img.content))
                const youtubeEmbeds = imageGroup.filter((img) => isYouTube(img.content))
                const statics = imageGroup.filter((img) => !isVideo(img.content) && !isYouTube(img.content))

                // Detect portrait images (mobile screenshots)
                const portraitPatterns = [
                  "mobile",
                  "portfolio",
                  "lp-card",
                  "dashboard",
                  "copy-paste",
                  "add-liquidity",
                ]
                const isPortrait = (src: string) =>
                  portraitPatterns.some((p) => src.toLowerCase().includes(p))

                const portraits = statics.filter((img) =>
                  isPortrait(img.content)
                )
                const landscapes = statics.filter(
                  (img) => !isPortrait(img.content)
                )

                elements.push(
                  <FadeInSection
                    key={`group-${imageGroup[0].index}`}
                    delay={0.1}
                    className="my-8"
                  >
                    <div className="border border-border rounded-sm overflow-hidden bg-muted/30">
                      {/* Landscape images: side-by-side if 2, full-width if 1 or 3+ */}
                      {landscapes.length > 0 && (() => {
                        const landscapeCluster = landscapes.map((img) => ({ src: img.content, caption: caseStudy.captions?.[img.content] }))
                        return (
                        <div
                          className={`${
                            landscapes.length === 3
                              ? "grid grid-cols-1 md:grid-cols-3"
                              : landscapes.length === 2
                                ? "grid grid-cols-1 md:grid-cols-2"
                                : landscapes.length === 1 && landscapes[0].maxWidth
                                  ? "flex justify-center py-4 bg-muted/20"
                                  : "flex flex-col"
                          }`}
                        >
                          {landscapes.map((img, idx) => (
                            <button
                              type="button"
                              key={img.index}
                              className={`relative overflow-hidden cursor-zoom-in block ${
                                img.maxWidth ? "" : "w-full"
                              } ${
                                (landscapes.length === 2 || landscapes.length === 3) && idx < landscapes.length - 1
                                  ? "border-b md:border-b-0 md:border-r border-border"
                                  : ""
                              } ${
                                idx < landscapes.length - 1 && landscapes.length !== 2 && landscapes.length !== 3
                                  ? "border-b border-border"
                                  : ""
                              }`}
                              style={img.maxWidth ? { maxWidth: img.maxWidth } : undefined}
                              onClick={() => openLightbox(landscapeCluster, idx)}
                            >
                              <Image
                                src={img.content}
                                alt={`${project.title} case study`}
                                width={800}
                                height={500}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes={
                                  landscapes.length === 3
                                    ? "(max-width: 768px) 33vw, 256px"
                                    : landscapes.length === 2
                                      ? "(max-width: 768px) 50vw, 384px"
                                      : "(max-width: 768px) 100vw, 768px"
                                }
                              />
                            </button>
                          ))}
                        </div>
                        )
                      })()}

                      {/* Separator between landscapes and portraits */}
                      {landscapes.length > 0 && portraits.length > 0 && (
                        <div className="border-t border-border" />
                      )}

                      {/* Portrait images in a tight row */}
                      {portraits.length > 0 && (() => {
                        const portraitCluster = portraits.map((img) => ({ src: img.content, caption: caseStudy.captions?.[img.content] }))
                        return (
                        <div
                          className={`grid ${
                            portraits.length === 1
                              ? "grid-cols-1 max-w-[200px] mx-auto py-4"
                              : portraits.length === 2
                                ? "grid-cols-2 max-w-lg mx-auto"
                                : "grid-cols-2 md:grid-cols-3"
                          }`}
                        >
                          {portraits.map((img, idx) => (
                            <button
                              type="button"
                              key={img.index}
                              className={`relative overflow-hidden cursor-zoom-in block ${
                                idx < portraits.length - 1
                                  ? "border-r border-border"
                                  : ""
                              }`}
                              onClick={() => openLightbox(portraitCluster, idx)}
                            >
                              <Image
                                src={img.content}
                                alt={`${project.title} case study`}
                                width={300}
                                height={600}
                                className="w-full h-auto hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 hover:brightness-105 transition-all duration-500"
                                sizes={`(max-width: 768px) ${Math.floor(100 / portraits.length)}vw, ${Math.floor(768 / portraits.length)}px`}
                              />
                            </button>
                          ))}
                        </div>
                        )
                      })()}

                      {/* Videos */}
                      {videos.length > 0 && (statics.length > 0) && (
                        <div className="border-t border-border" />
                      )}
                      {videos.map((vid) => (
                        <CaseStudyVideo key={vid.index} src={vid.content} />
                      ))}
                      {/* YouTube Embeds */}
                      {youtubeEmbeds.length > 0 && (statics.length > 0 || videos.length > 0) && (
                        <div className="border-t border-border" />
                      )}
                      {youtubeEmbeds.map((yt) => {
                        const ytId = getYouTubeId(yt.content)
                        return ytId ? (
                          <div key={yt.index} className="w-full aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${ytId}`}
                              title="YouTube video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                        ) : null
                      })}
                    </div>
                  </FadeInSection>
                )
                continue
              }

              i++
            }

            return elements
          })()}
        </div>
      </motion.div>

      {/* Footer */}
      <CaseStudyFooter />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxCluster && (
          <ImageLightbox
            cluster={lightboxCluster}
            alt={`${project.title} case study detail`}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default function CaseStudyPage() {
  return (
    <LanguageProvider>
      <CaseStudyPageInner />
    </LanguageProvider>
  )
}
