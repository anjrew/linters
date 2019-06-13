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

import { Action } from '../react_utils/redux/actions';

class Friends extends React.Component{

    componentDidMount() {
        this.props.dispatch(Action.receiveFriendsWannabes());
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
				
                    <Column padding={'20px'} width={'100%'}>
                        <h2>Check out your friends</h2>
                        <Wrap>
                        	{ this.props.friends.map(friend => (
                        	    <ProfileCard key={ friend.id } user={friend}/>
                            ))}
                        </Wrap>
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
                    <Column padding={'20px'}>
                        <h2>These people want to be your friends</h2>
                        { this.props.wannabes.length && this.props.wannabes.map(friend => (
                            <div key = { friend.id } >{ friend }</div>
                        ))}
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
            return person.status == 1;
        });
		
        const friends = state.friendsWannabes.filter((person) =>{

            return person.status != 1;
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
