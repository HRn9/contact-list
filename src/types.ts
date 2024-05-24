export type Contact = {
  id: number;
  name: string;
  vacancy: string;
  phone: string;
};

export type RootState = {
  contacts: Contact[];
}

export type MappedContacts = Record<string, Contact[]>