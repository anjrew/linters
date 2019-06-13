import axios from "../axios";

// All aJax requests will go from this file
export const Action = {
    receiveFriendsWannabes: function(){
        return axios.get('/get-friends-wannabees').then(({ data }) => {
            return {
                type: 'GET_WANNA_BEES',
                wannabees: data
            };
        });
    },
	
    //TODO:
    acceptFriendRequest: function(status){
        return axios.post('/api/friend-button', data).then(({ data }) => {
            return {
                type: 'GET_WANNA_BEES',
            };
        });
    },
	
    //TODO:
    unfriend: function(status){
        return axios.post('/api/friend-button', data).then(({ data }) => {
            return {
                type: 'GET_WANNA_BEES',
            };
        });
    }
};


export const ActionIds = {
	
}