import { clearInputs } from "../../utils/clear-inputs";
import { renderList } from "../contact-list/render-list";
import { getContactList, setContactList } from "../storage";
import { createContactItemFromInputs } from "./create-contact-item";

export function addContact(inputs: HTMLInputElement[]) {
  const contactItem = createContactItemFromInputs(inputs)

  const firstChar = contactItem.name.charAt(0).toLowerCase()

  clearInputs(inputs)

  let contacts = getContactList()

  if (!contacts[firstChar]) {
    contacts[firstChar] = [];
  }

  contacts[firstChar].push(contactItem);
  setContactList(contacts)

  renderList()
}