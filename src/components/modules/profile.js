import React from 'react';
import { Row } from '../layout/row';
import { Avatar } from '../graphics/avatar';
import { BioEditor } from '../modules/bio_editor';
import { Column } from '../layout/column';

export class Profile extends React.Component{

    render(){
        return (
            <Row 
                padding={'20px'}
                alignItems={'start'}
                alignContent={'start'}
                placeContent={'start'}
            >
                <Avatar
                    height ='200px'
                    width = '200px'
                    onClick={ this.props.uploadClicked} 
                    imageUrl={this.props.user.imageUrl}
                    description="User image"
                />
                <Column  padding={'20px'}>
                    <h2>{`${this.props.user.first}`}</h2>   

                    <BioEditor
                        bio={this.props.user.bio}
                        setBio={this.props.setBio}
                    />
                </Column>
            </Row>
        );
    }
}
