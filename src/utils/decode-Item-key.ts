import { ContactItem } from "../models/contact-item";

export function decodeItemKey(itemKey: string): ContactItem {
  const [name, vacancy, phone] = itemKey.split('itemSpace').map((x) => x.replace('whitespace', ' '));
  return { name, vacancy, phone };
}