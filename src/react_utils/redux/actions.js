import axios from "../axios";
import { socket } from '../socket';

// All aJax requests will go from this file
export const Action = {
    receiveFriendsWannabes: async function(){
        const { data } = await axios.get('/friends-wannabes');
        return {
            type: "RECEIVE_FRIENDS_WANNABES",
            friendsWannabes: data || 'none'
        };
    },
    acceptFriendRequest: function(otherUserId){
        const data = { id: otherUserId };
        return axios.post('/accept-friendship', data).then(({ data }) => {
            console.log('AcceptFriendRequest data is ', data);
            return {
                type: "ACCEPT_FRIEND_REQUEST",
                acceptedUserId: otherUserId
            };
        });
    },
    unfriendReject: function(otherUserId){
        const data = { id: otherUserId };
        return axios.post('/end-friendship', data).then(({ data }) => {
            return {
                type: "UNFRIEND",
                endUserId: data.endUserId
            };
        });
    },
    chatMessages: function(messages){
        return {
            type: 'RECIEVING_CHAT',
            messages: messages
        };
    },
    addMoreMessages: function(messages){
		console.log('In addMoreMessages with messages ', messages);
        return {
            type: 'RECIEVING_MORE_CHAT',
            messages: messages
        };
    },
    chatMessage: function(message){
        return {
            type: 'RECIEVING_CHAT_MESSAGE',
            message: message.message
        };
    },
    getChatMessages(){
        socket.emit('getChat');
        return {
            type: 'BYPASS'
        };
    },
    onlineUsers: function (onlineUsers) {
        return {
            type: "RECIEVING_ONLINE_USERS",
            onlineUsers: onlineUsers
        };
    }
};


export const ActionIds = {
	
};