import React from 'react';
import { connect } from 'react-redux';
import { Action as action } from '../react_utils/redux/actions';

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
        };
        this.handleChange = this.handleChange.bind(this);
    }

    render(){
        return (
            <Column
                padding='20px'>
                <Column>
                    { this.props.messages && this.props.messages.map(message => (
                        <MessageTile key={message.id} message={ message }/>
                    ))}
                </Column>
                <Row>
                    <TextArea
                        name='message' 
                        value={ this.state.message } 
                        handleChange={ this.handleChange }/>
                    <button 
                        onClick={ () => socket.emit('newMessage',{ 
                            message: this.state.message
                        }) }
                    >Submit</button>
                </Row>
                
            </Column>
        );
    }
	
    componentDidMount(){
        console.log('Chat component is mounting');
        this.props.dispatch(action.getChatMessages());
    }
	
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = state => state.messages || {};


export default connect(mapStateToProps)(Chat);
