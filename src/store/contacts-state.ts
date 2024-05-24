import { createStore } from "redux";
import { Contact, RootState } from "../types";

type ContactsAction =
  | {
      type: "ADD_CONTACT";
      payload: Contact;
    }
  | {
      type: "REMOVE_CONTACT";
      payload: number;
    }
  | {
      type: "UPDATE_CONTACT";
      payload: { id: number; newData: Contact };
    };

const initialState: RootState = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
};

function contactsReducer(
  state = initialState,
  action: ContactsAction
): RootState {
  switch (action.type) {
    case "ADD_CONTACT":
      const newContacts = [...state.contacts, action.payload];
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      return { ...state, contacts: newContacts };
    case "REMOVE_CONTACT":
      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      return { ...state, contacts: updatedContacts };
    case "UPDATE_CONTACT":
      const updatedContactsList = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...contact, ...action.payload.newData };
        }
        return contact;
      });
      localStorage.setItem("contacts", JSON.stringify(updatedContactsList));
      return { ...state, contacts: updatedContactsList };
    default:
      return state;
  }
}

const contactsStore = createStore(contactsReducer);

export default contactsStore;
