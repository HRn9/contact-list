import { renderList } from "./contact-list/render-list";
import { addListeners } from "./listeners";
import { initContactListStorage } from "./storage";

export function app() {
  initContactListStorage()
  renderList()
  addListeners()
}