export function showElementsError(invalidElement: HTMLElement, errorMessage: string): void {
  const parentElement = invalidElement.parentElement;

  const tagName = invalidElement.tagName.toLowerCase()

  const errorEl = document.createElement('span')
  errorEl.classList.add('error-message')
  errorEl.classList.add(`${tagName}-message`)
  errorEl.textContent = errorMessage;

  if (tagName === 'input') errorEl.style.width = `${invalidElement.offsetWidth}px`;

  invalidElement.classList.add('shake');
  parentElement?.appendChild(errorEl)

  setTimeout(() => {
    invalidElement.classList.remove('shake');
    errorEl.remove()
  }, 600);
}