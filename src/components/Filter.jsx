import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './contactsSlice';

const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor="filterInput">Find contacts by name</label>
      </div>
      <div>
        <input
          type="text"
          id="filterInput"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Filter;
