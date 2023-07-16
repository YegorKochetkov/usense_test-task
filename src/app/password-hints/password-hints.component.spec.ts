import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordHintsComponent } from './password-hints.component';

describe('PasswordHintsComponent', () => {
  let component: PasswordHintsComponent;
  let fixture: ComponentFixture<PasswordHintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordHintsComponent]
    });
    fixture = TestBed.createComponent(PasswordHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
