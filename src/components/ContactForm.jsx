import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from './contactsSlice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleAddContact = () => {
    if (name.trim() === '' || number.trim() === '') {
      alert('Name and number cannot be empty');
      return;
    }

    const isContactUnique = contacts.every(
      contact => contact.name.toLowerCase() !== name.toLowerCase()
    );
    if (!isContactUnique) {
      alert('Contact with this name already exists');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
    alert('Contact added successfully');
  };

  return (
    <div>
      <h3>Name</h3>
      <input type="text" name="name" value={name} onChange={handleNameChange} />
      <h3>Number</h3>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleNumberChange}
      />
      <div>
        <button type="button" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
