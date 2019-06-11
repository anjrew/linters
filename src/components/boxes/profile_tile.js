import React from 'react';
import { Row } from '../layout/row';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';

export class ProfileTile extends React.Component{

    constructor (props) {
        super(props);
        this.textStyle={
            textAlign: 'start'
        };
    }
    render(){
        const user = this.props.user;
        return (
            <Row                 
                classNames="user-tile" 
                margin="10px" 
                padding="10px"
                placeContent= 'center flex-start'
            >

                <Avatar imageUrl={user.pic_url}/>
        
                <Column 
                    justifyContent= 'center'
                    alignItems= 'start'
                    alignContent= 'start'
                    alignSelf="center"
                    padding='10px'>
                    <h2 style={this.textStyle}>{user.first}</h2>
                    <h3 style={this.textStyle}>{user.bio}</h3>
                    <h4 style={this.textStyle}>Joined { new Date(user.created_at).toLocaleDateString() }</h4>
                </Column>
            </Row>
        );
    }
}



