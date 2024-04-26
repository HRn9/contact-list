export function clearInputs(inputs: HTMLInputElement[]): void {
  inputs.forEach((inp) => inp.value = '')
}