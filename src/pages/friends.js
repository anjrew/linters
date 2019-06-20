import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


// COMPONENTS
import { ScaleTransition } from "../components/transitions/scale-transition";
import { Row } from '../components/layout/row';
import { Column } from '../components/layout/column';
import { CircularProgressIndicator } from '../components/progress_indicators/circular_progress_indicator';
import { ProfileCard } from '../components/boxes/profile-card';

import { Action as action } from '../react_utils/redux/actions';

class Friends extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            chatUser: null
        };
    }

    componentDidMount() {
        this.props.dispatch(action.receiveFriendsWannabes());
    }

    render(){

        if (this.state.chatUser) {
            return <Redirect to={`/private-chat/${this.state.chatUser}`} />;
        } else {
		
            let friends;
            let wannabes;

            if (!this.props.friends){
                friends = <CircularProgressIndicator/>;
            } else {
                if (this.props.friends.length == 0 ){
                    friends = <h2 style={{ margin: "100px" }}>You have no friends pal.</h2>;
                }else{

                    friends = (
                        <Column  margin='20px' padding='20px' borderRaduis='10px'>
					 <ScaleTransition in={!!this.props.friends.length} >
                                <h2>Check out your friends</h2>
					 </ScaleTransition>
                            <Row padding={'20px'}>
                        	{ this.props.friends.map(friend => (
                                    <ProfileCard 
                                        key={ friend.id } 
                                        user={friend}
                                        buttonText='Private chat'
                                        handleFirstButtonClick={ () => this.props.goToChat(friend.id) }
                                        secondButtonText= 'Unfriend' 
                                        onSecondButtonClick={ () =>
                                            this.props.dispatch(action.unfriendReject(friend.id))
                                            
                                        }/>
                                ))}
                            </Row>
                        </Column>);
                }
            }
		
            if (!this.props.wannabes){
                wannabes = <CircularProgressIndicator/>;
            } else {

                if (this.props.wannabes.length == 0){
                    wannabes = (<h2 style={{ margin: "10px" }}>Nobody {this.props.friends.length > 0 && 'else'} wants to be your friend... Why would they???.</h2>);
                } else { 
                    wannabes = (
                        <Column margin='20px' padding='20px' borderRaduis='10px'>
                            <ScaleTransition in={!this.props.wannabes.length} >
                                <h2>These people want to be your friends</h2>
                            </ScaleTransition>
                            <Row padding={'20px'}>
                                { this.props.wannabes.length && this.props.wannabes.map(friend => (
                                    <ProfileCard 
                                        key={ friend.id } 
                                        user={friend}
                                        buttonText='Accept friend request' 
                                        handleFirstButtonClick={ () =>
                                            this.props.dispatch(action.acceptFriendRequest(friend.id))
                                        }
                                        secondButtonText='Reject'
                                        onSecondButtonClick={ () =>
                                            this.props.dispatch(action.unfriendReject(friend.id))
                                        }/>
                                ))}
                            </Row>
                        </Column>);
                }  
            }

            // Final render
            return (
                <Column padding={'20px'}>
                    {friends}
                    {wannabes}
                </Column>
            );
		
        }
    }
}

const mapStateToProps = state => {
    if (state.friendsWannabes) {		
        const wannabes = state.friendsWannabes.filter((person) =>{
            return person.accepted != true;
        });
		
        const friends = state.friendsWannabes.filter((person) =>{

            return person.accepted == true;
        });
		
        return {
            friends: friends,
            wannabes: wannabes
        };
    } else {
        return {};
    }
};

export default connect(mapStateToProps)(Friends);
