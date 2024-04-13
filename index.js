const controlsWrapper = document.querySelector('.controls__wrapper')
const [ nameInputMain, vacancyInputMain, phoneNumInputMain ] = document.querySelectorAll('.controls__input')

const contactListEl = document.querySelector('.contact-list');

const validationRules = {
  name: {
    required: true, 
    regexp: /^[a-zA-Z]{3}.*$/,  
    error: 'The name must be at least 3 letters long'
  },
  vacancy: {
    required: true, 
    regexp: /^[a-zA-Z]{3}.*$/,  
    error: 'The vacancy must be at least 3 letters long'
  },
  phone: {
    required: true,
    regexp: /^(\+?)[78]\d{10}$/,
    error: 'The number must folow RU region format'
  }
}

function validateValue(value, validationObj) {
  const trimmedValue = value?.trim() || '';

  if (validationObj.required && trimmedValue === '') return 'This field cannot be left blank.';

  return trimmedValue.match(validationObj.regexp) ? null : validationObj.error
}

function showError({ invalidInput, errorMessage }) {
  const inputContainer = invalidInput.parentElement;

  const errorEl = document.createElement('span')
  errorEl.classList.add('error-message')
  errorEl.textContent = errorMessage;
  errorEl.style.width = `${invalidInput.offsetWidth}px`;

  invalidInput.classList.add('shake');
  inputContainer.appendChild(errorEl)

  setTimeout(() => {
    invalidInput.classList.remove('shake');
    errorEl.remove()
  }, 600);
    
}

function createItemKeyFromProps(itemProps) {
  return itemProps.map((item) => item.replace(' ', 'whitespace')).join('itemSpace');
}

function decodeItemKey(itemKey) {
  return itemKey.split('itemSpace').map((x) => x.replace('whitespace', ' '))
}

function deleteItem(itemKey, itemElement) {
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  const [name, vacancy, phone] = decodeItemKey(itemKey)
  const firstChar = name.charAt(0).toLowerCase()
  const contactList = contacts[firstChar];

  const filteredList = contactList.filter((contact) => 
    contact.name !== name || contact.vacancy !== vacancy || contact.phone !== phone
  );

  filteredList.length < 1 ? delete contacts[firstChar] : contacts[firstChar] = filteredList;

  localStorage.setItem('contacts', JSON.stringify(contacts));

  itemElement && itemElement.remove()
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

function clearInputs() { // refactor to independent inputs 
  nameInputMain.value = "";
  vacancyInputMain.value = "";
  phoneNumInputMain.value = "";
}

function addContact() { // refactor to independent inputs 
  const contactItem = {
    name: nameInputMain.value,
    vacancy: vacancyInputMain.value,
    phone: phoneNumInputMain.value
  }

  const firstChar = nameInputMain.value.charAt(0).toLowerCase()

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

function handleContact(targetInputs) {
  const validationErrors = [];

  targetInputs.forEach((inp) => {
    const validationRes = validateValue(inp.value, validationRules[inp.dataset.content])

    validationRes && validationErrors.push({ invalidInput: inp, errorMessage: validationRes})
  })

  validationErrors.every((x) => x.errorMessage === null) ? addContact() : validationErrors.map((x) => showError(x))
}

renderList()

controlsWrapper.addEventListener('click', (e) => {
  const target = e.target;

  if(target.classList.contains('add-btn')) handleContact([ nameInputMain, vacancyInputMain, phoneNumInputMain ]);
  if(target.classList.contains('clear-btn')) clearList();
})

contactListEl.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('delete-btn')) {
    const itemCard = target.parentElement
    const itemCardsList = itemCard.parentElement
    const itemBlock = itemCardsList.parentElement

    deleteItem(itemCard.dataset.key, itemCard)

    isElementEmpty(itemCardsList) && itemBlock.remove();
    isElementEmpty(contactListEl) && renderEmptyList();
  }
})