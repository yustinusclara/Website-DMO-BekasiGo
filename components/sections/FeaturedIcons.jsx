'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Section from '@/components/layout/Section'
import LandmarkCard3D from '@/components/ds/LandmarkCard3D'
import { FEATURED_ICONS } from '@/lib/content/homepage'

export default function FeaturedIcons() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  })
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [snaps, setSnaps] = useState([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIdx(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <Section
      id="featured-icons"
      variant="cream"
      eyebrow={FEATURED_ICONS.eyebrow}
      title={FEATURED_ICONS.title}
      kicker={FEATURED_ICONS.kicker}
      action={FEATURED_ICONS.action}
      containerClassName="relative"
    >
      {/* Carousel */}
      <div className="relative">
        {/* Faded edges to hint scroll */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bekasi-cream to-transparent z-10 pointer-events-none" />
        <div aria-hidden className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bekasi-cream to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden -mx-1" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {FEATURED_ICONS.items.map((item, i) => (
              <div
                key={item.title}
                className="pl-4 first:pl-1 flex-[0_0_88%] sm:flex-[0_0_56%] md:flex-[0_0_44%] lg:flex-[0_0_31%] xl:flex-[0_0_26%]"
              >
                <LandmarkCard3D item={item} index={i + 1} variant="cream" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous landmarks"
            className={cn(
              'h-11 w-11 rounded-full border border-bekasi-emerald-900/15 flex items-center justify-center transition-all',
              canPrev ? 'text-bekasi-emerald-900 hover:bg-bekasi-emerald-900 hover:text-bekasi-gold-400 hover:border-bekasi-emerald-900' : 'text-bekasi-ink/30 cursor-not-allowed',
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next landmarks"
            className={cn(
              'h-11 w-11 rounded-full border border-bekasi-emerald-900/15 flex items-center justify-center transition-all',
              canNext ? 'text-bekasi-emerald-900 hover:bg-bekasi-emerald-900 hover:text-bekasi-gold-400 hover:border-bekasi-emerald-900' : 'text-bekasi-ink/30 cursor-not-allowed',
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress track */}
        <div className="flex-1 max-w-md flex items-center gap-3">
          <span className="font-mono text-xs text-bekasi-ink/50">
            {String(selectedIdx + 1).padStart(2, '0')}
          </span>
          <div className="relative h-px flex-1 bg-bekasi-emerald-900/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-bekasi-emerald-900 transition-all duration-500 ease-out"
              style={{ width: `${snaps.length ? ((selectedIdx + 1) / snaps.length) * 100 : 0}%` }}
            />
          </div>
          <span className="font-mono text-xs text-bekasi-ink/50">
            {String(snaps.length || FEATURED_ICONS.items.length).padStart(2, '0')}
          </span>
        </div>

        <Link
          href={FEATURED_ICONS.action.href}
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-bekasi-emerald-900 hover:text-bekasi-emerald-700 whitespace-nowrap"
        >
          {FEATURED_ICONS.action.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  )
}
