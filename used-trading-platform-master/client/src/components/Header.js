import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderBtn from './HeaderBtn';
import { NavLink, useNavigate } from 'react-router-dom';
import callApi from '../utils/callApi';

const HeaderBlock = styled.div`
  background-color: white;
  border-bottom: 1px solid black;
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin-left: 20px;
    width: 200px;
    height: 60px;
    color: black;
    font-family: 'YES24';
    color: green;
    font-size: 43px;
    text-align: center;
    font-weight: bold;
    line-height: 60px;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }

  .search {
    font-family: 'GyeonggiBatang';
    font-size: 16px;
    width: 440px;
    height: 45px;
    line-height: 40px;
    padding: 0 15px;
    border: 2px solid green;
  }

  .search:focus {
    outline: none;
  }
`;

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInput = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      callApi('get', '/market/product', query);
    } catch (error) {
      console.error(error);
    }
    //성공하면 해당 url로 이동
    navigate('/market', {
      state: { query },
    });
    setQuery('');
  };
  return (
    <HeaderBlock>
      <NavLink to='/' className='logo'>
        영숙마켓
      </NavLink>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='search'
          placeholder='상품명을 입력하세요'
          name='query'
          value={query}
          onChange={handleInput}
        ></input>
      </form>
      <HeaderBtn />
    </HeaderBlock>
  );
}

export default Header;
