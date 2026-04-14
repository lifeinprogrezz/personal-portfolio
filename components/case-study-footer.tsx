"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const brandColors = {
  teal: "#5EEAD4",
  indigo: "#818CF8",
  red: "#E63946",
  pink: "#D946EF",
  amber: "#FBBF24",
}

export function CaseStudyFooter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="px-6 md:px-12 pb-12 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="flex gap-0 h-px w-full">
          {Object.values(brandColors).map((color, i) => (
            <motion.div
              key={i}
              className="flex-1 h-full origin-left"
              style={{ backgroundColor: color }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
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
      </motion.div>
    </div>
  )
}
