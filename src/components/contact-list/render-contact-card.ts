import { ContactItem } from "../../models/contact-item";
import { createItemKeyFromProps } from "../../utils/create-Item-key";


export function renderContactCard(contactItem: ContactItem, container: HTMLElement): void {
  const listItem = document.createElement('div');
  listItem.classList.add('list-item');
  listItem.dataset.key = createItemKeyFromProps(Object.values(contactItem));

  const nameEl = document.createElement('span');
  nameEl.textContent = `name: ${contactItem.name}`;
  listItem.appendChild(nameEl)

  const vacancyEl = document.createElement('span');
  vacancyEl.textContent = `vacancy: ${contactItem.vacancy}`;
  listItem.appendChild(vacancyEl)

  const phoneEl = document.createElement('span');
  phoneEl.textContent = `phone number: ${contactItem.phone}`;
  listItem.appendChild(phoneEl)

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '🗙';
  listItem.appendChild(deleteBtn)

  const editBtn = document.createElement('span');
  editBtn.classList.add('edit-btn');
  editBtn.textContent = '✎';
  listItem.appendChild(editBtn)

  container.appendChild(listItem)
}