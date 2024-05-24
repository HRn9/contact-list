import { createStore } from "redux";
import { Contact } from "../types";

type ContactsState = {
  contacts: Contact[];
};

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

const initialState: ContactsState = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
};

function contactsReducer(
  state = initialState,
  action: ContactsAction
): ContactsState {
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

const store = createStore(contactsReducer);

export default store;
