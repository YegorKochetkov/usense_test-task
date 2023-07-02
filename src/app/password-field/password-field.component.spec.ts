import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordFieldComponent } from './password-field.component';

describe('PasswordFieldTempComponent', () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordFieldComponent],
    });
    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value of the input field', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('.password');
    const event = new Event('input');

    input.value = 'Red';
    input.dispatchEvent(event);

    expect(component.passwordForm.controls.passwordControl.value).toEqual(
      'Red'
    );
  });
});
