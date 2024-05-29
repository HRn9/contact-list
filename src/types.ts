export type Contact = {
  id: string;
  name: string;
  vacancy: string;
  phone: string;
};

export type RootState = {
  contacts: Contact[];
}

export type MappedContacts = Record<string, Contact[]>