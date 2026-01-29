<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version Change: 1.0.0 → 1.1.0 (MINOR: Expanded guidance & codebase-specific patterns)

Modified Principles:
  - I. Code Quality → Added Zod validation, Page Objects, i18n requirements
  - II. Testing Standards → Expanded with Vitest, Playwright, MSW, specific test patterns
  - III. User Experience → Added TripTyk component library, ember-cli-flash, i18n
  - IV. Performance → Added Turbo monorepo, MSW for dev performance

Added Sections:
  - Monorepo Architecture (workspace structure)
  - Library Development Standards (v2 addon guidance)
  - Form Validation & State Management (Zod + Changesets + Immer)

Removed Sections: None

Templates Requiring Updates:
  ✅ plan-template.md - Updated Constitution Check with v1.1.0 requirements (Vitest, Playwright, MSW, TripTyk, Zod, etc.)
  ✅ spec-template.md - Added constitution version reference in header
  ✅ tasks-template.md - Updated with Ember/TypeScript patterns, mandatory tests, MSW, Page Objects
  ✅ agent-file-template.md - No changes needed (derives from plan.md)
  ✅ checklist-template.md - No changes needed (context-specific generation)
  ✅ No command files exist in .specify/templates/commands/ - none needed at this time

Follow-up TODOs: None - all principles derived from actual codebase

Codebase Evidence:
  - TypeScript strict mode: tsconfig.json in all packages
  - Vitest testing: libs/users/tests/**/*-test.gts + front-app/tests/
  - Playwright E2E: front-app/e2e/users-dashboard.spec.ts
  - TripTyk components: @triptyk/ember-ui, @triptyk/ember-input*
  - Zod validation: components/forms/*-validation.ts
  - MSW mocking: libs/users/http-mocks/*.ts
  - Monorepo: pnpm-workspace.yaml + turbo.json
  - i18n: ember-intl in all user-facing text
================================================================================
-->

# Ember Boilerplate v2 Constitution

## Core Principles

### I. Code Quality & Maintainability

**All code MUST be maintainable, type-safe, and follow Ember conventions:**

- **TypeScript Strict Mode**: All packages MUST use TypeScript v5.9+ with strict checking (`tsconfig.json` with `strict: true`)
- **Component Architecture**: Components MUST use Glimmer components with template-tag format (`.gts` files)
- **Linting Compliance**: Code MUST pass ESLint v9+, ember-template-lint v7+, and Stylelint v16+ with zero errors and zero warnings
- **Formatting Standards**: Code MUST be formatted with Prettier (using `prettier-plugin-ember-template-tag`) via `pnpm format` before commit
- **Type Safety**: No use of `any` type without explicit justification comment; prefer `unknown` and narrow with type guards
- **Accessibility**: All interactive elements MUST be keyboard accessible and screen-reader friendly (use semantic HTML and ARIA attributes)
- **Validation Schema**: All forms MUST use Zod schemas for runtime validation (see `components/forms/*-validation.ts` pattern)
- **Page Objects**: All components with user interactions MUST export a `pageObject` for testing reusability
- **Internationalization**: All user-facing text MUST use ember-intl translations—no hardcoded strings

**Rationale**: TypeScript strict mode catches bugs at compile time. Template-tag format enables co-location and type inference. Zod provides runtime type safety at API boundaries. Page Objects reduce test duplication and improve maintainability. i18n enables global reach without code changes.

---

### II. Testing Standards (NON-NEGOTIABLE)

**Test-driven development with comprehensive coverage across unit, integration, and E2E:**

- **Test-First Workflow**: For new features, tests MUST be written → approved → fail → then implement (Red-Green-Refactor)
- **Test Framework**: Use Vitest v4+ with `ember-vitest` for unit/integration tests; Playwright for E2E tests
- **Component Tests Required**: Every component in `libs/*` MUST have integration tests in `tests/integration/` validating rendering and user interaction
- **E2E Tests Required**: Critical user journeys in `front-app` MUST have Playwright tests in `e2e/` directory
- **Test Organization**: Tests MUST mirror source structure (`libs/users/tests/integration/login-form-test.gts` for `libs/users/src/components/forms/login-form.gts`)
- **Page Objects**: Tests MUST use component-exported page objects for interactions (avoid low-level selectors in tests)
- **Mocking Strategy**: Use MSW (Mock Service Worker) for HTTP mocking in `http-mocks/*.ts`; use Vitest `vi.mock()` for service/dependency mocking
- **Soft Assertions**: Integration tests MUST use `expect.soft` to collect all failures before reporting
- **Coverage Baseline**: New code MUST not decrease overall test coverage
- **Test Helpers**: Use `@ember/test-helpers` (`render`, `click`, `fillIn`) for Ember integration tests; use Playwright APIs for E2E

**Rationale**: Test-first development prevents regressions and documents expected behavior. Vitest offers fast execution with browser mode. Playwright enables reliable cross-browser E2E testing. MSW keeps tests deterministic without real backend deps. Page Objects abstract interaction details and improve test readability.

---

### III. User Experience Consistency

**Deliver predictable, polished experiences across all features:**

- **Design System Compliance**: All UI MUST use TripTyk component library (`@triptyk/ember-ui`, `@triptyk/ember-input`, `@triptyk/ember-input-validation`)—check `node_modules/@triptyk/*/llm.txt` for usage guidance
- **Form Components**: Use `TpkForm` with prefabs (`TpkInputPrefab`, `TpkEmailPrefab`, `TpkPasswordPrefab`) for consistent form UX
- **Validation Feedback**: Forms MUST show inline validation errors using TpkForm's `@validationSchema` integration with Zod
- **Loading States**: All async operations MUST show loading indicators within 100ms (use `ember-concurrency` tasks)
- **Error Handling**: Use `ember-cli-flash` for user-facing success/error messages with actionable guidance—no raw error stack traces
- **Responsive Design**: All interfaces MUST work on mobile (320px), tablet (768px), and desktop (1440px+) viewports using Tailwind CSS v4+
- **Styling Framework**: Use Tailwind CSS v4+ with DaisyUI v5+ for utilities and component classes
- **Internationalization**: All user-facing text MUST be translated via `ember-intl` with translations in `translations/` directory
- **Performance Budget**: Initial page load MUST complete in <3s on 3G networks; interactions MUST respond in <100ms

**Rationale**: TripTyk component library ensures visual consistency and reduces custom UI code. `ember-cli-flash` provides standardized user feedback. Zod validation with TpkForm gives instant validation feedback. Tailwind enables rapid responsive development. ember-intl separates content from code, enabling localization without refactoring.

---

### IV. Performance Requirements

**Optimize for speed, efficiency, and scalability:**

- **Bundle Size Limits**: Initial JS bundle MUST be <300KB gzipped; total JS <1MB gzipped (enforce via Vite build analysis)
- **Build Tool**: Use Vite v7+ with Embroider v4+ for fast builds and optimized output
- **Code Splitting**: Routes MUST be lazy-loaded via Embroider's automatic route splitting
- **Monorepo Performance**: Use Turbo v2+ for parallel builds and caching (`pnpm turbo build`)
- **Development Performance**: Use MSW for instant local development without backend dependencies (see `http-mocks/` pattern)
- **Asset Optimization**: Images MUST be optimized (WebP/AVIF); Tailwind CSS MUST be configured for production purging
- **Runtime Performance**: Component render time MUST be <16ms (60fps); no blocking operations on main thread >50ms
- **State Management**: Use `tracked-built-ins` for reactive arrays/objects; use `ember-immer-changeset` for form state (immutable updates)
- **Lighthouse Scores**: Production builds MUST achieve Performance ≥90, Accessibility ≥95, Best Practices ≥90
- **Monitoring**: Performance regressions caught by automated Lighthouse CI on every PR (Playwright integration)

**Rationale**: Vite provides near-instant dev server start and HMR. Turbo caches build outputs across CI and local dev. MSW eliminates backend wait time during development. Embroider's modern build pipeline produces smaller bundles. Immutable state (Immer) prevents accidental mutations. Lighthouse CI catches performance regressions before production.

---

## Monorepo Architecture

**Workspace structure MUST follow this organization:**

```
ember-boilerplate-v2/
├── front-app/              # Main Ember application
├── backend-app/            # Node.js API (OpenAPI types)
└── libs/                   # Shared v2 addons
    ├── users/              # User management addon
    ├── utils/              # Utility functions
    └── [feature]/          # Feature-specific addons
```

**Library Development Rules:**

- All libraries in `libs/*` MUST be v2 Ember addons (using `ember-cli-babel` and `rollup.config.mjs`)
- Libraries MUST export TypeScript declarations in `declarations/` directory
- Libraries MUST have independent `package.json`, `tsconfig.json`, `vite.config.mts`
- Libraries MUST be testable in isolation (`pnpm test` from library directory)
- Libraries MUST use `src/` for source code, `dist-tests/` for compiled tests
- Libraries MUST define exports in `index.ts` with `forRouter()`, `authRoutes()`, `initialize()` integration points
- Source packing: Libraries SHOULD maintain `library-pack.txt` via `pack-src.js` for LLM context (see `.github/instructions/library.instructions.md`)
- **AI Development**: When working in a library, refer to `library-pack.txt` at repository root for code examples and established patterns

**Workspace Commands:**

- `pnpm install` - Install all workspace dependencies
- `pnpm lint` - Lint all packages
- `pnpm test` - Run all test suites (Vitest + Playwright)
- `pnpm turbo build` - Build all packages in parallel
- `pnpm start` (in front-app) - Start dev server with live library rebuilds via Turbo watch mode

---

## Form Validation & State Management

**All forms MUST follow this pattern:**

1. **Validation Schema**: Define Zod schema in `components/forms/*-validation.ts`:
   ```typescript
   export const UserValidationSchema = object({
     firstName: string().min(1, "First name is required"),
     email: email("Invalid email address"),
   });
   export type ValidatedUser = z.infer<typeof UserValidationSchema>;
   ```

2. **Changeset**: Use `ember-immer-changeset` for immutable form state:
   ```typescript
   import ImmerChangeset from 'ember-immer-changeset';
   export class UserChangeset extends ImmerChangeset<DraftUser> {}
   ```

3. **Form Component**: Use `TpkForm` with validation schema and changeset:
   ```gts
   <TpkForm
     @changeset={{@changeset}}
     @onSubmit={{this.onSubmit}}
     @validationSchema={{this.validationSchema}}
   as |F|>
     <F.TpkInputPrefab @label="First Name" @validationField="firstName" />
   </TpkForm>
   ```

4. **Submit Handler**: Re-validate with schema before service call:
   ```typescript
   onSubmit = async () => {
     const data = await UserValidationSchema.parseAsync(this.args.changeset.data);
     await this.user.save(data);
   }
   ```

**Rationale**: Zod schemas provide single source of truth for validation. Immer ensures immutable updates (prevents accidental state mutations). TpkForm integrates schema validation with UI feedback. Re-validation in submit handler prevents race conditions with async validation.

---

## Development Workflow & Quality Gates

**All code changes MUST pass these gates before merge:**

### Pre-Commit Gates
1. **Linting**: `pnpm lint` passes with zero errors and zero warnings
2. **Type Checking**: `pnpm lint:types` (ember-tsc) passes with zero errors
3. **Formatting**: Code formatted via `pnpm format` (Prettier with ember-template-tag plugin)

### Pre-Merge Gates
1. **Tests Pass**: `pnpm test` (Vitest) and `pnpm test:playwright` (E2E) complete with 100% pass rate
2. **Build Succeeds**: `pnpm turbo build` completes without errors for all packages
3. **Code Review**: At least one approval from team member familiar with modified area
4. **No Type Errors**: `pnpm lint:types` in all affected packages passes
5. **No Regressions**: Playwright tests covering critical user journeys pass

### Branch Strategy
- **Feature Branches**: `###-feature-name` format from specs (e.g., `001-user-authentication`)
- **Commits**: Conventional commits format (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`)
- **PR Description**: Link to spec in `.specify/specs/###-feature-name/spec.md`, list completed user stories

### Local Development Workflow
1. `pnpm install` - Ensure dependencies up-to-date
2. `pnpm start` (in front-app) - Starts Vite dev server (port 4200) with Turbo watch mode for library changes
3. `pnpm test` - Run tests in watch mode during development
4. `pnpm lint:fix` - Auto-fix linting and formatting issues before commit

---

## Technology Stack Constraints

**Required Technologies (MUST use):**

- **Framework**: Ember.js v6.10+ (Octane edition)
- **Build Tool**: Vite v7+ with Embroider v4+ and `@embroider/vite`
- **Language**: TypeScript v5.9+ with strict mode enabled
- **Package Manager**: pnpm v10+ with workspace support (`pnpm-workspace.yaml`)
- **Monorepo Tool**: Turbo v2+ for build caching and parallelization
- **Testing (Unit/Integration)**: Vitest v4+ with `ember-vitest` and `@vitest/browser-playwright`
- **Testing (E2E)**: Playwright v1.58+
- **Linting**: ESLint v9+, ember-template-lint v7+, Stylelint v16+
- **State Management**: `@warp-drive/core` (Ember Data 5.8+) for API integration; `tracked-built-ins` for local state
- **Form State**: `ember-immer-changeset` for immutable form state management
- **Validation**: Zod v4+ for schema validation
- **HTTP Mocking**: MSW v2+ with `openapi-msw` for type-safe mocks
- **Component Library**: `@triptyk/ember-ui`, `@triptyk/ember-input`, `@triptyk/ember-input-validation`
- **Styling**: Tailwind CSS v4+ with DaisyUI v5+
- **Internationalization**: ember-intl v8+
- **Component Format**: `.gts` template-tag format for all new components
- **Authentication**: `ember-simple-auth` v8+ with JWT token authentication

**Prohibited Patterns (MUST NOT use):**

- Classic Ember components (`@ember/component`)
- Mixins (use composition with services, helpers, or modifiers instead)
- `any` type without justification comment
- Inline styles (use Tailwind utilities or component-scoped CSS)
- Direct DOM manipulation (use `@ember/render-modifiers` or `@ember/test-helpers`)
- Hardcoded user-facing strings (use ember-intl translations)
- Manual HTTP fetch without MSW mocks (define MSW handlers in `http-mocks/`)

**Justification Required For:**

- New dependencies (must justify bundle size impact, maintenance burden, alternative evaluation, compatibility with Ember/Vite)
- Deviating from Ember conventions (must document why convention doesn't fit use case)
- Complex state management beyond tracked properties and Warp Drive (must show simpler patterns insufficient)
- Custom components when TripTyk library has equivalent (must explain why TripTyk component cannot be used)

---

## Governance

**This constitution supersedes all other development practices. Changes to this document require:**

1. **Proposal**: Written rationale for amendment including impact analysis on existing code
2. **Review**: Team discussion and consensus (all core contributors must approve)
3. **Migration Plan**: Path for bringing existing code into compliance (if applicable, with timeline and owner)
4. **Documentation**: Update to templates in `.specify/templates/` reflecting constitutional changes

**Compliance Enforcement:**

- All PRs MUST be reviewed against these principles (reviewer must explicitly check constitution alignment)
- Violations MUST be flagged in PR review with reference to specific principle section
- Complexity exceptions MUST be documented in `.specify/specs/###-feature/plan.md` Complexity Tracking section
- Constitution violations without justification = PR blocked from merge

**Runtime Development Guidance:**

- Use `.specify/templates/spec-template.md` for feature specifications (user stories + acceptance criteria)
- Use `.specify/templates/plan-template.md` for implementation planning (includes Constitution Check section)
- Use `.specify/templates/tasks-template.md` for task breakdowns (test-first workflow)
- All feature specs stored in `.specify/specs/###-feature-name/` directory
- Reference `.github/instructions/*.instructions.md` for tool-specific guidance applied by file pattern

**Version History:**

- v1.0.0 (2026-01-14): Initial constitution with core principles
- v1.1.0 (2026-01-29): Expanded with codebase-specific patterns (Vitest, Playwright, MSW, TripTyk, Zod, monorepo)

---

**Version**: 1.1.0 | **Ratified**: 2026-01-14 | **Last Amended**: 2026-01-29
