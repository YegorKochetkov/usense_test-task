import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { allowedSymbolsRegexpValidator } from '../shared/allowed-symbols-regexp.directive';
import { minLengthValidator } from '../shared/min-length.directive';
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
} from '../constants/constants';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="passwordForm" class="form">
      <div class="inputField">
        <input
          type="password"
          name="password"
          placeholder="password"
          class="password"
          formControlName="passwordControl"
        />
        <button type="submit" class="button">Submit</button>
      </div>

      <div class="easy">The password is easy.</div>
      <div class="medium">The password is medium.</div>
      <div class="strong">The password is strong.</div>

      <div class="hint">
        Allowed english characters, numbers and symbols:
        <span> {{ symbols }} </span>
        <br />
        The password must be between {{ minLength }} and
        {{ maxLength }} characters
      </div>
    </form>
  `,
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {
  passwordForm = new FormGroup({
    passwordControl: new FormControl('', [
      Validators.required,
      Validators.maxLength(MAX_LENGTH),
      minLengthValidator(MIN_LENGTH),
      allowedSymbolsRegexpValidator('allowedLetters', ALLOWED_LETTERS_REGEXP),
      allowedSymbolsRegexpValidator('numbers', ALLOWED_NUMBERS_REGEXP),
      allowedSymbolsRegexpValidator('specSymbols', ALLOWED_SPEC_SYMBOLS_REGEXP),
    ]),
  });

  symbols = ALLOWED_SPEC_SYMBOLS.split('').join(', ');
  minLength = MIN_LENGTH;
  maxLength = MAX_LENGTH;

  minLengthValidator() {}
  easyPasswordValidator() {}
  mediumPasswordValidator() {}
  strongPasswordValidator() {}
}
