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
  const { topic, from, msg } = action.payload;

  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from: from,
            msg: msg,
          },
        ],
      };
    default:
      return state;
  }
};

let socket;

const sendChatAction = (value) => {
  socket.emit('chat message', value);
};

const Store = (props) => {
  const [allChats, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', (msg) => {
      console.log({ msg });
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    });
  }

  const user = 'Ali' + Math.random(100).toFixed(2);

  return (
    <Context.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </Context.Provider>
  );
};

export default Store;
