import { contactListEl } from "../../consts/temp-consts";
import { decodeItemKey } from "../../utils/decode-Item-key";
import { isElementEmpty } from "../../utils/is-element-empty";
import { renderEmptyList } from "../contact-list/render-empty-list";
import { getContactList, setContactList } from "../storage";
import { decreaseTitleCounter } from "./decrease-title-counter";

export function deleteItem(itemKey: string, itemElement: HTMLElement): void {
  const contacts = getContactList()
  const contactItem = decodeItemKey(itemKey)
  const firstChar = contactItem.name.charAt(0).toLowerCase()
  const contactList = contacts[firstChar];

  const filteredList = contactList.filter((contact) => 
    contact.name !== contactItem.name || 
    contact.vacancy !== contactItem.vacancy || 
    contact.phone !== contactItem.phone
  );

  filteredList.length < 1 ? delete contacts[firstChar] : contacts[firstChar] = filteredList;

  setContactList(contacts)

  if (itemElement) {
    const itemCardsList = itemElement.parentElement as HTMLElement
    const itemBlock = itemCardsList?.parentElement

    decreaseTitleCounter(itemBlock?.querySelector('.block-title') as HTMLElement)

    itemElement.remove()

    isElementEmpty(itemCardsList) && itemBlock?.remove();
    isElementEmpty(contactListEl as HTMLElement) && renderEmptyList();
  }
}