import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useSelector } from 'react-redux';

const SearchPannel = () => {
  const [inputValue, setInputValue] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const theme = useSelector((state) => state.auth.theme);
  const onSubmit = (value) => {
    console.log(value.searchValue);
    setInputValue(null);
    reset();
  };

  return (
    <form className={`search-form search-form_${theme}`} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`search-form__input text-input${inputValue ? '__filled' : ''}`}
        type="text"
        {...register('searchValue', {
          onChange: (e) => {
            console.log(e);
            setInputValue(e.target.value);
            console.log(e.nativeEvent.data);
          },
        })}
        placeholder="Поиск"
      />
      <input className={`search-form__input search-input${inputValue ? '__filled' : ''}`} type="submit" value="  " />
    </form>
  );
};
export default SearchPannel;
