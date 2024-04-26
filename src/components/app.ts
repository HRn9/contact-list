import { renderList } from "./contact-list/render-list";
import { addListeners } from "./listeners";

export function app() {
  renderList()
  addListeners()
}