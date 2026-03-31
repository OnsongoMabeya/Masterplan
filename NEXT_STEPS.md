# Next Steps to Complete Implementation

## What's Been Completed ✅

1. **JavaScript Functions** - All HTML functions replicated (ph, ts, updateCounts, doSearch, switchTabById)
2. **Home Tab** - Fully rebuilt with all 4 sections matching HTML spec
3. **CSS Foundation** - All component styles in place

## What Remains 🚧

### Critical Path (Must Complete)

#### 1. Task Seed File Completion (~8-10 hours)

**Current**: ~50 tasks in seed file  
**Target**: ~180-200 tasks from HTML

**Approach**: Extract systematically by domain from HTML:

- Career: ~25 tasks (5 phases from HTML lines 555-685)
- Health: ~15 tasks (3 phases from HTML lines 700-735)
- Finance: ~18 tasks (3 phases from HTML lines 747-777)
- Family: ~6 tasks (HTML lines 788-799)
- Faith: ~6 tasks (HTML lines 812-820)
- Music: ~8 tasks (HTML lines 833-847)
- Community: ~6 tasks (HTML lines 861-867)
- Habits: ~40 tasks (most detailed, HTML lines 883-1050+)
- Risk: ~10 tasks
- Relationships: ~4 tasks (HTML lines 1118-1124)
- Identity: Content is informational (cards, not tasks)
- Vision: Content is informational (timeline, not tasks)
- Review: Handled separately

**File**: `backend/database/seeds/001_tasks.js`

#### 2. Domain Tab Renderers (~4-6 hours)

Once tasks are seeded, update domain tab files to:

- Fetch tasks from database by domain
- Group by phase
- Render with search functionality
- Include callouts, milestones from HTML
- Add domain-specific content (KPI grids, tables, code blocks)

**Files**: `frontend/src/features/{domain}/{domain}.js` for each domain

#### 3. Reviews Tab (~2 hours)

- 4 review type tabs (Weekly/Monthly/Quarterly/Annual)
- Pre-filled question forms for each type
- Past reviews list
- Questions from spec lines 976-1007

**File**: `frontend/src/features/review/review.js`

#### 4. Service Worker (~3 hours)

- Workbox configuration
- Cache strategies
- Background sync
- Offline fallback

**File**: `frontend/src/sw.js` + Vite config updates

### Phase 2 Features (~5-6 hours)

1. **Offline Banner** - Online/offline detection with banner
2. **Install Prompt** - Visit tracking, custom prompt
3. **Client Quarter Helper** - Mirror backend utils
4. **In-Memory Store** - Cache for tasks/progress
5. **Auth & PWA CSS** - PIN screen, install prompt styles
6. **Seed Run Script** - Prevent duplicate seeding
7. **Complete README** - Setup, deployment, tech stack

## Recommended Execution Order

### Session 1: Foundation (Current)

1. ✅ JS functions
2. ✅ Home tab
3. **Next**: Start task extraction (Career, Health, Finance first)

### Session 2: Core Content

1. Complete task seed file (all domains)
2. Update domain tab renderers
3. Test task rendering and toggle functionality

### Session 3: Completion

1. Reviews tab
2. Service worker
3. Phase 2 features
4. Final testing and verification

## Files to Modify

### Backend

- `backend/database/seeds/001_tasks.js` - Add ~130 more tasks
- `backend/database/seeds/run-seed.js` - Create seed runner

### Frontend

- `frontend/src/features/{domain}/{domain}.js` - 14 domain tab files
- `frontend/src/features/review/review.js` - Complete reviews
- `frontend/src/sw.js` - Service worker
- `frontend/src/shared/offline-banner.js` - New file
- `frontend/src/shared/quarter.js` - New file
- `frontend/src/shared/store.js` - New file
- `frontend/src/styles/auth.css` - New file
- `frontend/src/styles/pwa.css` - New file

### Documentation

- `README.md` - Complete documentation

## Success Criteria

- [ ] All ~180-200 tasks seeded correctly
- [ ] All 14 domain tabs render exact HTML content
- [ ] Task toggle works with backend sync
- [ ] Search works per tab
- [ ] Reviews tab functional
- [ ] Service worker caches correctly
- [ ] App works offline
- [ ] Install prompt appears after 3 visits
- [ ] README complete with setup instructions

## Current Status

**Completion**: ~25% (Foundation complete, content extraction in progress)  
**Estimated Remaining**: 25-30 hours focused work  
**Next Action**: Continue task extraction from HTML into seed file
