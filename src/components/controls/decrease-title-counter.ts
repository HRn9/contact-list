export function decreaseTitleCounter(titleEl: HTMLElement): void {
  const title = titleEl.textContent || '';
  const match = title.match(/\b(\d+)\b/);

  if (match && match[1]) {
    const counter = parseInt(match[1], 10);
    titleEl.textContent = title.replace(match[1], (counter - 1).toString());
  }
}