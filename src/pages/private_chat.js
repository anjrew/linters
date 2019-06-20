/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { Action as action } from '../react_utils/redux/actions';

// COMPONENTS
import { MessageTile } from '../components/boxes/message_tile';
import { ConversationTile } from '../components/boxes/conversation_tile';
import { Column } from '../components/layout/column';
import { Row } from '../components/layout/row';
import { SubmitMessage } from '../components/modules/submit-message'; 
import { socket } from '../react_utils/socket';

class PrivateChat extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
			message: '',
		};
		this.elemRef = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}
	
    render(){
		const activeChatId =  this.props.match && this.props.match.params.id;
		var activeUser;
		var activeChat = this.props.activeChat;
		if (activeChat) { 
			activeChat = activeChat.filter((message) => message);
			activeUser = activeChat[0] ? activeChat[0].first :  activeChat[1].first ;
		}
		
		var conversations =  this.props.conversations;
		
        return (
            <Column
                padding='20px'>
					<h1>Private chat</h1>

					<Row
						margin='20px'>
						<Column
							alignSelf='self-start'
							height="100%"
							margin="30px 0px"
							overFlow="scroll" >
							<h2>Conversations</h2>
							{ conversations && 
								conversations.map(conversation => { 
									return (
									<ConversationTile 
										key={conversation[0].id} 
										message={ conversation[0]} 
										/>
									);
									})
							}
						</Column>
					
						{ activeChatId && 
						<Column 
							alignSelf='self-start'
							padding='30px'
							referance={this.elemRef}
							flex-flow='column'
							>
							{ activeUser && <h2>{activeUser + 'Chat'}</h2>}
							<Column
								flexWrap='none'
								height='400px'
								overflow='scroll'
								padding='30px'
								alignSelf='self-start'
								borderLeft={ 'black groove 2px' }
								>
								{ activeChat && activeChat.map(message => {
									{ message && 
										console.log('');
										return (
											<MessageTile key={message.id} message={ message } />
											);
										}
									}
									)}
							</Column>
							<SubmitMessage
								submit={ (message) => 
									socket.emit('privateMessage',{ 
										recieverId: activeChatId,
										message: message })}
								/>
						</Column>
					}
				</Row>
            </Column>
        );
	}

	componentDidMount(){
		this.props.match && this.props.dispatch(action.setActiveChat(this.props.match.params.id));
	}

	componentDidUpdate() {
		if ( this.props.activeUser ){
			this.elemRef.current.scrollTop =
            this.elemRef.current.scrollHeight - this.elemRef.current.offsetTop;
		}
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = (state) => {
	console.log('The state mapStateToProps is in private chat' 	, state);

	if (state.activeChatId && state.conversations) {
		
		const activeChatId = state.activeChatId;
		const activeChat = state.conversations[activeChatId];
		// var activeUser;
		const array = [];
		for (const key in activeChat) {
				const element = activeChat[key];
				array.push(element);
		}
		var conversations = [];
		for (const conversation in state.conversations) {
			if (state.conversations[conversation]) {
				conversations.push([...state.conversations[conversation]]);
			}
		}
		// console.log('the Conversations to be rendered are', conversations);

		conversations = conversations.map( (conversation) => {
			// console.log(' IN conversation', conversation);
			return conversation.filter( (message) => {
				// console.log('in message', message);
				if (message ){
					if (message.sender_id != message.currentUserId) {
						return message;
					}
				}
			});
		});

		console.log('The new conversations are', conversations);
		
		return {
			conversations: conversations,
			activeChat: array,
			// activeUser: activeUser
		};

	} else {
		return {
			conversations: state.conversations,
		};
	}
};


export default connect(mapStateToProps)(PrivateChat);