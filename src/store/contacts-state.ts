import { createStore } from "redux";
import { Contact, RootState } from "../types";

type ContactsAction =
  | {
      type: "ADD_CONTACT";
      payload: Contact;
    }
  | {
      type: "DELETE_CONTACT";
      payload: string;
    }
  | {
      type: "UPDATE_CONTACT";
      payload: Contact;
    }
  | {
      type: "CLEAR_STORE";
    };

const initialState: RootState = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
};

function contactsReducer(state = initialState, action: ContactsAction) {
  switch (action.type) {
    case "ADD_CONTACT":
      const newContacts = [...state.contacts, action.payload];
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      return { ...state, contacts: newContacts };
    case "DELETE_CONTACT":
      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      return { ...state, contacts: updatedContacts };
    case "UPDATE_CONTACT":
      const updatedContactsList = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...action.payload };
        }
        return contact;
      });
      localStorage.setItem("contacts", JSON.stringify(updatedContactsList));
      return { ...state, contacts: updatedContactsList };
    case "CLEAR_STORE":
      localStorage.setItem("contacts", "[]");
      return { ...state, contacts: [] };
    default:
      return state;
  }
}

const contactsStore = createStore(contactsReducer);

export default contactsStore;
