# Fix Autofocus on p-selectbutton in Data Layout Selection Component

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `autofocus="false"` attribute to the `p-selectbutton` component in `data-layout-selection.component.html` to prevent unwanted autofocus behavior.

**Architecture:** This is a simple, targeted fix to an Angular component template. The issue requires adding a single attribute to a PrimeNG component to disable its default autofocus behavior. The fix involves modifying only the template file and potentially adding a test to verify the attribute is present.

**Tech Stack:** Angular 20, PrimeNG 20, Jest for testing, Nx monorepo

## Global Constraints

- Code must pass ESLint validation
- Code must pass SonarQube checks
- Tests must maintain or improve coverage (100% for new code, 80% for existing)
- All user-facing strings must use ngx-translate (no hardcoded strings)
- Follow Angular best practices: standalone components, signals, OnPush change detection
- Use PrimeFlex/Tailwind utility classes over custom CSS

---

### Task 1: Add autofocus="false" to p-selectbutton in data-layout-selection.component.html

**Files:**
- Modify: `libs/angular-accelerator/src/lib/components/data-layout-selection/data-layout-selection.component.html`

**Interfaces:**
- Consumes: Existing p-selectbutton component template
- Produces: Updated template with autofocus="false" attribute

- [ ] **Step 1: Read the current template to understand structure**

```bash
cat libs/angular-accelerator/src/lib/components/data-layout-selection/data-layout-selection.component.html
```

- [ ] **Step 2: Add autofocus="false" attribute to p-selectbutton**

```html
<p-selectbutton
  [options]="viewingLayouts()"
  [ngModel]="selectedViewLayout()"
  optionLabel="id"
  (onChange)="onDataViewLayoutChange($event.value)"
  [ariaLabel]="'OCX_DATA_LAYOUT_SELECTION.SELECT_BUTTON.ARIA_LABEL' | translate"
  autofocus="false"
>
  <ng-template #item let-item>
    <i [class]="item.icon" [ocxTooltip]="item.tooltipKey | translate" tooltipPosition="top" aria-hidden="true"></i>
    <span class="sr-only" [attr.id]="item.id">{{ item.labelKey | translate }}</span>
  </ng-template>
</p-selectbutton>
```

- [ ] **Step 3: Verify the change by reading the file**

```bash
cat libs/angular-accelerator/src/lib/components/data-layout-selection/data-layout-selection.component.html
```

- [ ] **Step 4: Run lint to verify code quality**

```bash
nx affected:lint --parallel
```

---

### Task 2: Update test to verify autofocus attribute is present

**Files:**
- Modify: `libs/angular-accelerator/src/lib/components/data-layout-selection/data-layout-selection.component.spec.ts`

**Interfaces:**
- Consumes: Updated component template
- Produces: Test that verifies autofocus="false" attribute

- [ ] **Step 1: Read the current test file**

```bash
cat libs/angular-accelerator/src/lib/components/data-layout-selection/data-layout-selection.component.spec.ts
```

- [ ] **Step 2: Add test to verify autofocus="false" attribute**

```typescript
describe('autofocus attribute', () => {
  it('should have autofocus="false" on p-selectbutton', () => {
    fixture.detectChanges()
    const selectButton = fixture.debugElement.nativeElement.querySelector('p-selectbutton')
    expect(selectButton.getAttribute('autofocus')).toBe('false')
  })
})
```

- [ ] **Step 3: Run the test to verify it passes**

```bash
nx test angular-accelerator -- --testPathPattern=data-layout-selection --no-coverage
```

---

### Task 3: Run full test suite and verify coverage

**Files:**
- Test: `libs/angular-accelerator/src/lib/components/data-layout-selection/data-layout-selection.component.spec.ts`

- [ ] **Step 1: Run tests for the component**

```bash
nx test angular-accelerator -- --testPathPattern=data-layout-selection --coverage
```

- [ ] **Step 2: Verify coverage meets requirements (100% for new code)**

```bash
cat coverage/libs/angular-accelerator/lcov.info | grep -A 5 "data-layout-selection.component"
```

- [ ] **Step 3: Run lint for the library**

```bash
nx lint angular-accelerator
```

---

### Task 4: Verify build passes

**Files:**
- Build: `angular-accelerator` library

- [ ] **Step 1: Build the angular-accelerator library**

```bash
nx build angular-accelerator
```

- [ ] **Step 2: Verify no TypeScript or build errors**

```bash
echo "Build completed successfully"
```

---

## Verification Steps

1. **Template verification**: Confirm `autofocus="false"` attribute is present on the `p-selectbutton` element
2. **Test verification**: Run component tests and verify the new test passes
3. **Lint verification**: Run `nx lint angular-accelerator` and confirm no errors
4. **Build verification**: Run `nx build angular-accelerator` and confirm successful compilation
5. **Coverage verification**: Ensure test coverage meets 100% for new code

## Notes

- This is a minimal fix addressing the specific issue requirement
- The `autofocus="false"` attribute explicitly disables PrimeNG's default autofocus behavior on the select button component
- No documentation updates required as this is a bug fix for an accessibility/focus management issue
- No additional dependencies or configuration changes needed
- The fix follows the existing pattern in the codebase where `autofocus` is used as an attribute (not property binding) on PrimeNG components like `p-select`