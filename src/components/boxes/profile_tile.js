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
            <Row                 
                classNames="user-tile" 
                margin="10px" 
                padding="10px"
                justifyContent='flex-start'>

                <Avatar imageUrl={user.pic_url}/>
        
                <Column 
                    justifyContent= 'start'
                    alignItems= 'start'
                    alignContent= 'start'
                    alignSelf="start">
                    <h2>{user.first}</h2>
                    <h3>{user.bio}</h3>
                    <h4>{user.email}</h4>
                    <h4>Joined { new Date(user.created_at).toLocaleDateString() }</h4>
                </Column>
            </Row>
        );
    }
}



