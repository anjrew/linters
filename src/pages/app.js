import React from 'react';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { UserProfile } from '../data/user_profile';

// Components
import { Logo } from '../components/graphics/logo';
import { SafeArea } from '../components/layout/safe_area';
import { CenteredColumn } from '../components/layout/centered_column';
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { Uploader } from '../components/modules/Uploader';
import { Profile } from '../components/modules/profile';

export class App extends React.Component{

    constructor(){
        super();
        this.state = {
            uploaderVisible: false,
            bioEditorIsVisible: false,
            user: {
                bio: null,
                profile_creation_date: null,
                email: null,
                first: null,
                last: null,
                imageUrl: "./placeholder.gif"
            }
        };
        this.dismissLoader = this.dismissLoader.bind(this);
        this.avatarClicked = this.avatarClicked.bind(this);
        this.uploadClicked = this.uploadClicked.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    render(){
        console.log('Rendering app with state', this);
        return (
            <CenteredColumn>
                <Row id="header" backgroundColor={ 'red' }>
                    <Logo height={ '100px' } width={ "100px" }/>
                    <Avatar backgroundColor={ 'white' } onClick={ this.avatarClicked } imageUrl={this.state.user.imageUrl}/>
                </Row>
                <SafeArea>
                    <Profile 
                        bioEditorIsVisible={ this.state.bioEditorIsVisible}
                        uploadClicked={this.showUploader}
                        user={this.state.user}
                        setBio={this.setBio}
                    />
                    { this.state.uploaderVisible && <Uploader dismissLoader={ this.dismissLoader } changeImage={this.changeImage}/> }
                </SafeArea>
            </CenteredColumn>
        );
    }

    componentDidMount() {
        axios.get(routes.user).then(res => {
            console.log('The response in app from component did mount', res);
            const userProfile =  new UserProfile({
                bio: res.data.bio,
                profile_creation_date: res.data.created_at,
                email: res.data.email,
                first: res.data.first,
                last: res.data.last,
                imageUrl: res.data.pic_url || "./placeholder.gif"
            });
            console.log(userProfile);
            this.setState({
                user:userProfile
            });
        });
    }

    dismissLoader(){
        console.log('Dismissing the Uploader and this is ', this);
        this.setState({
            uploaderVisible: false
        });
    }

    avatarClicked(){
        console.log('Avatar Clicked and this is', this.state.uploaderVisible);
        if (this.state.uploaderVisible) {
            this.setState({ uploaderVisible: false });
        } else {
            this.setState({ uploaderVisible: true });
        }
    }

    uploadClicked(){
        console.log('Upload Button Clicked and this is', this);
    }

    changeImage(imageUrl){
        console.log('Setting imageUrl in AppState as ',  imageUrl);
        this.setState({
            user: {
                imageUrl: imageUrl
            }
        });
    }

    toggleBio(){
        if (this.state.bioEditorIsVisible) {
            this.setState({ bioEditorIsVisible: false });
        } else {
            this.setState({ bioEditorIsVisible: true });
        }
    }

    setBio(){

    }
}