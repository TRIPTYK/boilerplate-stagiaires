<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version Change: NEW → 1.0.0 (Initial adoption)

Modified Principles: N/A (Initial creation)

Added Sections:
  - I. Code Quality & Maintainability
  - II. Testing Standards (NON-NEGOTIABLE)
  - III. User Experience Consistency
  - IV. Performance Requirements
  - Development Workflow & Quality Gates
  - Technology Stack Constraints

Removed Sections: N/A (Initial creation)

Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section ready for gates
  ✅ spec-template.md - Aligned with user story prioritization and acceptance criteria
  ✅ tasks-template.md - Test-first workflow and user story organization compatible
  ⚠️  No command files found in .specify/templates/commands/ - may need creation

Follow-up TODOs: None - all placeholders filled

Project Context: Ember.js v6.9 monorepo with TypeScript, Vite, and pnpm workspaces
Architecture: front-app (Ember application) + libs/ui (v2 addon library)
================================================================================
-->

# Ember Boilerplate v2 Constitution

## Core Principles

### I. Code Quality & Maintainability

**All code MUST be maintainable, type-safe, and follow Ember conventions:**

- **TypeScript Required**: All new code MUST be written in TypeScript with strict type checking enabled
- **Component Architecture**: Components MUST use Glimmer components with template-tag format (`.gts`)
- **Linting Compliance**: Code MUST pass ESLint, Stylelint, and ember-template-lint without warnings
- **Formatting Standards**: Code MUST be formatted with Prettier before commit
- **Type Safety**: No use of `any` type without explicit justification and TODO comment
- **Accessibility**: All interactive elements MUST be keyboard accessible and screen-reader friendly

**Rationale**: TypeScript catches bugs at compile time, reducing runtime errors. Consistent formatting and linting enable faster code reviews and prevent style debates. Accessibility is a legal requirement and improves UX for all users.

---

### II. Testing Standards (NON-NEGOTIABLE)

**Test-driven development with comprehensive coverage:**

- **Test-First Workflow**: For new features, tests MUST be written → approved → fail → then implement (Red-Green-Refactor)
- **Component Tests Required**: Every component in `libs/ui` MUST have integration tests validating rendering and user interaction
- **Application Tests**: Critical user journeys in `front-app` MUST have integration tests
- **Test Organization**: Tests MUST be located adjacent to implementation (`tests/integration/components/` for component tests)
- **Coverage Baseline**: New code MUST not decrease overall test coverage
- **QUnit & Testing Library**: Use QUnit with `@ember/test-helpers` and `qunit-dom` for assertions

**Rationale**: Test-first development prevents regressions, documents expected behavior, and enables confident refactoring. Integration tests validate real user interactions rather than implementation details.

---

### III. User Experience Consistency

**Deliver predictable, polished experiences across all features:**

- **Design System Compliance**: All UI components in `libs/ui` MUST follow a documented design system with consistent spacing, colors, typography
- **Loading States**: All async operations MUST show loading indicators within 100ms
- **Error Handling**: All user-facing errors MUST provide actionable guidance, not technical stack traces
- **Responsive Design**: All interfaces MUST work on mobile (320px), tablet (768px), and desktop (1440px+) viewports
- **Performance Budget**: Initial page load MUST complete in <3s on 3G networks; interactions MUST respond in <100ms
- **Progressive Enhancement**: Core functionality MUST work without JavaScript where feasible

**Rationale**: Consistency reduces cognitive load and improves perceived quality. Clear error messages and loading states build trust. Performance directly impacts conversion rates and user satisfaction.

---

### IV. Performance Requirements

**Optimize for speed, efficiency, and scalability:**

- **Bundle Size Limits**: Initial JS bundle MUST be <300KB gzipped; total JS <1MB gzipped
- **Code Splitting**: Routes MUST be lazy-loaded; shared dependencies extracted to vendor bundle
- **Asset Optimization**: Images MUST be optimized (WebP/AVIF); CSS MUST be purged of unused rules
- **Runtime Performance**: Component render time MUST be <16ms (60fps); no blocking operations on main thread >50ms
- **Lighthouse Scores**: Production builds MUST achieve Performance ≥90, Accessibility ≥95, Best Practices ≥90
- **Monitoring**: Performance regressions caught by automated Lighthouse CI on every PR

**Rationale**: Performance is a feature. Slow applications lose users. Bundle size directly impacts load time. 60fps rendering ensures smooth interactions. Automated monitoring prevents degradation over time.

---

## Development Workflow & Quality Gates

**All code changes MUST pass these gates before merge:**

### Pre-Commit Gates
1. **Linting**: `pnpm lint` passes with zero errors and zero warnings
2. **Type Checking**: `pnpm lint:types` passes with zero errors
3. **Formatting**: Code formatted via `pnpm format`

### Pre-Merge Gates
1. **Tests Pass**: `pnpm test` completes with 100% pass rate
2. **Build Succeeds**: `pnpm build` completes without errors for both `front-app` and `libs/ui`
3. **Code Review**: At least one approval from team member familiar with modified area
4. **No Regressions**: Visual regression tests pass (if applicable)

### Branch Strategy
- **Feature Branches**: `###-feature-name` format from specs (e.g., `001-authentication`)
- **Commits**: Conventional commits format (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`)
- **PR Description**: Link to spec in `.specify/specs/###-feature-name/`, list completed user stories

---

## Technology Stack Constraints

**Required Technologies (MUST use):**

- **Framework**: Ember.js v6.9+ (Octane edition)
- **Build Tool**: Vite v7+ with Embroider
- **Language**: TypeScript v5.9+
- **Package Manager**: pnpm v10+ with workspace support
- **Testing**: QUnit, ember-qunit, @ember/test-helpers
- **Linting**: ESLint v9+, ember-template-lint v7+, Stylelint v16+
- **State Management**: Ember Data v5.6+ for backend integration; tracked properties for local state
- **Component Format**: `.gts` template-tag format for new components

**Prohibited Patterns (MUST NOT use):**

- Classic Ember components (`@ember/component`)
- Mixins (use composition and services instead)
- `any` type without justification
- Inline styles (use CSS modules or component-scoped styles)
- Direct DOM manipulation (use modifiers and `@ember/test-helpers`)

**Justification Required For:**

- New dependencies (must justify bundle size impact, maintenance burden, alternative evaluation)
- Deviating from Ember conventions (must document why convention doesn't fit)
- Complex state management beyond tracked properties and Ember Data

---

## Governance

**This constitution supersedes all other development practices. Changes to this document require:**

1. **Proposal**: Written rationale for amendment including impact analysis
2. **Review**: Team discussion and consensus
3. **Migration Plan**: Path for bringing existing code into compliance (if applicable)
4. **Documentation**: Update to templates in `.specify/templates/` reflecting changes

**Compliance Enforcement:**

- All PRs MUST be reviewed against these principles
- Violations MUST be flagged in review with reference to specific principle
- Complexity exceptions MUST be documented in `plan.md` Complexity Tracking section
- Constitution violations that aren't justified = PR blocked

**Runtime Development Guidance:**

- Use `.specify/templates/spec-template.md` for feature specifications
- Use `.specify/templates/plan-template.md` for implementation planning
- Use `.specify/templates/tasks-template.md` for task breakdowns
- All specs stored in `.specify/specs/###-feature-name/`

---

**Version**: 1.0.0 | **Ratified**: 2026-01-14 | **Last Amended**: 2026-01-14
