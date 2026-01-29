---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Per constitution v1.1.0, tests are MANDATORY (NON-NEGOTIABLE) - all user stories MUST have tests written FIRST (Red-Green-Refactor).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `libs/[feature]/src/`, `libs/[feature]/tests/` for library code
- **Application**: `front-app/app/`, `front-app/tests/` for app code
- **E2E Tests**: `front-app/e2e/` for Playwright tests
- **HTTP Mocks**: `libs/[feature]/src/http-mocks/` for MSW handlers
- Paths shown below assume monorepo structure - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create projTypeScript library with v2 addon dependencies (if library feature)
- [ ] T003 [P] Configure linting (ESLint, ember-template-lint, Stylelint) and Prettier
- [ ] T004 [P] Setup Vitest configuration in `vite.config.mts`
- [ ] T005 [P] Setup Playwright configuration in `playwright.config.ts` (if E2E needed)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T006 Setup Warp Drive schema definitions (if new entities)
- [ ] T007 [P] Setup authentication/authorization integration (if needed)
- [ ] T008 [P] Define MSW handlers in `src/http-mocks/` for API mocking
- [ ] T009 Create base components/services that all stories depend on
- [ ] T010 Configure error handling with `ember-cli-flash`
- [ ] T011 Setup ember-intl translations structure in `translations/`structure
- [ ] T009 Setup environment configuration management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How tMANDATORY - Constitution v1.1.0 requires test-first) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T012 [P] [US1] Vitest integration test for [component] in `libs/[feature]/tests/integration/[name]-test.gts`
- [ ] T013 [P] [US1] Define Page Object for [component] interactions (exported from component file)
- [ ] T014 [P] [US1] Playwright E2E test for [user journey] in `front-app/e2e/[name].spec.ts` (if app feature)
- [ ] T015 [P] [US1] MSW handlers for [API endpoints] in `src/http-mocks/[entity].ts`

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create Warp Drive schema in `src/schemas/[entity].ts`
- [ ] T017 [P] [US1] Create Zod validation schema in `src/components/forms/[entity]-validation.ts`
- [ ] T018 [P] [US1] Create `[Entity]Changeset` extending `ImmerChangeset` in `src/changesets/[entity].ts`
- [ ] T019 [US1] Implement Glimmer component in `src/components/[name].gts` with Page Object export
- [ ] T020 [US1] Integrate TripTyk components (`TpkForm`, `TpkInputPrefab`, etc.) in form
- [ ] T021 [US1] Add ember-intl translations in `translations/en-us.json`
- [ ] T022 [US1] Add validation and error handling with `ember-cli-flash`
- [ ] T023 [US1] Verify all tests pass (Vitest + Playwright)cation]/[file].py
- [ ] T016 [US1] Add validation and error handling
- [ ] T017 [US1] Add logging for user story 1 operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [MANDATORY - Constitution v1.1.0 requires test-first) ⚠️

- [ ] T024 [P] [US2] Vitest integration test for [component] in `libs/[feature]/tests/integration/[name]-test.gts`
- [ ] T025 [P] [US2] Define Page Object for [component] interactions (exported from component file)
- [ ] T026 [P] [US2] Playwright E2E test for [user journey] in `front-app/e2e/[name].spec.ts` (if app feature)
- [ ] T027 [P] [US2] MSW handlers for [API endpoints] in `src/http-mocks/[entity].ts`

### Implementation for User Story 2

- [ ] T028 [P] [US2] Create Warp Drive schema in `src/schemas/[entity].ts`
- [ ] T029 [P] [US2] Create Zod validation schema in `src/components/forms/[entity]-validation.ts`
- [ ] T030 [US2] Implement Glimmer component in `src/components/[name].gts` with Page Object
- [ ] T031 [US2] Integrate with User Story 1 components (if needed)
- [ ] T032 [US2] Add ember-intl translations
- [ ] T033 [US2] Verify all tests pass
### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---MANDATORY - Constitution v1.1.0 requires test-first) ⚠️

- [ ] T034 [P] [US3] Vitest integration test for [component] in `libs/[feature]/tests/integration/[name]-test.gts`
- [ ] T035 [P] [US3] Define Page Object for [component] interactions (exported from component file)
- [ ] T036 [P] [US3] Playwright E2E test for [user journey] in `front-app/e2e/[name].spec.ts` (if app feature)
- [ ] T037 [P] [US3] MSW handlers for [API endpoints] in `src/http-mocks/[entity].ts`

### Implementation for User Story 3

- [ ] T038 [P] [US3] Create Warp Drive schema in `src/schemas/[entity].ts`
- [ ] T039 [P] [US3] Create Zod validation schema in `src/components/forms/[entity]-validation.ts`
- [ ] T040 [US3] Implement Glimmer component in `src/components/[name].gts` with Page Object
- [ ] T041 [US3] Add ember-intl translations
- [ ] T042 [US3] Verify all tests pass
- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should README.md or docs/
- [ ] TXXX Code cleanup and refactoring (DRY violations, magic numbers, etc.)
- [ ] TXXX Performance optimization across all stories (bundle size, Lighthouse scores)
- [ ] TXXX [P] Additional unit tests for edge cases (if needed beyond integration tests)
- [ ] TXXX Accessibility audit and fixes (keyboard nav, ARIA labels, color contrast)
- [ ] TXXX Security hardening (input sanitization, CSRF protection, etc.)
- [ ] TXXX Run quickstart.md validation (if quickstart guide exists)
- [ ] TXXX Verify Constitution compliance (all principles checked)
---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **PolisMANDATORY per constitution) MUST be written and FAIL before implementation
- Warp Drive schemas before changesets
- Changesets before components
- Components with Page Objects exported
- Core implementation before integration
- Story tests pass before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Schemas and validation schemaces before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run inMANDATORY per constitution):
Task: "Vitest integration test for [component] in libs/[feature]/tests/integration/[name]-test.gts"
Task: "Playwright E2E test for [user journey] in front-app/e2e/[name].spec.ts"
Task: "MSW handlers for [API endpoints] in src/http-mocks/[entity].ts"

# Launch schemas and validation together:
Task: "Create Warp Drive schema in src/schemas/[entity].ts"
Task: "Create Zod validation schema in src/components/forms/[entity]-validation.ts

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
