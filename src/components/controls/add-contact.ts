import { clearInputs } from "../../utils/clear-inputs";
import { renderList } from "../contact-list/render-list";
import { createContactItemFromInputs } from "./create-contact-item";
import { getContactListItems } from "./get-contact-list-items";

export function addContact(inputs: HTMLInputElement[]) {
  const contactItem = createContactItemFromInputs(inputs)

  const firstChar = contactItem.name.charAt(0).toLowerCase()

  clearInputs(inputs)

  let contacts = getContactListItems()

  if (!contacts[firstChar]) {
    contacts[firstChar] = [];
  }

  contacts[firstChar].push(contactItem);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  renderList()
}