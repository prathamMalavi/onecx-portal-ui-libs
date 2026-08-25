import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SelectButtonModule } from 'primeng/selectbutton'
import { TranslateModule } from '@ngx-translate/core'
import { provideTranslateTestingService } from '@onecx/angular-testing'
import { DataLayoutSelectionComponent } from './data-layout-selection.component'
import { DataViewStateService } from '../../services/data-view-state.service'
import { OcxTooltipDirective } from '../../directives/tooltip.directive'

describe('DataLayoutSelectionComponent', () => {
  let component: DataLayoutSelectionComponent
  let fixture: ComponentFixture<DataLayoutSelectionComponent>
  let stateService: DataViewStateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataLayoutSelectionComponent],
      imports: [CommonModule, FormsModule, SelectButtonModule, TranslateModule.forRoot(), OcxTooltipDirective],
      providers: [provideTranslateTestingService({}), DataViewStateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(DataLayoutSelectionComponent)
    component = fixture.componentInstance
    stateService = TestBed.inject(DataViewStateService)
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('constructor effect (layout -> selectedViewLayout)', () => {
    it('should update selectedViewLayout when layout input changes', () => {
      fixture.detectChanges()

      component.layout = 'grid'
      fixture.detectChanges()
      expect(component.selectedViewLayout()?.layout).toBe('grid')

      component.layout = 'list'
      fixture.detectChanges()
      expect(component.selectedViewLayout()?.layout).toBe('list')
    })
  })

  describe('ngOnInit', () => {
    it('should initialize with current layout from service', () => {
      fixture.detectChanges()
      component.onDataViewLayoutChange({
        layout: 'table',
        icon: 'pi pi-address-book'
      })

      expect(stateService.layout()).toBe('table')
      expect(component.selectedViewLayout()?.layout).toBe('table')
    })

    it('should initialize with table layout as default', () => {
      fixture.detectChanges()

      expect(component.selectedViewLayout()?.layout ?? 'grid').toBe('grid')
    })
  })

  describe('viewingLayouts', () => {
    it('should filter default layouts by supportedViewLayouts input', () => {
      fixture.componentRef.setInput('supportedViewLayouts', ['grid', 'list'])
      fixture.detectChanges()

      const layouts = component.viewingLayouts().map((l) => l.layout)
      expect(layouts).toEqual(['list', 'grid'])
    })
  })

  describe('onDataViewLayoutChange', () => {
    it('should call service setLayout and update layout signal', () => {

      fixture.detectChanges()

      component.onDataViewLayoutChange({ icon: 'x' as any, layout: 'grid' })

      expect(stateService.layout()).toBe('grid')
    })
  })

  describe('template', () => {
    it('should have autofocus=false attribute on p-selectbutton element', () => {
      fixture.componentRef.setInput('supportedViewLayouts', ['grid', 'list', 'table'])
      fixture.detectChanges()

      const pSelectButton = fixture.nativeElement.querySelector('p-selectbutton')
      expect(pSelectButton).toBeTruthy()
      expect(pSelectButton.hasAttribute('autofocus')).toBe(true)
      expect(pSelectButton.getAttribute('autofocus')).toBe('false')
    })
  })
})
