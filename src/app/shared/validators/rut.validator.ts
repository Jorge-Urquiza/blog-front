import { AbstractControl, ValidationErrors } from '@angular/forms';
export const rutValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const value: string = control.value;
  const isValidRUT = isValidRut(value);
  if (isValidRUT) {
    return null;
  } else {
    return { customInvalidRut: true };
  }
};

export const isValidRut = (rut: string): boolean => {
  // Formato del RUT: XXXXXXXX-Y
  const rutRegex = /^[0-9]{7,8}-[0-9kK]$/;

  if (!rutRegex.test(rut)) {
    return false;
  }
  let rutOriginal = rut;
  if (rutOriginal.trim().length === 9) {
    rutOriginal = '0'.concat(rutOriginal);
  }
  const [rutNumber, checkDigit] = rutOriginal.split('-');
  let normalizedCheckDigit = checkDigit;
  if (checkDigit.toLowerCase() === 'k') {
    normalizedCheckDigit = 'k';
  }

  const calculateCheckDigit = (rutNum: string): string => {
    let M = 0;
    let S = 1;
    for (let i = rutNum.length - 1; i >= 0; i--) {
      const digit = parseInt(rutNum[i], 10);
      S = (S + digit * (9 - (M++ % 6))) % 11;
    }
    return S ? (S - 1).toString() : 'k';
  };

  return calculateCheckDigit(rutNumber) === normalizedCheckDigit;
};
