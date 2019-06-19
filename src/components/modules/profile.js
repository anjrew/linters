import React from 'react';
import { Row } from '../layout/row';
import { Avatar } from '../graphics/avatar';
import { BioEditor } from '../modules/bio_editor';
import { Column } from '../layout/column';
import { Padding } from '../layout/padding';

export class Profile extends React.Component{

    render(){
        return (
            <Row 
                width={'unset'}
                padding={'20px'}
                alignItems={'start'}
                // alignContent={'start'}
                placeContent={'center center'}
            >
                <Avatar
                    height ='200px'
                    width = '200px'
                    onClick={ this.props.uploadClicked} 
                    imageUrl={this.props.user.imageUrl}
                    description="User image"
                />
                <Column width={'unset'} padding={'20px'}>
                    <Padding padding={'3px 10px'}>
                        <h2>{`${this.props.user.first}`}</h2>
                    </Padding>   

                    <BioEditor
                        bio={this.props.user.bio}
                        setBio={this.props.setBio}
                    />
                </Column>
            </Row>
        );
    }
}
