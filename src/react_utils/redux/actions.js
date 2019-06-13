import axios from "../axios";

// All aJax requests will go from this file
export const Action = {
    receiveFriendsWannabes: function(){
        return axios.get('/friends-wannabes').then(({ data }) => {
            console.log('Friends wanabees data is ', data);
            return {
                type: 'GET_WANNA_BEES',
                friendsWannabes: data
            };
        });
    },
	
    acceptFriendRequest: function(otherUserId){
        const data = { id: otherUserId };
        return axios.post('/accept-friendship', data).then(({ data }) => {
            console.log('AcceptFriendRequest data is ', data);
            return {
                type: 'GET_WANNA_BEES',
                acceptedUserId: data.user.id
            };
        });
    },
	
    unfriend: function(otherUserId){
        const data = { id: otherUserId };
        return axios.post('/end-friendship', data).then(({ data }) => {
            console.log('unfriend data is ', data);
            return {
                type: 'GET_WANNA_BEES',
                endUserId: data.endUserId
            };
        });
    }
};


export const ActionIds = {
	
};