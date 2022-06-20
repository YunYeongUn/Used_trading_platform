import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBlock = styled.div`
  padding: 10px 40px;
  background-color: white;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 10;
  top: 100px;

  .navButtons {
    width: auto;
    height: 30px;
    padding: 0 3px;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    font-size: 15px;
    color: black;
    text-decoration: none;

    /* 버튼 사이의 간격 */
    &:not(:first-child) {
      margin-left: 80px;
    }

    &:hover {
      color: green;
    }
  }
  .active {
    color: green;
    text-decoration: underline;
    text-underline-position: under;
  }
`;

function Navigation() {
  return (
    <NavBlock>
      <NavLink to='/group' className='navButtons'>
        조원소개
      </NavLink>
      <NavLink to='/market' className='navButtons'>
        중고장터
      </NavLink>
      <NavLink to='/board' className='navButtons'>
        자유게시판
      </NavLink>
    </NavBlock>
  );
}

export default Navigation;
