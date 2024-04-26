import { contactListEl } from "../../consts/temp-consts";

export function renderEmptyList(): void {
  contactListEl!.innerHTML = "";

  const emptyMessage = document.createElement('h3');
  emptyMessage.classList.add('empty-message')
  emptyMessage.textContent = "You don't have any contacts yet";

  contactListEl!.appendChild(emptyMessage)
}