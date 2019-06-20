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
                store.dispatch(
                    action.chatMessages(data.messages)				
                );
                store.dispatch(
                    action.onlineUsers(data.onlineUsers)
                );
                store.dispatch(
                    action.conversations(data.conversations)
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
                store.dispatch(
                    action.newPrivateMessage(data.message)
                );
            }
        );
    }
};
