import React from 'react';
import { CenteredColumn } from '../layout/centered_column';
import { TextArea } from '../inputs/text_area';
import axios from '../../react_utils/axios';
import routes from '../../react_utils/react_routes';
import { CSSTransition } from 'react-transition-group';


export class BioEditor extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
            bioIsEditing: false,
        };
        this.editClicked = this.editClicked.bind(this);
        this.addClicked = this.addClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    render(){

        var bioBool = this.props.bio ? true : false;
        if (this.state.bioIsEditing){
            return (
                <CSSTransition in={this.state.bioIsEditing} timeout={300} classNames="scale" unmountOnExit>
                    <CenteredColumn padding={'20px'}>
                        <TextArea 
                            name='bio' 
                            value={this.state.bio} 
                            handleChange={this.handleChange}
                        />
                        <button onClick={() => this.setBio(this.state.bio)}>Save</button>
                    </CenteredColumn>
                </CSSTransition>
            );
        } else {
            if (this.props.bio) {
                return (
                    <CSSTransition in={this.props.bio} timeout={200} classNames="scale" unmountOnExit>
                        <CenteredColumn padding={'20px'}>
                            <p>{this.props.bio}</p>
                            <button onClick={this.editClicked}>Edit</button>
                        </CenteredColumn>
                    </CSSTransition>

                );
            } else {
                return (
                    <CSSTransition in={!this.props.bio} timeout={200} classNames="scale" unmountOnExit>
                        <button onClick={this.addClicked}>Add</button>
                    </CSSTransition>
                );
            }
        }
    }

    editClicked(){
        console.log('Edit clicked in the bio Editor');
        this.setState({
            bioIsEditing: true
        });
    }

    addClicked(){
        console.log('Add clicked in the bio Editor');
        this.setState({
            bioIsEditing: true
        });
    }

    handleChange({ target }) {
        console.log('Handling text change with name: ', target.name, ' with Value: ', target.value );
        this.setState({
            [target.name]: target.value
        });
    }

    async setBio(bio){
        const data = { bio: bio};
        console.log('The data in the post request is' , data);
        this.setState({
            bioIsEditing: false,
        });
        try {
            const response = await axios.post(routes.update, data);
            console.log('The response data from bio is ', response.data);
            this.props.setBio(response.data.bio);
        } catch (e) {
            console.log('The axios call to upload the file failed with error', e);
        }
    }
}