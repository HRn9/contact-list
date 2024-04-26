import { ContactItem } from "../../models/contact-item";
import { getContactList } from "../storage";

export function isNewContact(contactItem: ContactItem): boolean {
  const contacts = getContactList()
  const flattedList = Object.values(contacts).flat()
  return flattedList.every((savedContact) => 
  savedContact.name !== contactItem.name && 
  savedContact.vacancy !== contactItem.vacancy &&
  savedContact.phone !== contactItem.phone)
  }