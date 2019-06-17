/* eslint-disable no-mixed-spaces-and-tabs */
export default function reducer(state = {}, action) {

    console.log('in reducer with action' , action);
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
            console.log('In RECIEVING_CHAT_MESSAGE reducer with action', action);
            console.log('The state is ', state);

            var messages = state.messages;
            if (state.messages){
                console.log('Before pushing ', messages);
                messages.push( action.message );
                console.log('after pushing ', messages);

            } else {
                messages = [ action.message ];
            }
            console.log('The messages before resetting the state is ', messages);
			
            var newState = {
                ...state, 
                messages: messages
            };
			
            console.log(' The new state is ', newState);
            return {
                ...state, 
                messages: messages
            };
			
        default:
            return state;
    }
    
}