import { ContactItem } from "../../models/contact-item";

export function createContactItemFromInputs(inputs: HTMLInputElement[]): ContactItem {
  const contactItem: { [key: string]: string } = {}
  
  inputs.forEach((inp) => {
    const content = inp.dataset?.content;
    if (content) {
      contactItem[content] = inp.value;
    }
  })

  return contactItem as ContactItem
}