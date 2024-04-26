import { editsInputGroup, editModal } from "../../consts/temp-consts"
import { decodeItemKey } from "../../utils/decode-Item-key"
import { createContactItemFromInputs } from "../controls/create-contact-item"
import { deleteItem } from "../controls/delete-item"
import { handleContact } from "../controls/handle-contact"
import { closeEditModal } from "./close-edit-modal"

export function handleContactFromEditModal(editBtn: HTMLElement) {
  const inputsArr = Array.from(editsInputGroup)
  const contactItem = createContactItemFromInputs(inputsArr)
  const initialKey = editModal.dataset.initialKey || ''
  const initialContact = decodeItemKey(initialKey)

  if (JSON.stringify(contactItem) === JSON.stringify(initialContact)) {
    closeEditModal()
    return;
  }

  if (handleContact(inputsArr, editBtn)) {
    const prevItemCondition = document.querySelector(`[data-key="${initialKey}"]`) as HTMLElement;
    deleteItem(initialKey, prevItemCondition)
    closeEditModal()
  }
}