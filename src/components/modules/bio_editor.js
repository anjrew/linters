import React from 'react';
import { Column } from '../layout/column';
import { TextArea } from '../inputs/text_area';
import axios from '../../react_utils/axios';
import routes from '../../react_utils/react_routes';
import { CSSTransition } from 'react-transition-group';


export class BioEditor extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
            isEditing: false,
            bio: props.bio
        };
        this.editClicked = this.editClicked.bind(this);
        this.addClicked = this.addClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    render(){
        var bio = this.state.bio;
        if (this.state.isEditing){
        
            return (

                <CSSTransition key="Save" in={this.state.isEditing} timeout={300} classNames="scale" unmountOnExit>
                    <Column 
                        padding={'20px'}>
                        <TextArea 
                            name='bio' 
                            value={ this.state.bio || "" } 
                            handleChange={ this.handleChange }
                        />
                        <button style={{margin: '20px'}} onClick={() => this.setBio(this.state.bio)}>Save</button>
                    </Column>
                </CSSTransition>
            );
        } else {
            if (bio) {
                return (
                    <Column padding={'20px'}>
                        <p>{this.props.bio || ''}</p>
                        <button style={{margin: '20px'}} onClick={this.editClicked}>Edit bio</button>
                    </Column>
                );
            } else {
                return (
                    <button style={{margin: '20px'}} onClick={this.addClicked}>Add bio</button>
                );
            }
        }
    }

    editClicked(){
        this.setState({
            isEditing: true,
            bio: this.props.bio
        });
    }

    addClicked(){
        this.setState({
            isEditing: true
        });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    async setBio(bio){
        bio.trim();
        bio = bio == ' ' ? '': bio;
        bio = bio ? bio : '';
        const data = { bio: bio};
        this.setState({
            isEditing: false,
            bio: bio,
        });
        try {
            const response = await axios.post(routes.update, data);
            this.props.setBio(response.data.bio);
        } catch (e) {
            console.log('The axios call to upload the file failed with error', e);
        }
    }
}