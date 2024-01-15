import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { fetchContacts } from './contactsSlice';

const App = () => {
  useEffect(() => {
    store.dispatch(fetchContacts());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
