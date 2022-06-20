import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ErrorBlock = styled.div`
  height: 100vh;
  font-family: 'YES24';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error {
    font-size: 80px;
    margin-bottom: 35px;
  }

  .errorContents {
    margin-bottom: 25px;
    font-size: 25px;
  }

  .homeBtn {
    margin-top: 30px;
    border: 2px solid black;
    padding: 12px;
    font-size: 22px;
    box-shadow: 0px 0px 9px #000;
    text-decoration: none;
    color: black;

    &:hover {
      transform: scale(0.97);
      box-shadow: none;
      cursor: pointer;
    }
  }
`;

function Error() {
  return (
    <ErrorBlock>
      <div className='error'>404 ERROR</div>
      <div className='errorContents'>찾을 수 없는 페이지 입니다.</div>
      <div className='errorContents'>
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요😭
      </div>
      <NavLink to='/' className='homeBtn'>
        홈으로 이동
      </NavLink>
    </ErrorBlock>
  );
}

export default Error;
