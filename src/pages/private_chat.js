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
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}
	
    render(){
		var conversations =  this.props.conversations;
		const activeChatId =  this.props.match && this.props.match.params.id;
		var activeUser;
		var activeChat = this.props.activeChat;
		if (activeChat) { 
			activeChat = activeChat.filter((message) => message);
			activeUser = conversations[0][0].first;
		}
		
		
		
        return (
            <Column
                padding='20px'>
					<h1>Private chat</h1>

					<Row
						borderRadius='20px'
						border= 'solid black 2px'
						borderTop= '2px solid black'
						borderBottom= '2px solid black'
						margin='20px'
						maxHeight='800px'
						minHeight='600px'
						boxSizing='border-box'>
						<Column
							alignSelf='self-start'
							height="100%"
							overFlow="scroll"
							scrollHeight="auto"
							borderTop= 'solid black 2px'
							borderRadius='20px 0px 0px 20px'
							padding='30px'
							boxSizing='border-box'
							>
							<h2>Conversations</h2>
							{ conversations && 
								conversations.map(conversation => { 
									return (
									<ConversationTile 
										key={conversation[conversation.length -1 ].id} 
										message={ conversation[conversation.length -1 ]} 
										/>
									);
									})
							}
						</Column>
					
						{ activeChatId && 
						<Column 
							alignSelf='self-start'
							padding='30px'
							flex-flow='column'
							borderLeft= 'solid black 2px'
							boxSizing='border-box'
							>
							{ activeUser && <h2>{activeUser + ' ' +'Chat'}</h2>}
							<Column
								id='chat'
								flexWrap='none'
								height='400px'
								overflow='scroll'
								padding='30px'
								alignSelf='self-start'
								border= 'solid black'
								referance={this.elemRef}
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
		if ( this.props.activeChat ){
			this.scrollToBottom();
		}
	}
	
	scrollToBottom() {
		this.elemRef.current.scrollTop =
            this.elemRef.current.scrollHeight +
            this.elemRef.current.offsetHeight;
	}

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = (state) => {
	console.log('The state mapStateToProps is in private chat' 	, state);
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

	if (state.activeChatId && state.conversations) {
		
		const activeChatId = state.activeChatId;
		const activeChat = state.conversations[activeChatId];
		// var activeUser;
		const array = [];
		for (const key in activeChat) {
				const element = activeChat[key];
				array.push(element);
		}
		

		console.log('The new conversations are', conversations);
		
		return {
			conversations: conversations,
			activeChat: array,
			// activeUser: activeUser
		};

	} else {

		return {
			conversations: conversations,
		};
	}
};


export default connect(mapStateToProps)(PrivateChat);