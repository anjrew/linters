import React from 'react';
import { Row } from '../layout/row';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';

export class ProfileTile extends React.Component{

    constructor (props) {
        super(props);
    }
    render(){
        const user = this.props.user;
        return (
            <Row key={user.id} justifyContent='flex-start' classNames="user-tile">
                <Avatar imageUrl={user.pic_url}/>
        
                <Column 
                    justifyContent= 'start'
                    alignItems= 'start'
                    alignContent= 'start'
                    alignSelf="start">
                    <h2>{user.first}</h2>
                    <h3>{user.bio}</h3>
                    <h3>{user.email}</h3>
                    <h3>Joined {user.created_at.toString()}</h3>
                </Column>
            </Row>
        );
    }
}



