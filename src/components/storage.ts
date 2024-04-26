import { ContactList } from "../models/contact-list"

let contacts: ContactList = {}

export function initContactListStorage() {
  const storedContacts = localStorage.getItem('contacts')
  if (storedContacts) {
    contacts = JSON.parse(storedContacts)
  }
}

export function setContactList(newContacts: ContactList) {
  const sortedContactsEnt = Object.entries(newContacts).sort();
  const sortedContacts = Object.fromEntries(sortedContactsEnt)
  
  contacts = sortedContacts
  localStorage.setItem('contacts', JSON.stringify(newContacts))
}

export function getContactList(): ContactList {
  return contacts
}

export function clearContactListStorage() {
  localStorage.removeItem('contacts');
  contacts = {}
}