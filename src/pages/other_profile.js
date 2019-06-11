import React from 'react';
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { Column } from '../components/layout/column';
import axios from '../react_utils/axios';
import { UserProfile } from '../data/user_profile';
import { ErrorMessage } from '../components/text/error_message';
import { CSSTransition } from "react-transition-group";
import { FriendButton } from '../components/buttons/friend_button'; 

export class OtherProfile extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
            erro: null,
            user: {
                imageUrl: "/assets/images/nerd-avatar.png"
            }
        };
    }

    render(){
        return (
            <React.Fragment>

                <CSSTransition in={this.state.error} timeout={300} classNames="scale" unmountOnExit>
                    <ErrorMessage>{this.state.error}</ErrorMessage>
                </CSSTransition>

                <Row padding={'20px'}>
                    <Column padding={'20px'}>

                        <Avatar
                            height ='250px'
                            width = '250px'
                            imageUrl={this.state.user.imageUrl ||  '/assets/images/nerd-avatar.png'}
                            description="User image"
                        />

                        <FriendButton id={this.state.user.id}/>

                    </Column>

                    <Column padding={'20px'}>
                        <h2>{`${this.state.user.first || ' '}`}</h2>   

                        <Column padding={'20px'}>
                            <p>{`${this.state.user.bio || ' '}`}</p>
                        </Column>
                    </Column>
                </Row>
            </React.Fragment>

        );
    }

    componentDidMount(){
        // Browser router adds match pramas id to props.
        const userId = this.props.match.params.id;

        try {
            axios.post('/api/user', {
                id: userId
            } ).then(res => {
                if (res.data.currentUser){
                    this.props.history.push("/");
                } else if (!res.data.first) {
                    this.setState({
                        error: "No Such User!"
                    });
                } else {
                    const userProfile =  new UserProfile(res.data);
                    this.setState({
                        user: userProfile
                    });
                }
            });
        } catch (e) {
            this.setState({
                error: "Error from the database"
            });
        }
    }
}