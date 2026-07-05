PROMPT PACK OPERASIONAL — ANTIGRAVITY PHASE
Gunakan ini setelah:
• project dari Emergent sudah jadi
• sudah dipush ke GitHub
• sudah diclone ke Antigravity
Urutan besar pemakaian di Antigravity

1. Refactor architecture
2. Harden homepage
3. Harden CMS
4. Harden Smart Planner
5. Harden Maps
6. Optimize performance
7. Improve SEO/content
8. Unify design system
9. Prepare deployment
10. Final polish

---

A-01 — Refactor Monorepo / Architecture
Refactor the BekasiGo project architecture for long-term maintainability.

Goals:

- improve folder structure
- separate concerns more clearly
- reduce duplication
- prepare for scalable public site + CMS + planner + maps + backend integration
- keep existing product vision intact

Focus on:

- shared UI components
- domain-level modules
- shared design tokens
- clearer separation of public, admin, planner, and map logic

---

A-02 — Refactor Homepage into Section Modules
Refactor the BekasiGo homepage into production-ready modular section components.

Requirements:

- each homepage section should be isolated
- support CMS-driven content more cleanly
- improve maintainability
- preserve immersive DMO experience
- improve video and heavy-media handling

---

A-03 — CMS Data Layer Cleanup
Refine the BekasiGo CMS data layer.

Goals:

- cleaner form state handling
- cleaner Supabase integration
- better draft/publish handling
- reusable form sections
- better media assignment with Cloudinary URLs
- more consistent content management across destinations, events, stories, and blogs

---

A-04 — Planner Pipeline Hardening
Refine the Smart Planner pipeline for BekasiGo.

Goals:

- improve frontend-to-backend request flow
- improve structured prompt assembly for Gemini
- improve output normalization
- improve refinement behavior
- improve save/download flow after Google login
- keep planner grounded on internal data

---

A-05 — Planner UI Refinement
Refine the BekasiGo Smart Planner UI.

Goals:

- make it clearer and more premium
- improve timeline readability
- improve result hierarchy
- improve refinement prompt usability
- improve visual connection between results and map
- keep it easy for first-time users

---

A-06 — Maps Integration Hardening
Improve the Explore Map and planner map integrations.

Goals:

- improve marker logic
- improve filter behavior
- improve preview card coordination
- improve mobile responsiveness
- support planner-linked route visualization better
- keep the map light and usable

---

A-07 — Public Page Refinement
Refine the public pages of BekasiGo.

Pages:

- Discover Bekasi
- Destinations
- Destination detail
- Events
- Event detail
- Stories
- Story detail
- Blog
- Blog detail

Goals:

- improve hierarchy
- improve related content linking
- improve practical info presentation
- improve tourism usefulness

---

A-08 — Performance Optimization
Optimize BekasiGo performance.

Focus on:

- hero video strategy
- image loading
- lazy loading
- route splitting
- animation overhead reduction
- mobile performance
- preserving immersive quality without making the experience heavy

---

A-09 — SEO + Editorial Quality Pass
Improve SEO and editorial structure across BekasiGo.

Requirements:

- better metadata handling
- stronger heading hierarchy
- internal links between destinations, events, stories, blogs, planner, and map
- blog optimization
- story readability
- destination detail SEO support

---

A-10 — Design Consistency Pass
Unify BekasiGo’s design language across public site, CMS, Smart Planner, and Explore Map.

Goals:

- consistent typography
- consistent spacing
- consistent buttons, tags, pills, cards, inputs, panels
- immersive public UI
- utilitarian CMS UI
- strong brand consistency

---

A-11 — Deployment Readiness
Prepare BekasiGo for production deployment.

Checklist:

- environment variables cleanup
- Supabase config cleanup
- Gemini API config safety
- Google Maps API key handling
- Cloudinary config handling
- Vercel frontend readiness
- separate FastAPI backend readiness

---

A-12 — Final Competition Polish
Polish BekasiGo into a competition-ready digital city destination platform.

Focus on:

- memorable homepage
- convincing Smart Planner demo
- convincing map utility
- strong CMS operations feel
- strong stories/blog differentiation
- smooth responsive behavior
- strong overall DMO identity

---

Rekomendasi pemakaian paling praktis
Saat di Emergent
Kalau Anda ingin cepat lihat hasil dulu, minimal jalankan:
• E-01
• E-03
• E-04
• E-23
• E-24
• E-33
• E-34
• E-35
Lalu lanjut bertahap.
Saat di Antigravity
Mulai dari:
• A-01
• A-02
• A-03
• A-04
Baru setelah itu:
• A-08
• A-09
• A-10
• A-11
• A-12

---

Saran penting
Agar hasil AI lebih stabil:
• pakai prompt satu per satu
• jangan gabung terlalu banyak modul dalam satu run
• setelah tiap hasil jadi, cek dulu sebelum lanjut prompt berikutnya
• simpan checkpoint di GitHub sebelum pindah ke Antigravity
