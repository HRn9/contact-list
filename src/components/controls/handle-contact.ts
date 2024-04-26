import { validationRules } from "../../consts/validation-rules";
import { ValidationErrorObj } from "../../models/validation-error-obj";
import { addContact } from "./add-contact";
import { createContactItemFromInputs } from "./create-contact-item";
import { isNewContact } from "./is-contact-new";
import { showElementsError } from "./show-elements-error";
import { validateValue } from "./validate-value";

export function handleContact(targetInputs: HTMLInputElement[], submitEl: HTMLElement) {
  let handleStatus;
  const contactItem = createContactItemFromInputs(targetInputs)

  if (!isNewContact(contactItem)) { 
    showElementsError(submitEl, 'You already have this contact');
    return
  }

  const validationErrors: ValidationErrorObj[] = [];

  targetInputs.forEach((inp) => {
    const content = inp.dataset.content as string;
    const valudationObj = validationRules[content]
    const validationRes = validateValue(inp.value, valudationObj)

    validationRes && validationErrors.push({ invalidInput: inp, errorMessage: validationRes})
  })

  if (validationErrors.every((x) => x.errorMessage === null)) {
    addContact(targetInputs);
    handleStatus = true;
  } else {
    validationErrors.map((x) => showElementsError(x.invalidInput, x.errorMessage || ''))
    handleStatus = false;
  }

  return handleStatus;
}
