import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaSistrix } from 'react-icons/fa';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarStyled,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ createSearchText }) => {
  const [inputValue, setInputValue] = useState('');
  const prevInputValueRef = useRef('');

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (prevInputValueRef.current !== inputValue) {
      createSearchText(inputValue);
    }
    prevInputValueRef.current = inputValue;
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FaSistrix size="20" />
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={inputValue}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  createSearchText: PropTypes.func.isRequired,
};
