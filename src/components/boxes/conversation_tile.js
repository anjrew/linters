import React from 'react';
import { Redirect } from 'react-router-dom';

// COMPONENTS
import { Row } from '../layout/row';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';
import { CSSTransition } from "react-transition-group";

export class ConversationTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showMessage: false
        };
        this.textStyle = {
            textAlign: 'start'
        };
    }

    componentDidMount() {
        this.setState({
            showMessage: true
        });
    }

    render() {
		

        if (this.state.user) {
            return <Redirect to={`/private-chat/${this.state.user}`} />;
        } else {
            const message = this.props.message;
            return (
                <CSSTransition
                    key={message.id}
                    in={this.state.showMessage}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames="scale"
                    unmountOnExit>
                    <Row 
                        topBorder=' 2px solid black'
                        bottomBorder=' 2px solid black'
                        width="100%"
                        onClick={() => this.setState({ 
                            user: message.currentUserId == message.sender_id ? message.receiver_id : message.sender_id
                        })}
                    >
                        <Avatar
                            imageUrl={message.pic_url}
                            boxShadow='5px 5px 10px -5px rgba(0,0,0,0.75)'
                            height='60px'
                            width='60px'
                        />

                        <Column
                            placeContent={'start start'}
                            alignItems={'start'}
                            padding='20px 30px'
                        >
                            <Row
                                width='calc(100% - 60px)'
                                placeContent='center space-between'
                            > 
                                <h4 style={{ textAlign: 'start' }}>{message.name || message.first + ' ' + message.last}</h4> 
                                <h5 >{new Date(message.created_at).toLocaleString()}</h5>
                            </Row>
                            <p>{message.message} </p>
                        </Column>
                    </Row>
                </CSSTransition>
            );
        }
    }
}