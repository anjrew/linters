import React from 'react';
import axios from '../react_utils/axios';
import db from '../react_utils/ids';
import routes from '../react_utils/react_routes';
import { CSSTransition } from "react-transition-group";


// Components
import { TextField } from '../components/inputs/textfield';
import { Column } from '../components/layout/column';
import { ErrorMessage } from '../components/text/error_message';

export class Login extends React.Component{

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

                <Column
                    placeContent='start'
                >
                    <TextField uniqueId="emailLogin" inputType="email" label="Email" id={db.email} handleChange={this.handleChange} required/>
                    <TextField uniqueId="passwordLogin" inputType="password" label="Password" id={db.password} handleChange={this.handleChange} required/>
                    <button onClick={() => this.submit()}>Login</button>
                </Column>
                <button className='link-button' onClick={this.props.onClick}>Click here to sign up!</button>
            </React.Fragment>
        );
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
  
    submit(){
        this.setState({
            error: null
        });
        axios.post(routes.login, {
            email: this.state.email,
            password: this.state.password,
        }).then((response) => {
            console.log('The Login got a response of', response);
            if (response.data.error){
                console.log('Logging Error');
                this.setState({
                    error: response.data.error,
                });
            } else {
                this.props.onLogin();
            }
        }).catch((e) =>{
            console.log('The error came from the Axios call: ', e);
            console.log('This in catch is :', this);
            this.setState({
                error: 'There was an Error from the server. Check your details.'
            });
        });
    }
}