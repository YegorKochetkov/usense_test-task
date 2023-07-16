import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import {
  ALLOWED_SPEC_SYMBOLS,
  MAX_LENGTH,
  MIN_LENGTH,
} from '../constants/constants';

@Component({
  selector: 'app-password-hints',
  standalone: true,
  imports: [CommonModule],
  template: `
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
          'strongPassword': isFormValid,
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
          'strongPassword': isFormValid,
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
             !isFormValid &&
             isCheckForMinLengthPassed(),
          'strongPassword': isFormValid,
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
  `,
  styleUrls: ['./password-hints.component.scss'],
})
export class PasswordHintsComponent {
  @Input() errors!: ValidationErrors | null;
  @Input() isFormValid!: boolean;

  symbols = ALLOWED_SPEC_SYMBOLS.split('').join(', ');
  minLength = MIN_LENGTH;
  maxLength = MAX_LENGTH;

  isCheckForRequiredPassed = () => !this.errors?.['required'];
  isCheckForMinLengthPassed = () => !this.errors?.['minLength'];
  isCheckForNumbersPassed = () => !this.errors?.['numbersRequired'];
  isCheckForLettersPassed = () => !this.errors?.['allowedLetters'];
  isCheckForSpecSymbolsPassed = () => !this.errors?.['specSymbolsRequired'];
  isCheckForNotAllowedSymbolsPassed = () => !this.errors?.['notAllowedSymbols'];

  isCheckForMediumPasswordPassed = () =>
    (this.isCheckForSpecSymbolsPassed() && this.isCheckForLettersPassed()) ||
    (this.isCheckForSpecSymbolsPassed() && this.isCheckForNumbersPassed()) ||
    (this.isCheckForLettersPassed() && this.isCheckForNumbersPassed());

  isCheckForEasyPasswordPassed = () =>
    this.isCheckForSpecSymbolsPassed() ||
    this.isCheckForLettersPassed() ||
    this.isCheckForNumbersPassed();
}
