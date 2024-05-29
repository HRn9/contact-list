import { Contact, MappedContacts } from "../types";

export default function mapContacts(contacts: Contact[]) {
  return contacts.reduce((acc, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as MappedContacts);
}