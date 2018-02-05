import superagent from 'superagent';

import { setSocketAction } from './socket';

export const setRoomAction = room => ({
  type: 'ROOM_SET',
  payload: room,
});

export const removeRoomAction = () => ({
  type: 'ROOM_REMOVE',
});

export const joinRoomAction = (room) => (store) => {
  const { socket } = store.getState();

  socket.emit('join room', room);
  return store.dispatch(setRoomAction(room));
  // TODO: NEED TO SET ROOM STATE AFTER
  // SERVER CONFIRMS THE NAME IS AVAILABLE
};

export const createRoomAction = (room) => (store) => {
  const { socket } = store.getState();
  if (!socket) {
    store.dispatch(setSocketAction(store.dispatch))
      .then(() => {
        const newSocket = store.getState().socket;
        newSocket.emit('create room', room);
      });
  } else {
    socket.emit('create room', room);
  }
};
