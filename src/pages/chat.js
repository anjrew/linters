/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { MessageTile } from '../components/boxes/message_tile';
import { Column } from '../components/layout/column';
import { Row } from '../components/layout/row';
import { TextArea } from '../components/inputs/text_area';
import { socket } from '../react_utils/socket';

class Chat extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
			message: '',
			left: true
        };
        this.handleChange = this.handleChange.bind(this);
	}

    render(){
		var left = this.state.left;
        return (
            <Column
                padding='20px'>
					<Row
						margin='20px'>
						<TextArea
							name='message' 
							width='80%'
							value={ this.state.message } 
							handleChange={ this.handleChange }/>
                    <button 
                        onClick={ () => {
							this.setState({
								message: ''
							});
							socket.emit('newMessage',{ 
                            message: this.state.message }); 
						}}
                    >Submit</button>
                </Row>
                <Column>
                    { this.props.messages && this.props.messages.map(message => { 
						left  = !left;
						return(
							<MessageTile key={message.id} message={ message } left={left}/>
							);
						}
						)
					} 
                </Column>
              
                
            </Column>
        );
	}
	
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = (state) => {
    console.log(' The state in mapStateToProps in chat is ', state);
    return { messages: state.messages };
};


export default connect(mapStateToProps)(Chat);
