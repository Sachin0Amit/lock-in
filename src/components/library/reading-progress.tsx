'use client'

/** Scroll-linked reading progress bar, shown under the header on lesson pages. */
import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 })

  /* Reset when the component mounts on a new lesson. */
  useEffect(() => {
    scrollYProgress.set(0)
  }, [scrollYProgress])

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-14 z-40 h-0.5 origin-left bg-[var(--book-green)]"
    />
  )
}
