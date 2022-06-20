import React, { useEffect, useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Login, Register, Semester, Error } from './pages';
import HomeRouter from './routes/HomeRouter';
import axios from 'axios';
import Context from './context/Context';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GyeonggiBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'YES24';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YES24.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    // background: #e9ecef;
    font-family: 'GyeonggiBatang';
  }
`;

function App() {
  const { setLoggedIn, setLoggedUser } = useContext(Context);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/auth/user`, {
          withCredentials: true,
        });
        if (res.data.id) {
          setLoggedUser({ id: res.data.id });
          setLoggedIn(true);
        } else {
          setLoggedUser({});
          setLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    callApi();
  }, [setLoggedUser, setLoggedIn]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        {/* Home Page */}
        <Route path='/*' element={<HomeRouter />} />
        {/* Login Page */}
        <Route path='/login' element={<Login />} />
        {/* Register Page */}
        <Route path='/register' element={<Register />} />
        {/* Semester Page */}
        <Route path='/semester' element={<Semester />} />
        {/* Error Page */}
        <Route path='/error' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
