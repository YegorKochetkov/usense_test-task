import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function allowedSymbolsRegexpValidator(
  errorName: string,
  regexp: RegExp
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentSymbols: string = control.value ?? '';
    const isAllowed = regexp.test(currentSymbols);

    return !isAllowed ? { [errorName]: { value: isAllowed } } : null;
  };
}
