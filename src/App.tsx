import { Provider } from "react-redux";
import contactsStore from "./store/contacts-state";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import './styles.scss';

const App = () => {
  return (
    <Provider store={contactsStore}>
        <h1 style={{ textAlign: "center" }}>Contact list on React</h1>
        <ContactForm />
        <ContactList />
    </Provider>
  );
};

export default App;
