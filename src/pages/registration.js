import React from 'react';
import axios from '../react_utils/axios';
import id from '../react_utils/ids';
import { Link } from 'react-router-dom';

// Components
import { TextField } from '../components/inputs/textfield';
import { Column } from '../components/layout/column';
import { ErrorMessage } from '../components/text/error_message';
import routes from '../react_utils/react_routes';
import { CSSTransition} from 'react-transition-group';


export class Registration extends React.Component{

    constructor (props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    render(){
        return (
            <React.Fragment>
                <CSSTransition in={!!this.state.error} timeout={300} classNames="scale" unmountOnExit>
                    <ErrorMessage>{this.state.error}</ErrorMessage>
                </CSSTransition>
                <Column>
                    <TextField uniqueId="firstName-registration" inputType="text" label="First name" id={id.firstName} handleChange={this.handleChange} required/>
                    <TextField uniqueId="lastName-registration" inputType="text" label="Last name" id={id.lastName} handleChange={this.handleChange} required/>
                    <TextField uniqueId="email-registration" inputType="email" label="Email" id={id.email} handleChange={this.handleChange} required/>
                    <TextField uniqueId="password-registration" inputType="password" label="Password" id={id.password} handleChange={this.handleChange} required/>
                    <button onClick={() => this.submit()}>Sign-up</button>
                </Column>
                <button className='link-button' onClick={this.props.onClick}>Click here to Log in!</button>
            </React.Fragment>
        );
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
        
    }

    submit(){
        console.log('Sign up button pressed');
        console.log(this.state);
        axios.post(routes.registration, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }).then((response) => {
            console.log('The signup got a response of', response);
            if (response.data.error){
                console.log('Registration Error');
                this.setState({
                    error: response.data.error,
                });
            } else {
                // location.replace('/');
                this.switchToLogin();
            }
        }).catch((e) =>{
            console.log('The error came from the Axios call: ', e);
            console.log('This is catch is :', this);
            this.setState({
                error: e
            });
        });
    }

    switchToLogin(){
        console.log('Switching to login');
        this.props.onClick();
    }
}