const controlsWrapper = document.querySelector('.controls__wrapper')
const [ nameInput, vacancyInput, phoneNumInput ] = document.querySelectorAll('input')

const contactListEl = document.querySelector('.contact-list');

function createItemKeyFromProps(itemProps) {
  return itemProps.join('_')
}

function deleteItem(itemKey) {
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  const [name, vacancy, phone] = itemKey.split('_');
  const firstChar = name.charAt(0).toLowerCase()
  const contactList = contacts[firstChar];

  const filteredList = contactList.filter((contact) => 
    contact.name !== name || contact.vacancy !== vacancy || contact.phone !== phone
  );

  filteredList.length < 1 ? delete contacts[firstChar] : contacts[firstChar] = filteredList;

  localStorage.setItem('contacts', JSON.stringify(contacts));

  renderList()
}

function renderEmptyList() {
  contactListEl.innerHTML = "";

  const emptyMessage = document.createElement('h3');
  emptyMessage.classList.add('empty-message')
  emptyMessage.textContent = "You don't have any contacts yet";

  contactListEl.appendChild(emptyMessage)
}

function renderList() {
  contactListEl.innerHTML = "";
  const list = JSON.parse(localStorage.getItem('contacts'))

  const isLsEmpty = !list || Object.keys(list).length === 0;
  if (isLsEmpty) {
    renderEmptyList()
    return
  }

  Object.entries(list).forEach((ent) => {
    const [key, value] = ent;

    const listBlock = document.createElement('div');
    listBlock.classList.add('list-block');

    const blockTitle = document.createElement('span');
    blockTitle.textContent = `${key.toUpperCase()} (${value.length})`;
    blockTitle.classList.add('block-title')

    const blockBtn = document.createElement('span');
    blockBtn.textContent = '▼';
    blockBtn.classList.add('block-btn');

    const blockHeader = document.createElement('div');
    blockHeader.classList.add('block-header')

    blockHeader.appendChild(blockTitle)
    blockHeader.appendChild(blockBtn)

    listBlock.appendChild(blockHeader)

    const blockBody = document.createElement('div');
    blockBody.classList.add('block-body')
    blockBody.classList.add('hidden')

    blockBtn.addEventListener('click', () => blockBody.classList.toggle('hidden'))

    listBlock.appendChild(blockBody)

    contactListEl.appendChild(listBlock)

    value.forEach((item) => {
      const listItem = document.createElement('div');
      listItem.classList.add('list-item');
      listItem.dataset.key = createItemKeyFromProps(Object.values(item));

      const deleteBtn = document.createElement('span');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = '🗙';
      listItem.appendChild(deleteBtn)

      const nameEl = document.createElement('span');
      nameEl.textContent = `name: ${item.name}`;
      listItem.appendChild(nameEl)

      const vacancyEl = document.createElement('span');
      vacancyEl.textContent = `vacancy: ${item.vacancy}`;
      listItem.appendChild(vacancyEl)

      const phoneEl = document.createElement('span');
      phoneEl.textContent = `phone number: ${item.phone}`;
      listItem.appendChild(phoneEl)

      blockBody.appendChild(listItem)
    })
  })
}

const isElementEmpty = (element) => {
  return element.children.length === 0;
}

function clearInputs() {
  nameInput.value = "";
  vacancyInput.value = "";
  phoneNumInput.value = "";
}

function addContact() {
  const contactItem = {
    name: nameInput.value,
    vacancy: vacancyInput.value,
    phone: phoneNumInput.value
  }

  const firstChar = nameInput.value.charAt(0).toLowerCase()

  clearInputs()

  let contacts = JSON.parse(localStorage.getItem('contacts')) || {};

  if (!contacts[firstChar]) {
    contacts[firstChar] = [];
  }

  contacts[firstChar].push(contactItem);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  renderList()
}

function clearList() {
  localStorage.removeItem('contacts');
  renderList();
}

renderList()

controlsWrapper.addEventListener('click', (e) => {
  const target = e.target;

  if(target.classList.contains('add-btn')) addContact();
  if(target.classList.contains('clear-btn')) clearList();
})

contactListEl.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('delete-btn')) {
    const itemCard = target.parentElement
    const itemList = itemCard.parentElement
    const itemBlock = itemList.parentElement

    deleteItem(itemCard.dataset.key)

    itemCard.remove()
    if (isElementEmpty(itemList)) itemBlock.remove();
  }
})

