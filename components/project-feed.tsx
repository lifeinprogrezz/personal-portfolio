"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import VideoPlayer from "@/components/video-player"
import { projects, Project } from "@/lib/projects"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"


// Custom easing for heavy, smooth animations
const easeInOutCubic = [0.65, 0, 0.35, 1]

// Helper to detect if a gallery item is a video
const isVideo = (src: string) => {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg']
  return videoExtensions.some(ext => src.toLowerCase().includes(ext))
}

// Fixed dimensions for stable layout - no resizing ever (DESKTOP ONLY)
const COLLAPSED_HEIGHT = 465
const EXPANDED_HEIGHT = 671

// Sub-components that use hooks (useLanguage) - extracted to avoid conditional hook calls
function ExpandedYearProduct({ project, isExpanded, animationComplete }: { project: Project; isExpanded: boolean; animationComplete: boolean }) {
  const { language } = useLanguage()
  const productTypeTranslation = translations.productTypes[project.productType as keyof typeof translations.productTypes]
  const translatedProductType = productTypeTranslation ? productTypeTranslation[language] : project.productType

  return (
    <>
      <motion.div
        className="overflow-hidden"
        animate={{
          opacity: isExpanded && animationComplete ? 1 : 0,
          height: isExpanded ? "auto" : 0,
          marginBottom: isExpanded ? "1rem" : 0,
        }}
        transition={{ duration: 0.5, ease: easeInOutCubic }}
      >
        <p className="text-xs text-muted-foreground tracking-wider mb-1">{translations.projectFeed.year[language]}</p>
        <p className="text-sm font-medium text-foreground">{project.year}</p>
      </motion.div>
      <motion.div
        className="overflow-hidden"
        animate={{
          opacity: isExpanded && animationComplete ? 1 : 0,
          height: isExpanded ? "auto" : 0,
        }}
        transition={{ duration: 0.5, ease: easeInOutCubic, delay: 0.05 }}
      >
        <p className="text-xs text-muted-foreground tracking-wider mb-1">{translations.projectFeed.product[language]}</p>
        <p className="text-sm font-medium text-foreground">{translatedProductType}</p>
      </motion.div>
    </>
  )
}

function ExpandedRightContent({ project, animationComplete }: { project: Project; animationComplete: boolean }) {
  const { language } = useLanguage()
  const blurbTranslation = translations.projectBlurbs[project.id as keyof typeof translations.projectBlurbs]
  const translatedBlurb = blurbTranslation ? blurbTranslation[language] : project.caseStudyBlurb

  return (
    <>
      <motion.p
        className="text-sm text-muted-foreground leading-relaxed mb-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        {translatedBlurb}
      </motion.p>

      {/* Full Case Study CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <Link
          href={`/projects/${project.caseStudySlug}`}
          onClick={(e) => {
            e.stopPropagation()
            try {
              sessionStorage.setItem("portfolio-scroll-y", String(window.scrollY))
            } catch {}
          }}
          className="block w-full text-center py-2.5 text-xs tracking-wider text-background bg-foreground hover:opacity-80 transition-opacity cursor-pointer mb-5"
        >
          {translations.projectFeed.fullCaseStudy[language]}
        </Link>
      </motion.div>

      {/* Stats with separator lines */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        {project.caseStudyStats.map((stat, i) => {
          const statLabelTranslation = translations.projectStatLabels[stat.label as keyof typeof translations.projectStatLabels]
          const translatedLabel = statLabelTranslation ? statLabelTranslation[language] : stat.label
          return (
            <div key={i} className={`py-2.5 ${i < project.caseStudyStats.length - 1 ? "border-b border-border" : ""} ${i === 0 ? "border-t border-border" : ""}`}>
              <span className="text-sm font-semibold text-foreground">{stat.value}</span>
              <span className="text-xs tracking-wider text-muted-foreground ml-2">{translatedLabel}</span>
            </div>
          )
        })}
      </motion.div>
    </>
  )
}

// =============================================
// MOBILE EXPANDED CONTENT (stacked below image)
// =============================================
function MobileExpandedContent({ project, animationComplete }: { project: Project; animationComplete: boolean }) {
  const { language } = useLanguage()
  const blurbTranslation = translations.projectBlurbs[project.id as keyof typeof translations.projectBlurbs]
  const translatedBlurb = blurbTranslation ? blurbTranslation[language] : project.caseStudyBlurb
  const productTypeTranslation = translations.productTypes[project.productType as keyof typeof translations.productTypes]
  const translatedProductType = productTypeTranslation ? productTypeTranslation[language] : project.productType

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: easeInOutCubic }}
      className="overflow-hidden"
    >
      <div className="px-4 pt-4 pb-5">
        {/* Year + Product type row */}
        <motion.div
          className="flex gap-6 mb-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 6 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div>
            <p className="text-xs text-muted-foreground tracking-wider mb-0.5">{translations.projectFeed.year[language]}</p>
            <p className="text-sm font-medium text-foreground">{project.year}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground tracking-wider mb-0.5">{translations.projectFeed.product[language]}</p>
            <p className="text-sm font-medium text-foreground">{translatedProductType}</p>
          </div>
        </motion.div>

        {/* Blurb */}
        <motion.p
          className="text-sm text-muted-foreground leading-relaxed mb-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 6 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {translatedBlurb}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 6 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Link
            href={`/projects/${project.caseStudySlug}`}
            onClick={(e) => {
              e.stopPropagation()
              try {
                sessionStorage.setItem("portfolio-scroll-y", String(window.scrollY))
              } catch {}
            }}
            className="block w-full text-center py-3 text-xs tracking-wider text-background bg-foreground hover:opacity-80 transition-opacity cursor-pointer mb-4"
          >
            {translations.projectFeed.fullCaseStudy[language]}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 6 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {project.caseStudyStats.map((stat, i) => {
            const statLabelTranslation = translations.projectStatLabels[stat.label as keyof typeof translations.projectStatLabels]
            const translatedLabel = statLabelTranslation ? statLabelTranslation[language] : stat.label
            return (
              <div key={i} className={`py-2.5 ${i < project.caseStudyStats.length - 1 ? "border-b border-border" : ""} ${i === 0 ? "border-t border-border" : ""}`}>
                <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                <span className="text-xs tracking-wider text-muted-foreground ml-2">{translatedLabel}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ProjectFeed() {
  // Use a Set to track multiple expanded projects simultaneously
  const [expandedProjectIds, setExpandedProjectIds] = useState<Set<string>>(new Set())
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects)
  // Track which projects have been collapsed due to scrolling out of view
  const collapsedByScrollRef = useRef<Set<string>>(new Set())
  const observerRef = useRef<HTMLDivElement>(null)

  // Infinite scroll - duplicate projects when reaching the end
  const loadMore = useCallback(() => {
    setVisibleProjects((prev) => [...prev, ...projects])
  }, [])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [loadMore])

  // Handle collapsing projects when they scroll completely out of view (desktop only)
  const handleOutOfView = useCallback((projectId: string) => {
    setExpandedProjectIds(prev => {
      if (prev.has(projectId)) {
        const newSet = new Set(prev)
        newSet.delete(projectId)
        collapsedByScrollRef.current.add(projectId)
        return newSet
      }
      return prev
    })
  }, [])

  // Custom smooth scroll function for better control over duration and easing
  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY
    const difference = targetY - startY
    const startTime = performance.now()

    const easeOutQuint = (t: number): number => {
      return 1 - Math.pow(1 - t, 5)
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuint(progress)
      
      window.scrollTo(0, startY + difference * easedProgress)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Desktop click handler
  const handleProjectClick = (projectId: string, element: HTMLDivElement | null, isCurrentlyExpanded: boolean, projectIndex: number) => {
    if (isCurrentlyExpanded) {
      return
    }
    
    setExpandedProjectIds(prev => {
      const newSet = new Set(prev)
      newSet.add(projectId)
      collapsedByScrollRef.current.delete(projectId)
      return newSet
    })
    
    if (element) {
      // Wait for framer-motion height/margin animation to fully settle (0.6s duration)
      // then read the FINAL position and scroll to center the card
      setTimeout(() => {
        const viewportHeight = window.innerHeight
        const rect = element.getBoundingClientRect()
        const currentScrollY = window.scrollY
        const elementTopAbsolute = rect.top + currentScrollY
        const expandedContentCenter = elementTopAbsolute + (EXPANDED_HEIGHT / 2)
        const targetScrollY = expandedContentCenter - (viewportHeight / 2)
        smoothScrollTo(Math.max(0, targetScrollY), 2000)
      }, 650)
    }
  }

  // Mobile tap handler - toggle expand/collapse
  const handleMobileProjectTap = (projectId: string) => {
    setExpandedProjectIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  return (
    <LayoutGroup>
      <div className="min-h-screen pt-16 lg:pt-24">
        <div className="w-full">
          {visibleProjects.map((project, index) => {
            const uniqueId = `${project.id}-${index}`
            const isExpanded = expandedProjectIds.has(uniqueId)
            return (
              <ProjectItem
                key={uniqueId}
                project={project}
                uniqueId={uniqueId}
                isExpanded={isExpanded}
                onProjectClick={handleProjectClick}
                onMobileProjectTap={handleMobileProjectTap}
                onOutOfView={handleOutOfView}
                index={index}
              />
            )
          })}

          {/* Load more trigger */}
          <div ref={observerRef} className="h-4" />
        </div>
      </div>
    </LayoutGroup>
  )
}

interface ProjectItemProps {
  project: Project
  uniqueId: string
  isExpanded: boolean
  onProjectClick: (projectId: string, element: HTMLDivElement | null, isCurrentlyExpanded: boolean, projectIndex: number) => void
  onMobileProjectTap: (projectId: string) => void
  onOutOfView: (projectId: string) => void
  index: number
}

function ProjectItem({ project, uniqueId, isExpanded, onProjectClick, onMobileProjectTap, onOutOfView, index }: ProjectItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const itemRef = useRef<HTMLDivElement>(null)
  const isInViewportRef = useRef(true)

  // Observer to detect when expanded project scrolls completely out of view (desktop)
  useEffect(() => {
    if (!isExpanded || !itemRef.current) return
    // Only apply auto-collapse on desktop
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting && isInViewportRef.current) {
          isInViewportRef.current = false
          onOutOfView(uniqueId)
        } else if (entry.isIntersecting) {
          isInViewportRef.current = true
        }
      },
      { 
        rootMargin: "-100px 0px -100px 0px",
        threshold: 0 
      }
    )

    observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [isExpanded, uniqueId, onOutOfView])

  // Desktop click handler with visibility gating
  const handleClick = () => {
    if (!itemRef.current) {
      onProjectClick(uniqueId, itemRef.current, isExpanded, index)
      return
    }
    
    const rect = itemRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const isBelowCenter = rect.top > viewportHeight / 2
    
    if (isBelowCenter && !isExpanded) {
      const visibleHeight = Math.max(0, viewportHeight - rect.top)
      const visibilityPercentage = visibleHeight / rect.height
      if (visibilityPercentage < 0.4) {
        return
      }
    }
    
    onProjectClick(uniqueId, itemRef.current, isExpanded, index)
  }

  // Gallery click handler (desktop) - left side goes back, right side goes forward
  const handleGalleryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded && project.gallery.length > 0) {
      e.stopPropagation()
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const halfWidth = rect.width / 2
      const totalItems = project.gallery.length + 1
      
      if (clickX < halfWidth) {
        setCurrentImageIndex((prev) => (prev - 1 + totalItems) % totalItems)
      } else {
        setCurrentImageIndex((prev) => (prev + 1) % totalItems)
      }
    }
  }

  // Mobile swipe support for gallery
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isExpanded || project.gallery.length === 0) return
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isExpanded || project.gallery.length === 0) return
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
    // Only trigger if horizontal swipe is dominant and significant
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      const totalItems = project.gallery.length + 1
      if (deltaX < 0) {
        // Swipe left = next
        setCurrentImageIndex((prev) => (prev + 1) % totalItems)
      } else {
        // Swipe right = prev
        setCurrentImageIndex((prev) => (prev - 1 + totalItems) % totalItems)
      }
    }
    touchStartRef.current = null
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Reset animation state and image index when collapsed
  useEffect(() => {
    if (!isExpanded) {
      setAnimationComplete(false)
      setCurrentImageIndex(0)
    }
  }, [isExpanded])

  // Set animation complete after expansion animation finishes
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  const logoFilter = project.id === "equilibre-finance" 
    ? "brightness(1.4) contrast(1.1)" 
    : project.id === "hermes-defi" 
      ? "saturate(1.5) contrast(1.15)" 
      : "none"

  // Gallery rendering shared between mobile and desktop
  const renderGallery = (containerClass: string) => (
    <>
      {project.gallery.length > 0 && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: "#fff",
            opacity: isExpanded && animationComplete && currentImageIndex > 0 ? 1 : 0,
            transition: "opacity 300ms ease-in-out",
            zIndex: 1
          }}
        />
      )}
      {project.gallery.length > 0 && project.gallery.map((src, idx) => {
        const isEquilibreDashboard = src.includes("equilibre-dashboard")
        const isHermesChartsImage = src.includes("hermes-2")
        const isActive = isExpanded && animationComplete && currentImageIndex === idx + 1
        const isVideoFile = isVideo(src)
        
        return (
          <div
            key={idx}
            className="absolute inset-0"
            style={{ 
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 3 : 2,
              transition: "opacity 700ms ease-in-out",
              pointerEvents: isActive ? "auto" : "none"
            }}
          >
            {isVideoFile ? (
              <VideoPlayer
                src={src}
                isActive={isActive}
                onEnded={() => {
                  const isLastItem = idx === project.gallery.length - 1
                  if (isLastItem) {
                    setCurrentImageIndex(0)
                  } else {
                    setCurrentImageIndex(idx + 2)
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  const rect = e.currentTarget.getBoundingClientRect()
                  const clickX = e.clientX - rect.left
                  const halfWidth = rect.width / 2
                  const totalItems = project.gallery.length + 1
                  
                  if (clickX < halfWidth) {
                    setCurrentImageIndex((prev) => (prev - 1 + totalItems) % totalItems)
                  } else {
                    setCurrentImageIndex((prev) => (prev + 1) % totalItems)
                  }
                }}
              />
            ) : (
              <Image
                src={src || "/placeholder.svg"}
                alt={`${project.title} - Image ${idx + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 825px"
                style={
                  isEquilibreDashboard 
                    ? { filter: "contrast(1.05) saturate(1.1) brightness(1.02)" }
                    : isHermesChartsImage 
                      ? { objectPosition: "top" }
                      : undefined
                }
              />
            )}
          </div>
        )
      })}

    </>
  )

  return (
    <div ref={itemRef}>
      {/* ============================================= */}
      {/* MOBILE LAYOUT (< lg) - vertical stacked card  */}
      {/* ============================================= */}
      <motion.div
        className="lg:hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 30,
        }}
        transition={{ 
          opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 },
          y: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 },
        }}
      >
        <div 
          className="mb-6 cursor-pointer"
          onClick={() => onMobileProjectTap(uniqueId)}
        >
          {/* Solid brand color block - full width (gallery only accessible via case study) */}
          <div 
            className="relative w-full overflow-hidden"
            style={{ backgroundColor: project.brandColor, aspectRatio: "4/3" }}
          />

          {/* Metadata row below image */}
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Logo */}
            <div 
              className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-lg shadow-sm"
              style={{ backgroundColor: !project.logo ? project.brandColor : undefined }}
            >
              <Image
                src={project.logo || "/placeholder.svg"}
                alt={`${project.title} logo`}
                fill
                className="object-cover"
                sizes="36px"
                style={{ 
                  filter: logoFilter,
                  objectPosition: project.id === "baile-das-piranhas" ? "center 55%" : "center center"
                }}
              />
            </div>

            {/* Title + role */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-medium text-foreground truncate">{project.title}</h2>
              <p className="text-xs text-muted-foreground tracking-widest">{project.location}</p>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </motion.div>
          </div>

          {/* Expanded content (blurb + stats + CTA) */}
          <AnimatePresence>
            {isExpanded && (
              <MobileExpandedContent project={project} animationComplete={animationComplete} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ============================================= */}
      {/* DESKTOP LAYOUT (>= lg) - 3-column horizontal  */}
      {/* ============================================= */}
      <motion.div
        className="hidden lg:block w-full overflow-x-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 40,
          height: isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
          marginTop: isExpanded ? "2rem" : "0rem",
          marginBottom: isExpanded ? "2rem" : "3.5rem",
        }}
        transition={{ 
          opacity: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 },
          y: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.08 },
          height: { duration: 0.6, ease: easeInOutCubic },
          marginTop: { duration: 0.6, ease: easeInOutCubic },
          marginBottom: { duration: 0.6, ease: easeInOutCubic },
        }}
      >
        {/* Main container with 3-column layout */}
        <div 
          className={`cursor-pointer transition-all duration-500 ${!isExpanded ? "hover:translate-x-1" : ""}`}
          style={!isExpanded ? { boxShadow: "inset 0 0 0 0 transparent" } : undefined}
          onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.boxShadow = `inset 2px 0 0 0 ${project.brandColor}` }}
          onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent" }}
          onClick={handleClick}
        >
          <div className="flex items-start justify-center">
            {/* LEFT COLUMN - Metadata */}
            <motion.div 
              className="flex-shrink-0 pt-4 flex flex-col"
              animate={{
                width: isExpanded ? "260px" : "180px",
                paddingRight: isExpanded ? "0px" : "32px",
                alignItems: isExpanded ? "flex-start" : "flex-end",
              }}
              transition={{ 
                duration: 1.0, 
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
            >
              {/* Logo */}
              <motion.div
                layoutId={`logo-${uniqueId}`}
                className="mb-3 relative overflow-hidden rounded-lg shadow-sm"
                style={{ backgroundColor: !project.logo ? project.brandColor : undefined }}
                animate={{
                  width: isExpanded ? 48 : 44,
                  height: isExpanded ? 48 : 44,
                }}
                transition={{ 
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  layout: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }
                }}
              >
                <Image
                  src={project.logo || "/placeholder.svg"}
                  alt={`${project.title} logo`}
                  fill
                  className="object-cover"
                  sizes="48px"
                  style={{ 
                    filter: logoFilter,
                    objectPosition: project.id === "baile-das-piranhas" ? "center 55%" : "center center"
                  }}
                />
              </motion.div>

              {/* Title */}
              <motion.h2
                layoutId={`title-${uniqueId}`}
                className={`font-medium text-foreground mb-1 whitespace-nowrap ${isExpanded ? "text-left" : "text-right"}`}
                style={{ width: "100%" }}
                animate={{
                  fontSize: isExpanded ? "1.25rem" : "1.125rem",
                }}
                transition={{ 
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  layout: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }
                }}
              >
                {project.title}
              </motion.h2>

              {/* Role/Location */}
              <motion.p
                layoutId={`role-${uniqueId}`}
                className="text-xs text-muted-foreground tracking-widest"
                animate={{
                  marginBottom: isExpanded ? "2rem" : "0rem",
                }}
                transition={{ 
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  layout: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] }
                }}
              >
                {project.location}
              </motion.p>

              {/* Year + Product (expanded only) */}
              <ExpandedYearProduct project={project} isExpanded={isExpanded} animationComplete={animationComplete} />
            </motion.div>

            {/* CENTER COLUMN - Solid brand color block */}
            <motion.div
              layoutId={`project-card-${uniqueId}`}
              className="flex-shrink-0 overflow-hidden relative"
              style={{ backgroundColor: project.brandColor }}
              animate={{
                width: isExpanded ? 825 : 550,
                aspectRatio: "4/3",
              }}
              transition={{
                layout: { duration: 0.8, ease: easeInOutCubic },
                width: { duration: 0.8, ease: easeInOutCubic },
              }}
            />

            {/* RIGHT COLUMN - Case study blurb, stats, CTA (only visible when expanded) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="flex-shrink-0 pl-10 pr-6 pt-6 flex flex-col"
                  style={{ width: "260px" }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ 
                    opacity: animationComplete ? 1 : 0, 
                    x: animationComplete ? 0 : 30 
                  }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: easeInOutCubic }}
                >
                  <ExpandedRightContent project={project} animationComplete={animationComplete} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right spacer (only when collapsed) */}
            {!isExpanded && (
              <div className="flex-shrink-0" style={{ width: "180px" }} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
