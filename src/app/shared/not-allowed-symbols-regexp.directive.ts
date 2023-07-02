import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notAllowedSymbolsRegexpValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentSymbols: string = control.value ?? '';
    const isNotAllowed = regexp.test(currentSymbols);

    return isNotAllowed ? { notAllowedSymbols: { value: isNotAllowed } } : null;
  };
}
