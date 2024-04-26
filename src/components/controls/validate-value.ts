import { ValidationObj } from "../../models/validation-obj";

export function validateValue(value: string, validationObj: ValidationObj): null | string {
  const trimmedValue = value?.trim() || '';

  if (validationObj.required && trimmedValue === '') return 'This field cannot be left blank.';

  return trimmedValue.match(validationObj.regexp) ? null : validationObj.error
}