/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { ProfileCard } from '../components/boxes/profile-card';
import { Column } from '../components/layout/column';

class UsersOnline extends React.Component{


    render(){
        return (
            <Column padding='20px'>
				<h2>Users currently online</h2>
			
				{ this.props.users && Object.keys(this.props.users).map((key)=>{
					const user = this.props.users[key];
					return ( <ProfileCard key={ user.id } user={ user } />);
				})}				 
            </Column>
        );
	}

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = (state) => {
	console.log('In map state to props function in users online ', state);
    return { users: state.onlineUsers };
};


export default connect(mapStateToProps)(UsersOnline);


