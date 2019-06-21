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
            return {
                ...state, 
                messages: [ action.message, ...state.messages ]
            };
			
        case "RECIEVING_ONLINE_USERS":
            return {
                ...state,
                onlineUsers: action.onlineUsers
            };
			
        case "RECIEVING_MORE_CHAT":
            return {
                ...state,
                messages: [  ...state.messages, ...action.messages ]
            };
		
        case "RECEIVING_NEW_PRIVATE_MESSAGE":
          
            var newChat = state.conversations[state.activeChatId];
            if (newChat[1]) {
                action.message.currentUserId = newChat[1].currentUserId;
            }
            newChat.push(action.message);
			
            var newStateChat = state.conversations;
            newStateChat[state.activeChatId] = newChat;

            return {
                ...state,
                conversations: newStateChat
            };

        case "RECEIVING_NEW_CONVERSATIONS":
            return {
                ...state,
                conversations: action.conversations
            };
			
        case "SET_ACTIVE_CHAT_ID":
            return {
                ...state,
                activeChatId: action.activeChatId
            };

        default:
            return state;
    }
    
}