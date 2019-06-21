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
		console.log('this.props',this.props);
		var activeChatId;
		activeChatId = this.props.match && this.props.match.params && this.props.match.params.id;
		var activeUser;
		var activeChat = this.props.activeChat;
		console.log('Active chat id is', activeChatId);

		if (activeChat) { 
			activeChat = activeChat.filter((message) => { 
				if (message != null){ 
					return  message;
				}
			});
			if (conversations[0]){
				if (conversations[0][0]){
					activeUser = conversations[0][0].first;
				}
			}
		}
		console.log('active user', activeUser);
		
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
							{ 
								conversations  &&
								conversations.map(conversation => { 
									if (conversation.length > 1){
										return (
											<ConversationTile 
											key={conversation[conversation.length -1 ].id} 
											message={ conversation[conversation.length -1 ]} 
											/>
											);
									}
									if (conversation.length == 1){
										return (
											<ConversationTile 
											key={conversation[0].id} 
											message={ conversation[0]} 
											/>
											);
									}
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
								width='unset'
								overflow='scroll'
								padding='30px'
								border= 'solid black'
								referance={this.elemRef}
								>
								{ activeChat && activeChat.map(message => {
									{ message && 
										console.log('');
										return (
											<MessageTile key={message.id} message={ message } updated={ () => this.scrollToBottom()}/>
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
		// this.props.dispatch(action.setActiveChat(this.props.match.params.id));

		if ( this.props.activeChat ){
			this.scrollToBottom();
		}
	}
	
	scrollToBottom() {
		// this.elemRef.current.scrollIntoView({ behavior: "smooth" });
		if (this.elemRef &&  this.elemRef.current){
			this.elemRef.current.scrollTop =
            this.elemRef.current.scrollHeight +
            this.elemRef.current.offsetHeight;
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
	var conversations = [];
		for (const conversation in state.conversations) {
			if (state.conversations[conversation]) {
				conversations.push([...state.conversations[conversation]]);
			}
		}

		conversations = conversations.map( (conversation) => {
			return conversation.filter( (message) => {
				if (message ){
					if (message.sender_id != message.currentUserId) {
						return message;
					} else {
						const sender_id = message.currentUserId;
						message.sender_id = currentUserId;

						const currentUserId = sender_id;
						message.currentUserId = sender_id;

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