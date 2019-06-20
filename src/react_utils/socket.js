import { Action as action } from './redux/actions';
import * as io from 'socket.io-client';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on(
            'chatMessages',
            msgs => store.dispatch(
                action.chatMessages(msgs)
            )
        );

        socket.on(
            'chatMessage',
            msg => {
                store.dispatch(
                    action.chatMessage(msg)
                );
            }
        );
		
        socket.on(
            'connected',
            (data) => {
                console.log('conected data is ', data);
                store.dispatch(
                    action.chatMessages(data.messages)				
                );
                store.dispatch(
                    action.onlineUsers(data.onlineUsers)
                );
                store.dispatch(
                    action.conversations(data.conversations)
                );
                store.dispatch(
                    action.setUserId(data.id)
                );
            }
        );

        socket.on(
            'moreChat',
            data => {
                store.dispatch(
                    action.addMoreMessages(data.messages)
                );
            }
        );
		
        socket.on(
            'updateOnlineUsers',
            data => {
                store.dispatch(
                    action.onlineUsers(data.onlineUsers)
                );
            }
        );
		
        socket.on(
            'newPrivateMessage',
            data => {
                console.log('New private socket in action is ', data.message);
                store.dispatch(
                    action.newPrivateMessage(data.message)
                );
            }
        );
    }
};
