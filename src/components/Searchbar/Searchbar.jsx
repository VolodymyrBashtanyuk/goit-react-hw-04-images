import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { Header, Form, Button, Input } from './searchBarStyle';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({
      searchName: value.trim(),
    });
  };

  handleSubmit = evt => {
    const { searchName } = this.state;
    const { onSubmit } = this.props;
    const { reset } = this;

    evt.preventDefault();
    onSubmit(searchName.toLowerCase());
    reset();
  };

  reset = () => {
    this.setState({
      searchName: '',
    });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { searchName } = this.state;

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
  }
}
