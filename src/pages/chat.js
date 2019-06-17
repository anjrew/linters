import React from 'react';
import { connect } from 'react-redux';
import { Action as action } from '../react_utils/redux/actions';

// COMPONENTS
import { MessageTile } from '../components/boxes/message_tile';
import { Column } from '../components/layout/column';


class Chat extends React.Component{

    render(){
        return (
            <Column
                padding='20px'>
                <Column>
                    { this.props.messages.map(message => (
                        <MessageTile key={message.id} message={ message }/>
                    ))}
                </Column>
                <textarea></textarea>
            </Column>
        );
    }
	
    componentDidMount(){
        this.props.dispatch(action.getChatMessagesSocket());
    }
}

const mapStateToProps = state => state.messages || {};


export default connect(mapStateToProps)(Chat);
