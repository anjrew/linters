import React from 'react';
import { Row } from '../layout/row';
import { Column } from '../layout/column';
import { Avatar } from '../graphics/avatar';

export class ProfileCard extends React.Component{

    constructor (props) {
        super(props);
        this.state = {

        };
        this.textStyle={
            textAlign: 'start'
        };
    }
    render(){
        return (
            <Column>
                <Avatar
                    height ='200px'
                    width = '200px'
                    onClick={ this.props.uploadClicked} 
                    imageUrl={this.props.user.imageUrl}
                    description="User image"
                />
                <h2>{`${this.props.user.first} ${this.props.user.last}`}</h2>   
                <h2>{this.props.user.bio}</h2>
                <h2>{new Date(this.props.user.created_at).toLocaleDateString()}</h2>
            </Column>
        );
    }
}