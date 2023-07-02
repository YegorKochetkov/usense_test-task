import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  imports: [CommonModule, ReactiveFormsModule],
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

      <div
        [ngClass]="{
          'strength': true,
          'shortPassword':
             !isCheckForMinLengthPassed() &&
             isCheckForRequiredPassed() &&
             isCheckForNotAllowedSymbolsPassed(),
          'easyPassword':
            isCheckForEasyPasswordPassed() &&
            isCheckForMinLengthPassed() &&
            isCheckForNotAllowedSymbolsPassed(),
          'mediumPassword':
             isCheckForMediumPasswordPassed() &&
             isCheckForMinLengthPassed() &&
             isCheckForNotAllowedSymbolsPassed(),
          'strongPassword': isCheckForStrongPasswordPassed(),
        }"
      >
        The password is easy.
      </div>
      <div
        [ngClass]="{
          'strength': true,
          'shortPassword':
             !isCheckForMinLengthPassed() &&
             isCheckForRequiredPassed() &&
             isCheckForNotAllowedSymbolsPassed(),
          'mediumPassword':
             isCheckForMediumPasswordPassed() &&
             isCheckForMinLengthPassed() &&
             isCheckForNotAllowedSymbolsPassed(),
          'strongPassword': isCheckForStrongPasswordPassed(),
        }"
      >
        The password is medium.
      </div>
      <div
        [ngClass]="{
          'strength': true,
          'shortPassword':
             !isCheckForMinLengthPassed() &&
             isCheckForRequiredPassed() &&
             isCheckForNotAllowedSymbolsPassed(),
          'defaultStatus':
             isCheckForMediumPasswordPassed() &&
             !isCheckForStrongPasswordPassed() &&
             isCheckForMinLengthPassed(),
          'strongPassword': isCheckForStrongPasswordPassed(),
        }"
      >
        The password is strong.
      </div>

      <section class="hint">
        <p>
          Allowed english characters, numbers and symbols:
          <span> {{ symbols }} </span>
          <br />
          The password must be between {{ minLength }} and
          {{ maxLength }} characters
        </p>
        <p *ngIf="!isCheckForNotAllowedSymbolsPassed()" class="notAllowed">
          Entered characters that are not allowed!
        </p>
      </section>
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

  symbols = ALLOWED_SPEC_SYMBOLS.split('').join(', ');
  minLength = MIN_LENGTH;
  maxLength = MAX_LENGTH;

  isCheckForRequiredPassed = () =>
    !this.passwordForm.controls.passwordControl.errors?.['required'];
  isCheckForMinLengthPassed = () =>
    !this.passwordForm.controls.passwordControl.errors?.['minLength'];
  isCheckForNumbersPassed = () =>
    !this.passwordForm.controls.passwordControl.errors?.['numbersRequired'];
  isCheckForLettersPassed = () =>
    !this.passwordForm.controls.passwordControl.errors?.['allowedLetters'];
  isCheckForSpecSymbolsPassed = () =>
    !this.passwordForm.controls.passwordControl.errors?.['specSymbolsRequired'];
  isCheckForNotAllowedSymbolsPassed = () =>
    !this.passwordForm.controls.passwordControl.errors?.['notAllowedSymbols'];

  isCheckForMediumPasswordPassed = () =>
    (this.isCheckForSpecSymbolsPassed() && this.isCheckForLettersPassed()) ||
    (this.isCheckForSpecSymbolsPassed() && this.isCheckForNumbersPassed()) ||
    (this.isCheckForLettersPassed() && this.isCheckForNumbersPassed());

  isCheckForEasyPasswordPassed = () =>
    this.isCheckForSpecSymbolsPassed() ||
    this.isCheckForLettersPassed() ||
    this.isCheckForNumbersPassed();

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
