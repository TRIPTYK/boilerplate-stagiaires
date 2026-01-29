# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*
*Reference: `.specify/memory/constitution.md` v1.1.0*

**Code Quality & Maintainability**
- [ ] TypeScript strict mode enabled (`tsconfig.json` with `strict: true`)
- [ ] Components use Glimmer + `.gts` template-tag format
- [ ] Linting configured (ESLint v9+, ember-template-lint v7+, Stylelint v16+)
- [ ] Prettier with `prettier-plugin-ember-template-tag` configured
- [ ] Accessibility requirements documented (keyboard nav + screen readers)
- [ ] Zod schemas defined for all form validation (`components/forms/*-validation.ts`)
- [ ] Page Objects exported for all interactive components
- [ ] All user-facing text uses ember-intl (no hardcoded strings)

**Testing Standards** *(NON-NEGOTIABLE)*
- [ ] Test-first workflow planned (tests → approval → fail → implement)
- [ ] Vitest v4+ with `ember-vitest` configured for unit/integration tests
- [ ] Playwright v1.58+ configured for E2E tests in `e2e/` directory
- [ ] Component tests planned for all library components (`libs/*/tests/integration/`)
- [ ] E2E tests planned for critical user journeys (Playwright in `front-app/e2e/`)
- [ ] MSW v2+ handlers defined for all HTTP mocking (`http-mocks/*.ts`)
- [ ] Page Objects used in tests (no low-level selector duplication)
- [ ] Integration tests use `expect.soft` for soft assertions
- [ ] Test organization mirrors source structure

**User Experience Consistency**
- [ ] TripTyk component library used (`@triptyk/ember-ui`, `@triptyk/ember-input*`)
- [ ] Forms use `TpkForm` with prefabs and Zod validation
- [ ] Loading states with `ember-concurrency` tasks (<100ms indicators)
- [ ] Error handling uses `ember-cli-flash` (no raw stack traces)
- [ ] Responsive design requirements (320px, 768px, 1440px+)
- [ ] Tailwind CSS v4+ with DaisyUI v5+ for styling
- [ ] ember-intl v8+ translations defined in `translations/` directory
- [ ] Performance budget defined (<3s initial load, <100ms interactions)

**Performance Requirements**
- [ ] Bundle size targets set (<300KB initial, <1MB total gzipped)
- [ ] Vite v7+ with Embroider v4+ build pipeline
- [ ] Turbo v2+ configured for monorepo build caching
- [ ] MSW configured for instant dev without backend (`http-mocks/`)
- [ ] Code splitting strategy (lazy routes via Embroider)
- [ ] Asset optimization plan (WebP/AVIF images, Tailwind purging)
- [ ] Runtime performance targets (<16ms render, <50ms blocking)
- [ ] State management uses `tracked-built-ins` + `ember-immer-changeset`
- [ ] Lighthouse score targets (Perf ≥90, A11y ≥95, BP ≥90)
- [ ] Playwright Lighthouse CI integration planned

**Technology Stack Compliance**
- [ ] Using Ember.js v6.10+ (Octane edition)
- [ ] Using Vite v7+ with Embroider v4+
- [ ] Using TypeScript v5.9+ with strict mode
- [ ] Using pnpm v10+ workspaces (`pnpm-workspace.yaml`)
- [ ] Using Turbo v2+ for monorepo builds (`turbo.json`)
- [ ] Using `@warp-drive/core` (Ember Data 5.8+) for API integration
- [ ] Using `ember-immer-changeset` for form state
- [ ] Using Zod v4+ for validation schemas
- [ ] Using MSW v2+ with `openapi-msw` for mocks
- [ ] Using `ember-simple-auth` v8+ for authentication
- [ ] No prohibited patterns (classic components, mixins, `any` types, inline styles, hardcoded strings)
- [ ] New dependencies justified (bundle size, maintenance, alternatives, Ember/Vite compatibility)

**Monorepo & Library Development** (if applicable)
- [ ] Library in `libs/` follows v2 addon structure
- [ ] Library has independent `package.json`, `tsconfig.json`, `vite.config.mts`
- [ ] Library exports declarations in `declarations/` directory
- [ ] Library uses `src/` for source, `dist-tests/` for compiled tests
- [ ] Library defines integration points in `index.ts` (`forRouter()`, `initialize()`)
- [ ] Turbo watch mode configured for live library rebuilds during dev
- [ ] **AI Development Note**: When implementing library code, refer to `library-pack.txt` at repository root for code examples and patterns

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
