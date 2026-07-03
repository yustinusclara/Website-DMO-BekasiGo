'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ReadingProgress — tiny fixed bar at the top of the viewport that
 * fills as the user scrolls through the article. Sits just above the
 * sticky header (z-index above 50).
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 22, restDelta: 0.001 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 h-[3px] z-[60] origin-left bg-bekasi-gold-500 pointer-events-none"
      style={{ scaleX, opacity: visible ? 1 : 0, transition: 'opacity 250ms ease' }}
    />
  )
}
