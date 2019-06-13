/* eslint-disable no-mixed-spaces-and-tabs */
export default function reducer(state = {}, action) {
    switch (action) {
        case "GET_WANNA_BEES":
            return { ...state, wannabees: action.wannabees };
			
        case "ACCPET_FRIEND_REQUEST":
            return {...state, };
		
        case "UNFRIEND":
            return;
			
        default:
            return state;
    }
    
}