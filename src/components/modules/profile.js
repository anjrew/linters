import React from 'react';
import { Row } from '../layout/row';
import { Avatar } from '../graphics/avatar';
import { BioEditor } from '../modules/bio_editor';
import { CenteredColumn } from '../layout/centered_column';

export class Profile extends React.Component{

    render(){
        return (
            <Row padding={'20px'}>
                <Avatar
                    height ='300px'
                    width = '300px'
                    onClick={ this.props.uploadClicked} 
                    imageUrl={this.props.user.imageUrl}
                    description="User image"
                />
                <CenteredColumn padding={'20px'}>
                    <h2>{`${this.props.user.first}`}</h2>   

                    <BioEditor
                        bio={this.props.user.bio}
                        setBio={this.props.setBio}
                    />
                </CenteredColumn>
            </Row>
        );
    }
}
