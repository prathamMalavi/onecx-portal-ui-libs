# Fix Autofocus on p-selectbutton in Diagram Component

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `autofocus="false"` attribute to the `p-selectbutton` element in `diagram.component.html` to prevent unwanted autofocus behavior on the diagram type selector button.

**Architecture:** This is a simple template modification in an Angular component. The `p-selectbutton` component from PrimeNG has an `autofocus` property that defaults to `true` in some cases, causing unwanted focus behavior. Setting it explicitly to `false` prevents this.

**Tech Stack:** Angular 20, PrimeNG 20, Nx monorepo, Jest for testing

---

## Global Constraints

- Repository: onecx/onecx-portal-ui-libs (Nx monorepo with Angular libraries)
- Library: angular-accelerator (`libs/angular-accelerator/`)
- Component: DiagramComponent in `libs/angular-accelerator/src/lib/components/diagram/`
- Testing: Jest with component harnesses (Angular CDK testing)
- Linting: ESLint with Angular rules
- All changes must pass lint, test, and build tasks

---

## File-Level Task List

### Task 1: Add autofocus="false" to p-selectbutton in diagram.component.html

**Files:**
- Modify: `libs/angular-accelerator/src/lib/components/diagram/diagram.component.html:14`

**Summary:** Add the `autofocus="false"` attribute to the `p-selectbutton` element on line 14 to disable autofocus behavior.

**Dependencies:** None (this is the primary change)

**Concrete TODOs:**
- [ ] Open `libs/angular-accelerator/src/lib/components/diagram/diagram.component.html`
- [ ] Locate line 14 with the `p-selectbutton` element
- [ ] Add `autofocus="false"` attribute to the element
- [ ] Save the file

```html
<!-- Before (line 14) -->
<p-selectbutton [options]="shownDiagramTypes()" [ngModel]="selectedDiagramType()" optionLabel="id"
  (onChange)="onDiagramTypeChanged($event)" name="diagram-type-select-button" [allowEmpty]="false"
  [ariaLabel]="'OCX_DIAGRAM.SELECT_BUTTON.ARIA_LABEL' | translate">

<!-- After (line 14) -->
<p-selectbutton [options]="shownDiagramTypes()" [ngModel]="selectedDiagramType()" optionLabel="id"
  (onChange)="onDiagramTypeChanged($event)" name="diagram-type-select-button" [allowEmpty]="false"
  [ariaLabel]="'OCX_DIAGRAM.SELECT_BUTTON.ARIA_LABEL' | translate" autofocus="false">
```

---

### Task 2: Verify the change with lint and tests

**Files:**
- Test: `libs/angular-accelerator/src/lib/components/diagram/diagram.component.spec.ts`
- Test: `libs/angular-accelerator/testing/diagram.harness.ts`

**Summary:** Run linting and tests to ensure the change doesn't break anything. No test modifications are required since this is a simple attribute addition that doesn't affect component behavior/logic.

**Dependencies:** Task 1 must complete first

**Concrete TODOs:**
- [ ] Run lint check: `nx affected lint --base=main --parallel`
- [ ] Run tests for diagram component: `nx test angular-accelerator --testFilePattern="diagram.component.spec.ts"`
- [ ] Verify tests pass (no test changes needed for this simple attribute addition)
- [ ] Commit changes

---

## Verification Steps

1. **Lint check:**
   ```bash
   nx affected lint --base=main --parallel
   ```
   Expected: No lint errors

2. **Run diagram component tests:**
   ```bash
   nx test angular-accelerator --testFilePattern="diagram.component.spec.ts"
   ```
   Expected: All tests pass

3. **Build the library:**
   ```bash
   nx build angular-accelerator
   ```
   Expected: Build succeeds

---

## Notes

- This is a minimal, focused change - adding a single boolean attribute to a PrimeNG component
- No documentation updates required per issue definition of done (documentation is updated according to conventions or issue records why not needed)
- No test changes required - the autofocus attribute doesn't affect component behavior or test assertions
- The harness test `getDiagramTypeSelectButton()` uses a name selector which is unchanged
- Parent issue: #510 (this is a subtask)
- Issue #516 Definition of Done explicitly requires: "Add autofocus="false" to p-selectbutton in diagram.component.html"