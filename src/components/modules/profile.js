import React from 'react';
import { Avatar } from '../graphics/avatar';
import { BioEditor } from '../modules/bio_editor';
import { Column } from '../layout/column';
import { Padding } from '../layout/padding';
import Axios from 'axios';

export class Profile extends React.Component{

    render(){
        return (
            <Column 
                width={'unset'}
                padding={'20px'}
                alignItems={'center'}
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
                    <button style={{
                        backgroundColor: 'black',
                        color: 'white'
                    }}
                    onClick={ this.props.deleteProfile }
                    >Delete Account</button>
                </Column>
            </Column>
        );
    }
}
