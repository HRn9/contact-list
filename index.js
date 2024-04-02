const [ addBtn, cleanBtn, searchBtn ] = document.querySelectorAll('button')
const [ nameInput, vacancyInput, phoneNumInput ] = document.querySelectorAll('input')
const isLsEmpty = !localStorage.contacts;

const contactListEl = document.querySelector('.contact-list');

function renderEmptyList() {
  contactListEl.innerHTML = "";

  const emptyMessage = document.createElement('h3');
  emptyMessage.classList.add('empty-message')
  emptyMessage.textContent = "You don't have any contacts yet";

  contactListEl.appendChild(emptyMessage)
}

function renderList() {
  const list = JSON.parse(localStorage.getItem('contacts'))

  contactListEl.innerHTML = "";

  Object.entries(list).forEach((ent) => {
    const [key, value] = ent;

    const listBlock = document.createElement('div');
    listBlock.classList.add('list-block');

    const blockTitle = document.createElement('span');
    blockTitle.textContent = key.toUpperCase();
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

isLsEmpty ? renderEmptyList() : renderList();

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

addBtn.addEventListener('click', addContact)
