"use client"

import React from "react"

import { useRef, useEffect, useCallback } from "react"

interface VideoPlayerProps {
  src: string
  isActive: boolean
  onEnded: () => void
  onClick: (e: React.MouseEvent) => void
}

export default function VideoPlayer({ src, isActive, onEnded, onClick }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasPlayedRef = useRef(false)
  const isActiveRef = useRef(isActive)
  
  // Keep isActiveRef in sync
  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])

  // Handle video end - only trigger if video actually played to completion
  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video || !isActiveRef.current) return
    
    // Verify the video actually reached near the end (within 0.5 seconds)
    const isNearEnd = video.duration > 0 && (video.duration - video.currentTime) < 0.5
    
    if (isNearEnd && hasPlayedRef.current) {
      onEnded()
    }
  }, [onEnded])

  // Reset and play video when it becomes active
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      hasPlayedRef.current = false
      
      // Wait for video to be ready before playing
      const playVideo = () => {
        if (!isActiveRef.current) return
        
        video.currentTime = 0
        const playPromise = video.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              hasPlayedRef.current = true
            })
            .catch(() => {
              // Playback failed, don't mark as played
            })
        }
      }

      // If video is ready, play immediately; otherwise wait for it
      if (video.readyState >= 3) {
        playVideo()
      } else {
        video.addEventListener('canplay', playVideo, { once: true })
        return () => video.removeEventListener('canplay', playVideo)
      }
    } else {
      // When becoming inactive, pause and reset
      video.pause()
      hasPlayedRef.current = false
    }
  }, [isActive])

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-contain cursor-pointer"
      style={{ objectPosition: "top" }}
      src={src}
      onEnded={handleEnded}
      onClick={onClick}
    />
  )
}
