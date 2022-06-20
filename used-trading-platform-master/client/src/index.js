import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ContextProvider = ({ children }) => {
  const setLoggedUser = data => {
    setState(prevState => ({
      ...prevState,
      loggedUser: data,
    }));
  };

  const setLoggedIn = condition => {
    setState(prevState => ({
      ...prevState,
      loggedIn: condition,
    }));
  };

  const initialState = {
    loggedUser: {},
    loggedIn: false,
    setLoggedUser,
    setLoggedIn,
  };

  const [state, setState] = useState(initialState);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
