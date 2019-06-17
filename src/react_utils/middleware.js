import { socket } from '../react_utils/socket';

export function getChatMessages(){
    console.log('trying to emit to Server');
    socket.emit('get-chat');
}