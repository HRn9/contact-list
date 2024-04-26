import { searchInput, nameInputMain, vacancyInputMain, phoneNumInputMain } from "../consts/temp-consts";
import { clearList } from "./controls/clear-list";
import { deleteItem } from "./controls/delete-item";
import { handleContact } from "./controls/handle-contact";
import { closeEditModal } from "./edit-modal/close-edit-modal";
import { handleContactFromEditModal } from "./edit-modal/handle-edit-contact";
import { showEditModal } from "./edit-modal/show-edit-modal";
import { closeSearchModal } from "./search-modal/close-search-modal";
import { renderSearchList } from "./search-modal/render-search-list";
import { showSearchModal } from "./search-modal/show-search-modal";

export function addListeners() {
  searchInput.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    renderSearchList(target.value.toLowerCase())
  })
  
  document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
  
    const targetParent = target.parentElement as HTMLElement;
    const parentKey = targetParent.dataset.key as string;
  
    const actions: Record<string, () => void> = {
      'add-btn': () => handleContact([ nameInputMain, vacancyInputMain, phoneNumInputMain ], target),
      'clear-btn': () => clearList(),
      'delete-btn': () => deleteItem(parentKey, targetParent),
      'edit-btn': () => showEditModal(parentKey),
      'close-editor': () => closeEditModal(),
      'editor-modal__wrapper': () => closeEditModal(),
      'save-btn': () => handleContactFromEditModal(target),
      'search-btn': () => showSearchModal(),
      'close-search': () => closeSearchModal(),
      'search-modal__wrapper': () => closeSearchModal(),
      'show-all-btn': () => renderSearchList('', true)
    };
  
    Object.keys(actions).some(className => {
      if (target.classList.contains(className)) {
        actions[className]();
        return true;
      }
      return false;
    });
  });
}