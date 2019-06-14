/* eslint-disable no-mixed-spaces-and-tabs */
export default function reducer(state = {}, action) {
    console.log('Reducer recieved action', action);
    switch (action.type) {
        case "RECEIVE_FRIENDS_WANNABES":
            return { ...state, friendsWannabes: action.friendsWannabes };
			
        case "ACCEPT_FRIEND_REQUEST":
            console.log('In ACCPET_FRIEND_REQUEST with state', state);
            var newfriendsWannabes = state.friendsWannabes.map(friend => {
                if (friend.id == action.acceptedUserId) {
                    friend.accepted = true;
                    return friend;
                } else {
                    return friend;
                }
            });
            console.log('After mapping accept with state', state);
            return {
                ...state,
                friendsWannabes: newfriendsWannabes
            };
		
        case "UNFRIEND":
            return {
                ...state, 
                friendsWannabes: state.friendsWannabes.filter(friend => friend.id != action.endUserId)
            };
			
        default:
            return state;
    }
    
}