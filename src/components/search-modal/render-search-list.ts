import { searchListEl } from "../../consts/temp-consts";
import { renderContactCard } from "../contact-list/render-contact-card";
import { getContactList } from "../storage";

export function renderSearchList(value: string, allFlag = false) {
  const trimmedValue = value.trim() // || null
  const contactList = getContactList()
  const flattedList = Object.values(contactList).flat()

  const filtredList = allFlag ?
  flattedList :
  flattedList.filter((x) => Object.values(x).some((y) => y.toLowerCase().includes(trimmedValue))); // check

  searchListEl!.innerHTML = '';

  filtredList.forEach((item) => renderContactCard(item, searchListEl))
}