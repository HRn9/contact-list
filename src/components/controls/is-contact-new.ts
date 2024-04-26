import { ContactItem } from "../../models/contact-item";
import { getContactListItems } from "./get-contact-list-items";

export function isNewContact(contactItem: ContactItem): boolean {
  const contacts = getContactListItems();
  const flattedList = Object.values(contacts).flat()
  return flattedList.every((savedContact) => 
  savedContact.name !== contactItem.name && 
  savedContact.vacancy !== contactItem.vacancy &&
  savedContact.phone !== contactItem.phone)
  }