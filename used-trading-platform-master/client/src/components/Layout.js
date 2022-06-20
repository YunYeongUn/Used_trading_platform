import React from 'react';
import styled from 'styled-components';

const LayoutBlock = styled.div`
  width: 1024px;
  margin: 0px auto;
  display: grid;
  grid-template-rows: 100px 50px minmax(calc(100vh - 190px), auto) 40px;
`;

function Layout({ children }) {
  return <LayoutBlock>{children}</LayoutBlock>;
}

export default Layout;
