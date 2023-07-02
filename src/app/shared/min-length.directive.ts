import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentLength = control.value ? control.value.length : 0;
    const isLessThanMinLength = currentLength > 0 && currentLength < length;

    return isLessThanMinLength ? { minLength: control.value.length } : null;
  };
}
