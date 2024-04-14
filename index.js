const controlsWrapper = document.querySelector('.controls__wrapper')
const [ nameInputMain, vacancyInputMain, phoneNumInputMain ] = document.querySelectorAll('.controls__input')
const editsInputGroup = document.querySelectorAll('.editors__input')

const contactListEl = document.querySelector('.contact-list');
const editModal = document.querySelector('.editor-modal');

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

function showElementsError(invalidElement, errorMessage) {
  const parentElement = invalidElement.parentElement;

  const tagName = invalidElement.tagName.toLowerCase()

  const errorEl = document.createElement('span')
  errorEl.classList.add('error-message')
  errorEl.classList.add(`${tagName}-message`)
  errorEl.textContent = errorMessage;

  if (tagName === 'input') errorEl.style.width = `${invalidElement.offsetWidth}px`;

  invalidElement.classList.add('shake');
  parentElement.appendChild(errorEl)

  setTimeout(() => {
    invalidElement.classList.remove('shake');
    errorEl.remove()
  }, 600);
}

function createItemKeyFromProps(itemProps) {
  return itemProps.map((item) => item.replace(' ', 'whitespace')).join('itemSpace');
}

function decodeItemKey(itemKey) {
  const [name, vacancy, phone] = itemKey.split('itemSpace').map((x) => x.replace('whitespace', ' '));
  return { name, vacancy, phone };
}

function deleteItem(itemKey, itemElement) {
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  const contactItem = decodeItemKey(itemKey)
  const firstChar = contactItem.name.charAt(0).toLowerCase()
  const contactList = contacts[firstChar];

  const filteredList = contactList.filter((contact) => 
    contact.name !== contactItem.name || 
    contact.vacancy !== contactItem.vacancy || 
    contact.phone !== contactItem.phone
  );

  filteredList.length < 1 ? delete contacts[firstChar] : contacts[firstChar] = filteredList;

  localStorage.setItem('contacts', JSON.stringify(contacts));

  if (itemElement) {
    const itemCardsList = itemElement.parentElement
    const itemBlock = itemCardsList.parentElement

    decreaseTitleCounter(itemBlock.querySelector('.block-title'))

    itemElement.remove()

    isElementEmpty(itemCardsList) && itemBlock.remove();
    isElementEmpty(contactListEl) && renderEmptyList();
  }
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

  Object.entries(list).sort().forEach((ent) => {
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

      const nameEl = document.createElement('span');
      nameEl.textContent = `name: ${item.name}`;
      listItem.appendChild(nameEl)

      const vacancyEl = document.createElement('span');
      vacancyEl.textContent = `vacancy: ${item.vacancy}`;
      listItem.appendChild(vacancyEl)

      const phoneEl = document.createElement('span');
      phoneEl.textContent = `phone number: ${item.phone}`;
      listItem.appendChild(phoneEl)

      const deleteBtn = document.createElement('span');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = '🗙';
      listItem.appendChild(deleteBtn)

      const editBtn = document.createElement('span');
      editBtn.classList.add('edit-btn');
      editBtn.textContent = '✎';
      listItem.appendChild(editBtn)

      blockBody.appendChild(listItem)
    })
  })
}

const isElementEmpty = (element) => {
  return element.children.length === 0;
}

function clearInputs(inputs) {
  inputs.forEach((inp) => inp.value = '')
}

function createContactItemFromInputs(inputs) {
  const contactItem = {}
  inputs.map((inp) => contactItem[inp.dataset.content] = inp.value)

  return contactItem
}

function addContact(inputs) {
  const contactItem = createContactItemFromInputs(inputs)

  const firstChar = contactItem.name.charAt(0).toLowerCase()

  clearInputs(inputs)

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
  renderEmptyList()
}

function handleContact(targetInputs, submitEl) {
  let handleStatus;
  const contactItem = createContactItemFromInputs(targetInputs)

  if (!isContactNew(contactItem)) { 
    showElementsError(submitEl, 'You already have this contact');
    return
  }

  const validationErrors = [];

  targetInputs.forEach((inp) => {
    const validationRes = validateValue(inp.value, validationRules[inp.dataset.content])

    validationRes && validationErrors.push({ invalidInput: inp, errorMessage: validationRes})
  })

  if (validationErrors.every((x) => x.errorMessage === null)) {
    addContact(targetInputs);
    handleStatus = true;
  } else {
    validationErrors.map((x) => showElementsError(x.invalidInput, x.errorMessage))
    handleStatus = false;
  }

  return handleStatus;
}

function decreaseTitleCounter(titleEl) {
  const counter = titleEl.textContent.match(/\d/);

  titleEl.textContent = titleEl.textContent.replace(/\d/, counter - 1)
}

function disableScroll() {
  document.body.classList.add('no-scroll');
}

function allowScroll() {
  document.body.classList.remove('no-scroll');
}

function getContactListItems() {
  const contactList = JSON.parse(localStorage.getItem('contacts')) || {};
  return Object.values(contactList).flat()
}

function isContactNew(contactItem) {
  return !getContactListItems().find((savedContact) => {
    return savedContact.name === contactItem.name && 
    savedContact.vacancy === contactItem.vacancy &&
    savedContact.phone === contactItem.phone
  })
}

function showEditModal(itemKey) {
  editModal.parentElement.classList.remove('hidden')
  disableScroll()

  editModal.dataset.initialKey = itemKey;
  const targetContactItem = decodeItemKey(itemKey);

  editsInputGroup.forEach((inp) => inp.value = targetContactItem[inp.dataset.content])
}

function closeEditModal() {
  editModal.parentElement.classList.add('hidden')
  clearInputs(editsInputGroup)
  editModal.dataset.initialKey = ''
  allowScroll()
}

function handleContactFromEditModal(editBtn) {
    const inputsArr = Array.from(editsInputGroup)
    const contactItem = createContactItemFromInputs(inputsArr)
    const initialKey = editModal.dataset.initialKey
    const initialContact = decodeItemKey(initialKey)

    if (JSON.stringify(contactItem) === JSON.stringify(initialContact)) {
      closeEditModal()
      return;
    }

    if (handleContact(inputsArr, editBtn)) {
      const prevItemCondition = document.querySelector(`[data-key="${initialKey}"]`)
      deleteItem(initialKey, prevItemCondition)
      closeEditModal()
    }
}

renderList()

document.body.addEventListener('click', (e) => {
  const target = e.target;

  if(target.classList.contains('add-btn')) handleContact([ nameInputMain, vacancyInputMain, phoneNumInputMain ], target);
  if(target.classList.contains('clear-btn')) clearList();

  if (target.classList.contains('delete-btn')) {
    deleteItem(target.parentElement.dataset.key, target.parentElement)
  }

  if (target.classList.contains('edit-btn')) {
    showEditModal(target.parentElement.dataset.key);
  }
  if (target.classList.contains('close-modal-btn') || target.classList.contains('editor-modal__wrapper')) {
    closeEditModal()
  }
  if (target.classList.contains('save-btn')) {
    handleContactFromEditModal(target)
  }
})