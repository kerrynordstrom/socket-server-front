import openSocket from 'socket.io-client';
import { setRoomAction } from '../action/room';

export default dispatch => { // TODO: Rob - takes in dispatch to allow state changing
  const socket = openSocket(API_URL);

  socket.on('room conflict', data => {
    console.log(data); 
    // TODO: HANDLE ROOM CONFLICT, modal popup warning
  });

  socket.on('room created', room => {
    console.log(room); 
    // TODO: HANDLE ROOM CREATION, take to room dashboard
    // TODO: SET STATE of ROOM to owner: true
    dispatch(setRoomAction(room));
  });

  socket.on('room joined', data => {
    console.log(data); 
    // TODO: HANDLE ROOM JOINED, take to room dashboard
    // TODO: SET STATE of ROOM to owner: false
  });

  socket.on('room not found', data => {
    console.log(data); 
    // TODO: HANDLE ROOM NOT FOUND, modal popup warning
  });

  socket.on('room closed', data => {
    console.log(data); 
    // TODO: HANDLE ROOM NOT FOUND, modal popup warning
  });

  return socket;
};

export const createRoomEmit = (room, socket) => {
  // TODO: Kerry - Consider a socket class with this page's methods defined within
  socket.emit('create room', room);
};
