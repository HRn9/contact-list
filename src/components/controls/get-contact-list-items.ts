import { ContactItem } from "../../models/contact-item";

export function getContactListItems(): Record<string, ContactItem[]> {
  const contacts = localStorage.getItem('contacts')
  const contactList = contacts ? JSON.parse(contacts) : {}
  return contactList;
}
