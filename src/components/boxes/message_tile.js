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
                <Avatar imageUrl={ message.pic_url }/>

                <Column 
                    placeContent={'start start'}
                    alignItems={'start'} 
                    backgroundColor='yellow'>
                    <Row> <h3>{message.name}</h3> <h5>{new Date(message.created_at).toLocaleDateString()}</h5></Row>
                    <p>{message.message} </p>
                </Column>
            </Row>
        );
    }
}