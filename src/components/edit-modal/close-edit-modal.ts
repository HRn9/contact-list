import { editModal, editsInputGroup } from "../../consts/temp-consts"
import { allowScroll } from "../../utils/allow-scroll"
import { clearInputs } from "../../utils/clear-inputs"

export function closeEditModal() {
  editModal.parentElement!.classList.add('hidden')
  clearInputs(editsInputGroup)
  editModal.dataset.initialKey = ''
  allowScroll()
}