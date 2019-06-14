/* eslint-disable no-mixed-spaces-and-tabs */
export default function reducer(state = {}, action) {
    console.log('in reducer with action', action);
    switch (action.type) {
        case "RECEIVE_FRIENDS_WANNABES":
            console.log('Returning state from "RECEIVE_FRIENDS_WANNABES"', { ...state, friendsWannabes: action.friendsWannabes });
            return { ...state, friendsWannabes: action.friendsWannabes };
			
        case "ACCPET_FRIEND_REQUEST":
            console.log('In ACCPET_FRIEND_REQUEST with state', state);
            state.friendsWannabes.map(friend => {
                if (friend.id == action.acceptedUserId) {
                    return friend.accepted = true;
                } else {
                    return friend;
                }
            });
            return {...state};
			
        case "REJECT_FRIEND_REQUEST":
            return {
                ...state, 
                friendsWannabes: state.friendsWannabes.filter(friend => friend.id != action.endUserId)
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