import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { Header, Form, Button, Input } from './searchBarStyle';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = evt => {
    const { value } = evt.currentTarget;
    setSearchName(value.trim());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchName.toLowerCase());
    setSearchName('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch className="icon-serch" />
          Search
        </Button>

        <label>
          <Input
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={searchName}
            autoFocus
            placeholder="Search images and photos"
          />
        </label>
      </Form>
    </Header>
  );
};
