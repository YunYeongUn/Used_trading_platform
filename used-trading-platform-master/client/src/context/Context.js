import { createContext } from 'react';

const Context = createContext({
  loggedUser: {
    id: '',
  },
  loggedIn: false,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
});

export default Context;
