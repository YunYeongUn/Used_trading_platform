import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import axios from 'axios';

const HeaderBtnBlock = styled.div`
  .profile {
    width: 240px;
    display: flex;
    justify-content: flex-end;
  }

  .profileButtons {
    width: 100px;
    height: 45px;
    border: 2px solid black;
    line-height: 43px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    color: black;

    /* 버튼 사이의 간격 */
    &:not(:first-child) {
      margin: 0 20px;
    }

    &:hover {
      background-color: #dfdfde;
      transform: scale(0.98);
      cursor: pointer;
    }
  }
`;

function HeaderBtn() {
  // url 이동을 위한 useNavigate
  const navigate = useNavigate();

  // 글로벌 전역 상태값 loggedIn, setLoggedIn, setLoggedUser를 받아옴
  const { loggedIn, setLoggedIn, setLoggedUser } = useContext(Context);

  const handleLogout = async e => {
    const callApi = async e => {
      try {
        const res1 = await axios.post(
          `${process.env.REACT_APP_URL}/auth/logout`,
          {},
          { withCredentials: true }
        );
        setLoggedIn(false);
        alert(res1.data);

        const res2 = await axios.get(`${process.env.REACT_APP_URL}/auth/user`, {
          withCredentials: true,
        });
        setLoggedUser(res2.data);
      } catch (error) {
        alert(error.response.data);
      }
    };
    callApi();
  };

  const handleSellBtn = async e => {
    if (loggedIn) {
      navigate('/market/create');
    } else {
      alert('로그인 후 이용가능합니다.');
      navigate('/login');
    }
  };

  return (
    <HeaderBtnBlock>
      <div className='profile'>
        {loggedIn ? (
          <div className='profileButtons' onClick={handleLogout}>
            로그아웃
          </div>
        ) : (
          <NavLink to='/login' className='profileButtons'>
            로그인
          </NavLink>
        )}
        <div className='profileButtons' onClick={handleSellBtn}>
          판매하기
        </div>
      </div>
    </HeaderBtnBlock>
  );
}

export default HeaderBtn;
