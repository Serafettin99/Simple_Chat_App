import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';

export const Context = createContext();
const initialState = {
  general: [
    { from: 'Ali', msg: 'hello, my name is Ali' },
    { from: 'Veli', msg: 'hello, my name is Veli' },
    { from: 'Yunus', msg: 'hello, my name is Yunus' },
  ],
  topic: [
    { from: 'Ahmet', msg: 'hello, my name is Ahmet' },
    { from: 'Mehmet', msg: 'hello, my name is Mehmet' },
    { from: 'Mustafa', msg: 'hello, my name is Mustafa' },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [action.payload.topic]: [
          ...state[action.payload.topic],
          {
            from: action.payload.from,
            msg: action.payload.msg,
          },
        ],
      };
    default:
      return state;
  }
};

let socket;

export const Store = ({ children }) => {
  if (!socket) {
    socket = io(':3001');
  }
  const reducerHook = useReducer(reducer, initialState);
  return <Context.Provider value={reducerHook}>{children}</Context.Provider>;
};

export default Store;
