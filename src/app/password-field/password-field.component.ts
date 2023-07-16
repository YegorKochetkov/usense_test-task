import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PasswordHintsComponent } from '../password-hints/password-hints.component';
import { allowedSymbolsRegexpValidator } from '../shared/allowed-symbols-regexp.directive';
import { minLengthValidator } from '../shared/min-length.directive';
import { notAllowedSymbolsRegexpValidator } from '../shared/not-allowed-symbols-regexp.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ALLOWED_LETTERS_REGEXP,
  ALLOWED_NUMBERS_REGEXP,
  ALLOWED_SPEC_SYMBOLS,
  ALLOWED_SPEC_SYMBOLS_REGEXP,
  MAX_LENGTH,
  MIN_LENGTH,
  NOT_ALLOWED_SYMBOLS_REGEXP,
} from '../constants/constants';

@Component({
  selector: 'app-password-field',
  standalone: true,
  template: `
    <form [formGroup]="passwordForm" (submit)="onSubmit()" class="form">
      <div class="inputField">
        <input
          type="password"
          name="password"
          placeholder="password"
          class="password"
          formControlName="passwordControl"
        />
        <button
          type="submit"
          class="button"
          [disabled]="!isCheckForStrongPasswordPassed()"
        >
          Submit
        </button>
      </div>

      <app-password-hints
        [errors]="passwordForm.controls.passwordControl.errors"
        [isFormValid]="isCheckForStrongPasswordPassed()"
      ></app-password-hints>
    </form>

    <dialog #formDialog class="dialog">
      <div class="dialog-content">
        <p>Form data sent!</p>
        <p>Password: {{ passwordForm.controls.passwordControl.value }}</p>
        <button (click)="closeDialog()" class="button">Close</button>
      </div>
    </dialog>
  `,
  styleUrls: ['./password-field.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, PasswordHintsComponent],
})
export class PasswordFieldComponent {
  @ViewChild('formDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;

  passwordForm = new FormGroup({
    passwordControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(MAX_LENGTH),
      minLengthValidator(MIN_LENGTH),
      allowedSymbolsRegexpValidator('allowedLetters', ALLOWED_LETTERS_REGEXP),
      allowedSymbolsRegexpValidator('numbersRequired', ALLOWED_NUMBERS_REGEXP),
      allowedSymbolsRegexpValidator(
        'specSymbolsRequired',
        ALLOWED_SPEC_SYMBOLS_REGEXP
      ),
      notAllowedSymbolsRegexpValidator(NOT_ALLOWED_SYMBOLS_REGEXP),
    ]),
  });

  isCheckForStrongPasswordPassed = () => this.passwordForm.status === 'VALID';

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm);
      this.dialog.nativeElement.showModal();
    }
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.passwordForm.reset();
  }
}
