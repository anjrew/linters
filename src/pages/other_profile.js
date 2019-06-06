import React from 'react';
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { CenteredColumn } from '../components/layout/centered_column';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { UserProfile } from '../data/user_profile';


export class OtherProfile extends React.Component{

    constructor (props) {
        super(props);
        this.state = { 
            user: {}
        };
    }

    render(){
        console.log('Rendering OtherProfile with props', this.props);
        return (
            <Row padding={'20px'}>
                <Avatar
                    height ='300px'
                    width = '300px'
                    onClick={ this.props.uploadClicked} 
                    imageUrl={this.props.user.imageUrl}
                    description="User image"
                />
                <CenteredColumn padding={'20px'}>
                    <h2>{`${this.props.user.first}`}</h2>   

                    <CenteredColumn padding={'20px'}>
                        <p>{this.props.bio}</p>
                        <button onClick={this.editClicked}>Edit</button>
                    </CenteredColumn>
                </CenteredColumn>
            </Row>
        );
    }

    componentDidMount(){
        // Browser router adds match pramas id to props.
        const userId = this.props.match.params.id;
        console.log("The userId ", userId);

        axios.get(routes.otherUser,{
            id: userId
        }).then(res => {
            console.log('The response in app from component did mount', res);
            const userProfile =  new UserProfile({
                bio: res.data.bio,
                profile_creation_date: res.data.created_at,
                email: res.data.email,
                first: res.data.first,
                last: res.data.last,
                imageUrl: res.data.pic_url || "/assets/images/nerd"
            });
            console.log(userProfile);
            this.setState({
                user:userProfile
            });
        });
    }
}