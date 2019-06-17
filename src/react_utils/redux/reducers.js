/* eslint-disable no-mixed-spaces-and-tabs */
export default function reducer(state = {}, action) {
    switch (action.type) {
        case "RECEIVE_FRIENDS_WANNABES":
            return { ...state, friendsWannabes: action.friendsWannabes };
			
        case "ACCEPT_FRIEND_REQUEST":
            var newfriendsWannabes = state.friendsWannabes.map(friend => {
                if (friend.id == action.acceptedUserId) {
                    friend.accepted = true;
                    return friend;
                } else {
                    return friend;
                }
            });
            return {
                ...state,
                friendsWannabes: newfriendsWannabes
            };
		
        case "UNFRIEND":
            return {
                ...state, 
                friendsWannabes: state.friendsWannabes.filter(friend => friend.id != action.endUserId)
            };

        case "RECIEVING_CHAT":
            return {
                ...state, 
                messages: action.messages
            };

        case "RECIEVING_CHAT_MESSAGE":

            var messages = state.messages;
            if (state.messages){
                messages.push( action.message );

            } else {
                messages = [ action.message ];
            }
            return {
                ...state, 
                messages: messages
            };
			
        default:
            return state;
    }
    
}