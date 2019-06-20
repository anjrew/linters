/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';

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
		const conversations =  this.props.conversations;
		const activeChat =  this.props.activeChat;
		const activeUser = this.props.activeUser;
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
					
						{ activeChat && <Column padding='30px'
							referance={this.elemRef}
							overFlow="scroll" borderLeft={ 'black groove 2px' }>
							<h2>{activeUser}</h2>
							{ activeChat.messages && activeChat.messages.map(message => (
								<MessageTile key={message.id} message={ message } />
							))}
							<SubmitMessage
								submit={ (message) => 
									socket.emit('privateMessage',{ 
										recieverId: activeChat.user,
										message: message })}
								/>
						</Column>
					}
                	</Row>
            </Column>
        );
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

	// const conversations;
	// const activeChat;

    return { messages: state.messages };
};


export default connect(mapStateToProps)(PrivateChat);