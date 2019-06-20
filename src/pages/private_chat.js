/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { Action as action } from '../react_utils/redux/actions';

// COMPONENTS
import { MessageTile } from '../components/boxes/message_tile';
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
		console.log(this.props);
		const conversations =  this.props.conversations;
		const activeChatId =  this.props.match && this.props.match.params.id;
		const activeUser = this.props.activeUser;
		const activeChat = this.props.activeChat;
        return (
            <Column
                padding='20px'>
					<h1>Private chat</h1>

					<Row
						margin='20px'>
						<Column 
							overFlow="scroll" >
							<h2>Conversations</h2>
							{ conversations && conversations.map(message => (
								<MessageTile key={message.id} message={ message } />
							))}
                		</Column>
					
						{ activeChatId && <Column padding='30px'
							referance={this.elemRef}
							overFlow="scroll" borderLeft={ 'black groove 2px' }>
							<h2>{activeUser}</h2>
							{ activeChat && activeChat.messages.map(message => (
								<MessageTile key={message.id} message={ message } />
							))}
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

	const activeChatis
	// const conversations;
	// const activeChat;
	console.log('the state in match to props is' ,state);
	var activeChat = state.conversations.filter((convo)=>{
		console.log(' the object is ', convo);
		console('Object is ', convo is)
	})

    return { conversations: state.conversations };
};


export default connect(mapStateToProps)(PrivateChat);