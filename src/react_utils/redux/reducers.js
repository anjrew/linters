/* eslint-disable no-mixed-spaces-and-tabs */
export default function reducer(state = {}, action) {
    console.log('in reducer with action', action);
    switch (action.type) {
        case "RECEIVE_FRIENDS_WANNABES":
            console.log('Returning state from "RECEIVE_FRIENDS_WANNABES"', { ...state, friendsWannabes: action.friendsWannabes });
            return { ...state, friendsWannabes: action.friendsWannabes };
			
        case "ACCPET_FRIEND_REQUEST":
            state.map(friend => {
                if (friend.id == action.acceptedUserId) {
                    return friend.accepted = true;
                } else {
                    return friend;
                }
            });
            return {...state};
		
        case "UNFRIEND":
            state.friendsWannabes.filter(friend => {
                if (friend.id == action.endUserId) {
                    return null;
                } else {
                    return friend;
                }
            });
            return {...state};
			
        default:
            return state;
    }
    
}