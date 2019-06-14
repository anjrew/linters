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
                    imageUrl={this.props.user.imageUrl}
                    description={`${this.props.user.first} ${this.props.user.last}`}
                />
                <h2>{`${this.props.user.first} ${this.props.user.last}`}</h2>   
                <h2>{this.props.user.bio}</h2>
                <button onClick={this.props.onButtonClick}>{this.props.buttonText}</button>
            </Column>
        );
    }
}