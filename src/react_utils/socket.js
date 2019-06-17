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
            msg => store.dispatch(
                action.chatMessage(msg)
            )
        );
		
        socket.on(
            'connected',
            (msg) => {
                console.log(msg.message);
                store.dispatch(
                    action.chatMessages(msg.messages)				
                );
            }
        );
    }
};
