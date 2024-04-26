import { renderEmptyList } from "../contact-list/render-empty-list";
import { clearContactListStorage } from "../storage";

export function clearList() {
  clearContactListStorage()
  renderEmptyList()
}