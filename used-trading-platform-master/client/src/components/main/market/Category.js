import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CategoryBlock = styled.div`
  width: 954px;
  height: 100px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;

  .categoryBtn {
    border: 1px solid black;
    text-align: center;
    line-height: 45px;
    color: black;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  .active {
    font-weight: bold;
  }
`;

function Category({ categories }) {
  return (
    <CategoryBlock>
      <NavLink to='/market' key={0} className='categoryBtn'>
        {'전체보기'}
      </NavLink>
      {categories.map((category, index) => (
        <NavLink
          to={`/market/categories/${category.cat_id}`}
          key={index}
          className='categoryBtn'
        >
          {category.cat_name}
        </NavLink>
      ))}
    </CategoryBlock>
  );
}

export default Category;
