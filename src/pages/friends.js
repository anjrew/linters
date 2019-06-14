import React from 'react';
import axios from '../react_utils/axios';
import { connect } from 'react-redux';


// COMPONENTS
import { Wrap } from '../components/layout/wrap';
import { CSSTransition } from "react-transition-group";
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { Column } from '../components/layout/column';
import { CircularProgressIndicator } from '../components/progress_indicators/circular_progress_indicator';
import { ProfileCard } from '../components/boxes/profile-card';

import { Action as action } from '../react_utils/redux/actions';

class Friends extends React.Component{

    componentDidMount() {
        this.props.dispatch(action.receiveFriendsWannabes());
    }

    render(){
        console.log('rendering friends with friends ', this.props.friends);
        console.log('rendering friends with wanabees ', this.props.wannabes);
		
        let friends;
        let wannabes;

        if (!this.props.friends){
            friends = <CircularProgressIndicator/>;
        } else {
            if (this.props.friends.length == 0 ){
                friends = <h2 style={{ margin: "100px" }}>You have no friends pal.</h2>;
            }else{

                friends = (
                    <Column>
                        <h2>Check out your friends</h2>
                        <Row padding={'20px'}>
                        	{ this.props.friends.map(friend => (
                                <ProfileCard 
                                    key={ friend.id } 
                                    user={friend}
                                    buttonText='Unfriend' 
                                    onButtonClick={ () =>
                                        this.props.dispatch(action.unfriend(friend.id))
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
                console.log('wannabes length is 0');
                wannabes = (<h2 style={{ margin: "100px" }}>You have no wannabes pal.</h2>);
            } else { 
                wannabes = (
                    <Column>
                        <h2>These people want to be your friends</h2>
                        <Row padding={'20px'}>
                            { this.props.wannabes.length && this.props.wannabes.map(friend => (
                                <ProfileCard 
                                    key={ friend.id } 
                                    user={friend}
                                    buttonText='Accept friend request' 
                                    onButtonClick={ () =>
                                        this.props.dispatch(action.acceptFriendRequest(friend.id))
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

const mapStateToProps = state => {
    if (state.friendsWannabes) {
        console.log('state.friendsWannabes are ', state.friendsWannabes);
		
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
