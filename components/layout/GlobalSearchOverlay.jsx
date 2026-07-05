'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Calendar, BookOpen, Sparkles, ArrowRight } from 'lucide-react'
import { DESTINATIONS } from '@/lib/content/destinations'
import { EVENTS } from '@/lib/content/events'
import { BLOG_POSTS } from '@/lib/content/blog'

import { logEvent } from '@/lib/analytics'

export default function GlobalSearchOverlay({ isOpen, onClose }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
      logEvent('search_opened')
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Track search query input (debounced tracker)
  useEffect(() => {
    if (!query) return
    const timer = setTimeout(() => {
      logEvent('search_triggered', { query })
    }, 1000)
    return () => clearTimeout(timer)
  }, [query])

  // Typo-tolerant simple distance match for keywords
  const searchFilter = (items, q, fields) => {
    if (!q) return []
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
    return items.filter(item => {
      return tokens.every(token => {
        return fields.some(field => {
          const val = item[field]
          if (!val) return false
          if (Array.isArray(val)) {
            return val.some(t => String(t).toLowerCase().includes(token))
          }
          return String(val).toLowerCase().includes(token)
        })
      })
    })
  }

  const results = {
    destinations: searchFilter(DESTINATIONS, query, ['title', 'excerpt', 'category', 'district', 'tags']).slice(0, 4),
    events: searchFilter(EVENTS, query, ['title', 'excerpt', 'category', 'tags']).slice(0, 4),
    posts: searchFilter(BLOG_POSTS, query, ['title', 'excerpt', 'tags']).slice(0, 4)
  }

  const totalResults = results.destinations.length + results.events.length + results.posts.length

  const handleNavigate = (href) => {
    onClose()
    setQuery('')
    router.push(href)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bekasi-emerald-950/80 backdrop-blur-md"
          />

          {/* Search Box Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-4xl mx-auto mt-16 md:mt-24 px-4"
          >
            <div className="bg-bekasi-emerald-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-white">
              {/* Header Input */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <Search className="h-5 w-5 text-white/50 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, events, or stories..."
                  className="w-full bg-transparent text-lg placeholder:text-white/40 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-white/60" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-3 py-1 text-xs border border-white/20 rounded-full hover:bg-white/10 transition-colors text-white/80"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results Panel */}
              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-8">
                {query === '' ? (
                  <div className="py-8 text-center text-white/60 space-y-4">
                    <Sparkles className="h-8 w-8 text-bekasi-gold-400 mx-auto animate-pulse" />
                    <p className="text-sm font-medium">Discover places, cultural events, or stories from Kota Bekasi</p>
                    <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto pt-2">
                      {['Hok Lay Kiong', 'Gedung Juang', 'Kranggan', 'Galaxy', 'Kuliner'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : totalResults === 0 ? (
                  <div className="py-12 text-center text-white/60">
                    <p className="text-base font-semibold">No results found for &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-white/45 mt-1">Try refining your keyword or searching for something else.</p>
                  </div>
                ) : (
                  <>
                    {/* Destinations Section */}
                    {results.destinations.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold tracking-wider text-bekasi-gold-400 uppercase flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" /> Destinations
                        </h3>
                        <div className="grid gap-2">
                          {results.destinations.map(d => (
                            <button
                              key={d.id}
                              onClick={() => handleNavigate(`/destinations/${d.slug}`)}
                              className="flex items-start text-left gap-4 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/5 group"
                            >
                              {d.image && (
                                <img
                                  src={d.image}
                                  alt={d.title}
                                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                                />
                              )}
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-semibold text-sm group-hover:text-bekasi-gold-400 transition-colors flex items-center gap-1.5">
                                  {d.title}
                                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                                </h4>
                                <p className="text-xs text-white/60 line-clamp-1">{d.excerpt}</p>
                                <span className="inline-block text-[10px] bg-bekasi-gold-500/20 text-bekasi-gold-400 px-2 py-0.5 rounded-full font-medium mt-1">
                                  {d.category} · {d.district}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Events Section */}
                    {results.events.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold tracking-wider text-bekasi-gold-400 uppercase flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" /> Events
                        </h3>
                        <div className="grid gap-2">
                          {results.events.map(e => (
                            <button
                              key={e.id}
                              onClick={() => handleNavigate(`/events/${e.slug}`)}
                              className="flex items-start text-left gap-4 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/5 group"
                            >
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-semibold text-sm group-hover:text-bekasi-gold-400 transition-colors flex items-center gap-1.5">
                                  {e.title}
                                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                                </h4>
                                <p className="text-xs text-white/60 line-clamp-1">{e.excerpt}</p>
                                <span className="inline-block text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full font-medium mt-1">
                                  {e.category} · {e.venue?.name}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Blog Section */}
                    {results.posts.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold tracking-wider text-bekasi-gold-400 uppercase flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5" /> Stories & Blog
                        </h3>
                        <div className="grid gap-2">
                          {results.posts.map(p => (
                            <button
                              key={p.slug}
                              onClick={() => handleNavigate(`/blog/${p.slug}`)}
                              className="flex items-start text-left gap-4 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/5 group"
                            >
                              <div className="space-y-0.5 min-w-0">
                                <h4 className="font-semibold text-sm group-hover:text-bekasi-gold-400 transition-colors flex items-center gap-1.5">
                                  {p.title}
                                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                                </h4>
                                <p className="text-xs text-white/60 line-clamp-1">{p.excerpt}</p>
                                <div className="flex gap-1.5 mt-1">
                                  {p.tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="inline-block text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full font-medium">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
