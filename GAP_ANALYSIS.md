# PWA Gap Analysis — Complete Audit Results

**Date**: Audit completed
**Specification Files**: `masterplan-ide-prompt-v3.md` + `masterplan-complete.html`

---

## ✅ ALREADY DONE — Correctly Implemented

### Backend (Fully Functional)

- ✅ Database: SQLite with better-sqlite3, Knex.js ORM
- ✅ Migrations: All 10 migrations exist and working
- ✅ Auth: PIN-based JWT authentication with bcrypt
- ✅ Metrics API: Complete CRUD with history tracking
- ✅ Quarterly API: Quarter calculations, goals management
- ✅ Tasks API: CRUD with toggle endpoint
- ✅ Progress API: Recalculation after task toggles
- ✅ Reviews API: CRUD with type filtering
- ✅ Quarter utilities: Date-to-quarter mapping functions

### Frontend (Partially Functional)

- ✅ Vite build setup with PWA plugin
- ✅ Tab structure: 17 feature folders exist
- ✅ API client: Centralized with auth headers
- ✅ Toast notifications: Working system
- ✅ Metrics tab: Category filtering, cards, editing, history
- ✅ Quarterly tab: Navigation, tasks, goals, breakdown
- ✅ CSS: Base styles, components, layout mostly complete

---

## ⚠️ EXISTS BUT BROKEN OR INCOMPLETE — Needs Fixing

### 1. **Home Tab** — Missing 4 Critical Sections

**File**: `frontend/src/features/home/home.js`

**Current state**: Only shows basic KPI grid and domain stats

**Missing sections**:

1. Current Snapshot (8 specific metric cards from spec)
2. This Week's Non-Negotiables (5 pinned tasks from habits)
3. Domain Progress Grid (clickable cards with emojis, descriptions)
4. Current Quarter Snapshot with "View Full Timetable" button

**Reference**: HTML lines 225-295

**Fix required**: Complete rebuild matching HTML exactly

---

### 2. **All 14 Domain Tabs** — Generic Renderer vs Exact Content

**Files**: `frontend/src/features/{career,health,finance,family,faith,music,community,habits,risk,relationships,identity,vision}/*.js`

**Current state**: Using generic `domainRenderer.js` with no actual content

**Problems**:

- No actual task titles, details, tags from HTML
- Missing callouts, milestones, code blocks, templates, tables
- Missing search functionality per tab
- Missing phase-specific badges and KPI grids
- Wrong initial phase states (should be first phase open)

**Fix required**: Extract every tab's content verbatim from HTML:

- **Career**: Lines 530-688 (5 phases, ~25 tasks, code blocks, resource tables)
- **Health**: Lines 694-736 (3 phases, medical checkup, C25K, race)
- **Finance**: Lines 742-778 (3 phases, budget, T-Bills, 7 streams)
- **Family**: Lines 784-801 (isolation, brotherhood, marriage)
- **Faith**: Lines 807-822 (daily altar, Bible, fasting)
- **Music**: Lines 828-850 (bass mastery, studio, income)
- **Community**: Lines 856-871 (mentorship, workshops, bootcamp)
- **Habits**: Lines 877-1050+ (full day architecture, 5 fixes)
- **Risk**: Content exists in HTML
- **Relationships**: Lines 1090-1125 (valuable/distracting/new)
- **Identity**: Lines 301-411 (Sections 1-4, 6)
- **Vision**: Lines 417-524 (Sections 5, 7)

---

### 3. **JavaScript Functions** — Not Replicated from HTML

**Reference**: HTML lines 1128-1226

**Missing functions**:

- `switchTab(id, btn)` — Currently exists but missing scroll to top
- `switchTabById(id)` — Programmatic tab switching (MISSING)
- `ph(h)` — Phase toggle with chevron rotation (MISSING)
- `ts(el, sec)` — Step toggle with count updates (MISSING)
- `updateCounts()` — Per-section and global progress (MISSING)
- `doSearch(tab, query)` — Search with phase expansion (MISSING)

**Fix required**: Implement all functions exactly as in HTML

---

### 4. **Task Seed File** — Incomplete Content

**File**: `backend/database/seeds/001_tasks.js`

**Current state**: ~136 tasks exist but don't match HTML

**Problems**:

- Task titles/details don't match HTML exactly
- Missing tags in correct format
- Missing career phase tasks with code blocks
- Missing health tasks with Nairobi context
- Missing finance tasks with KES amounts
- Total should be ~180-200 tasks

**Fix required**: Extract every task from HTML with exact text

---

### 5. **Reviews Tab** — Incomplete Implementation

**File**: `frontend/src/features/review/review.js`

**Missing**:

- Pre-filled question forms for each review type
- Weekly/Monthly/Quarterly/Annual question sets
- Review type selector tabs
- Past reviews list with expand/collapse

**Reference**: Spec lines 963-1014

---

### 6. **Service Worker** — Empty File

**File**: `frontend/src/sw.js` (0 bytes)

**Missing**:

- Workbox configuration
- CacheFirst strategy for static assets
- NetworkFirst for API calls
- Background sync for offline task toggles
- Offline fallback page

**Reference**: Spec lines 1039-1044

---

## ❌ MISSING ENTIRELY — Needs Building

### 1. **Offline Banner**

**File to create**: `frontend/src/shared/offline-banner.js`
**Spec**: Lines 1057-1062

**Requirements**:

- Listen for online/offline events
- Show amber banner when offline
- Show "Back online — syncing..." when reconnected
- Auto-dismiss after sync

---

### 2. **Install Prompt** (Incomplete)

**File exists**: `frontend/src/pwa/install.js`
**Spec**: Lines 1045-1056

**Missing**:

- Visit count tracking (`mp_visit_count`)
- Custom bottom sheet after 3rd visit
- `beforeinstallprompt` event handler
- iOS fallback with Safari instructions
- Dismiss tracking (`mp_install_dismissed`)

---

### 3. **Client-side Quarter Helper**

**File to create**: `frontend/src/shared/quarter.js`
**Spec**: Line 190

**Requirements**: Mirror backend quarter utils for client-side labels

---

### 4. **In-Memory Store**

**File to create**: `frontend/src/shared/store.js`
**Spec**: Line 186

**Requirements**: Lightweight store for tasks/progress/metrics

---

### 5. **Auth CSS**

**File to create**: `frontend/src/styles/auth.css`
**Spec**: Line 179

**Requirements**: PIN screen styling (number pad, dots, overlay)

---

### 6. **PWA CSS**

**File to create**: `frontend/src/styles/pwa.css`
**Spec**: Line 180

**Requirements**: Install prompt, offline banner, toast styles

---

### 7. **Seed Run Script**

**File to create**: `backend/database/seeds/run-seed.js`
**Spec**: Lines 89, 1078

**Requirements**:

- Check if already seeded
- Run seeds only once
- Prevent duplicates

---

### 8. **npm Scripts**

**File**: `package.json`
**Spec**: Lines 1067-1084

**Missing**: `npm run setup` (migrate + seed)

---

### 9. **Complete README**

**File exists**: `README.md` (incomplete)
**Spec**: Line 1273

**Missing**:

- Complete setup instructions
- Environment variables reference
- Deployment guide (Railway, Render)
- Tech stack overview

---

## 🔧 IMPLEMENTATION ORDER

### Phase 1: Fix Broken Implementations (Priority)

1. ✅ CSS: Add missing grid and dom-prog-row styles (DONE)
2. Implement all JS functions from HTML (ph, ts, updateCounts, doSearch)
3. Rebuild home tab with all 4 sections
4. Rebuild all 14 domain tabs with exact HTML content
5. Complete task seed file (~180-200 tasks)
6. Complete reviews tab with question forms
7. Implement service worker with Workbox

### Phase 2: Build Missing Features

1. Offline banner component
2. Complete install prompt
3. Client-side quarter helper
4. In-memory store
5. Auth and PWA CSS files
6. Seed run script
7. Complete README

---

## 📊 COMPLETION STATUS

- **Backend**: 95% complete (only seed content needs updating)
- **Frontend Infrastructure**: 80% complete
- **Frontend Content**: 20% complete (generic renderers vs exact content)
- **PWA Features**: 40% complete (manifest exists, SW empty)
- **Documentation**: 60% complete

**Estimated work remaining**: ~15-20 hours to complete all fixes and missing features

---

## 🎯 NEXT STEPS

1. Await your approval to proceed
2. Begin Phase 1 fixes in order
3. Test each fix against HTML spec
4. Move to Phase 2 builds
5. Final verification against both spec files
