import React from 'react';


// COMPONENTS
import { Row } from  '../layout/row';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';

export class MessageTile extends React.Component{

    render(){
        const message = this.props.message;
        return (
            <Row padding='20px' backgroundColor='purple'>
                <Avatar imageUrl={ message.imageurl }/>

                <Column backgroundColor='yellow'>
                    <span> <h3>{message.name}</h3> <h5>{new Date(message.created_at).toLocaleDateString()}</h5></span>
                    <p>{message.message} </p>
                </Column>
            </Row>
        );
    }
}