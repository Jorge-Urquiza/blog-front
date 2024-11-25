import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const passwordValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let errors = {};

    // Required field
    if (!value) {
      return { ...errors, required: true };
    }

    // Min length validation
    if (value.length < 8) {
      errors = { ...errors, minLength: true };
    }

    // Max length validation
    if (value.length > 55) {
      errors = { ...errors, maxLength: true };
    }

    // Number validation
    if (!/\d/.test(value)) {
      errors = { ...errors, hasNumber: true };
    }

    // Upper-case validation
    if (!/[A-Z]/.test(value)) {
      errors = { ...errors, hasUpperCase: true };
    }

    // Lower-case validation
    if (!/[a-z]/.test(value)) {
      errors = { ...errors, hasLowerCase: true };
    }

    // Special char validation
    if (!/[\W_]/.test(value)) {
      errors = { ...errors, hasSpecialCharacter: true };
    }
    return errors;
    ;
  };
