import axios from "../axios";

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
        console.log('Recieving incoming chat messages ', messages);
        return {
            type: 'RECIEVING_CHAT',
            messages: messages
        };
    }, 
    chatMessage: function(message){
        console.log('Recieving a chat message ', message);
        return {
            type: 'RECIEVING_CHAT_MESSAGE',
            messages: message
        };
    }
};


export const ActionIds = {
	
};