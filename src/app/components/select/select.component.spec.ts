import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show dropdown initially', async () => {
    const selectElement = fixture.debugElement.query(By.css('select'));
    expect(selectElement).toBeNull();
  });

  it('should show dropdown and contents after click', async () => {
    const toggleButton = fixture.debugElement.query(
      By.css('.toggle-dropdown-button'),
    );
    toggleButton.nativeElement.click();
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select'));
    expect(selectElement).not.toBeNull();

    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(3);
  });

  it('should hide dropdown after second click', async () => {
    const toggleButton = fixture.debugElement.query(By.css('select'));

    toggleButton.nativeElement.click();
    fixture.detectChanges();

    let selectElement = fixture.debugElement.query(By.css('select'));
    expect(selectElement).not.toBeNull();

    toggleButton.nativeElement.click();
    fixture.detectChanges();

    selectElement = fixture.debugElement.query(By.css('select'));
    expect(selectElement).toBeNull();
  });
});
