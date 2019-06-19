/* eslint-disable indent */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// COMPONENTS
import { ProfileCard } from '../components/boxes/profile-card';
import { Column } from '../components/layout/column';
import { Row } from '../components/layout/row';

class UsersOnline extends React.Component{

	constructor (props) {
        super(props);
        this.state = {
			user: null
        };
	}
	
    render(){
		const user = this.state.user;
		if (this.state.user) {
			return <Redirect to={`/other-user/${user.id}`} />;
		} else {
			
			return (
					<Column 
						padding='20px' 
						margin='20px'>
					<h2>Users currently online</h2>
					<Row padding='20px'>
						{ this.props.users && Object.keys(this.props.users).map((key)=>{
							const user = this.props.users[key];
							return ( 
								<ProfileCard 
								key={ user.id } 
								user={ user } 
								showBio={ false }
								cardClick={ () => this.setState({
									user: user
								})}  
								/>);
							})}				 
					</Row>
				</Column>
			);
		}
	}

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
}

const mapStateToProps = (state) => {
    return { users: state.onlineUsers };
};


export default connect(mapStateToProps)(UsersOnline);


