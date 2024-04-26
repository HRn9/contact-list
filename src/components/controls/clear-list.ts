import { renderEmptyList } from "../contact-list/render-empty-list";

export function clearList() {
  localStorage.removeItem('contacts');
  renderEmptyList()
}