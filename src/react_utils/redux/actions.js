import axios from "../axios";

// All aJax requests will go from this file
export const Action = {
    receiveFriendsWannabes: async function(){
        const { data } = await axios.get('/friends-wannabes');
        console.log('friends-wannabes data is ', data);
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
                acceptedUserId: data.user.id
            };
        });
    },
    unfriend: function(otherUserId){
        const data = { id: otherUserId };
        return axios.post('/end-friendship', data).then(({ data }) => {
            console.log('unfriend data is ', data);
            return {
                type: "UNFRIEND",
                endUserId: data.endUserId
            };
        });
    }
};


export const ActionIds = {
	
};