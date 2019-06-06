import React from 'react';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { BrowserRouter as Router , Switch, Route} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { UserProfile } from '../data/user_profile';

// Components
import { Logo } from '../components/graphics/logo';
import { SafeArea } from '../components/layout/safe_area';
import { CenteredColumn } from '../components/layout/centered_column';
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { Uploader } from '../components/modules/Uploader';
import { Profile } from '../components/modules/profile';
import { OtherProfile } from '../pages/other_profile';




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
                imageUrl: "/assets/images/nerd-avatar.png"
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
                    {/* <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            timeout={{ enter: 300, exit: 300 }}
                        >
                            <Switch location={location}>

                                <Route exact path="/" component={ */}

                    <Profile 
                        bioEditorIsVisible={ this.state.bioEditorIsVisible}
                        uploadClicked={this.avatarClicked}
                        user={this.state.user}
                        setBio={this.setBio}
                    />
                    {/* } */}

                    {/* // /> */}
                    {/* 
                                <Route path="/first" component={
                                    <OtherProfile 
                                        key={this.props.match.url}
                                        match={this.props.match}
                                        history={this.props.history}
                                    />} 
                                />

                            </Switch>
                        </CSSTransition>
                    </TransitionGroup> */}

                    <CSSTransition in={this.state.uploaderVisible} timeout={300} classNames="scale" unmountOnExit>
                        <Uploader 
                            dismissLoader={ this.dismissLoader } 
                            changeImage={this.changeImage}
                        />
                    </CSSTransition>

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
                imageUrl: res.data.pic_url || "/assets/images/nerd-avatar.png"
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

    setBio(bio){
        console.log('incoming bio is', bio);
        let user = this.state.user;
        console.log('the user is ', user);
        user.bio = bio;
        this.setState({
            user: user ,
            bioEditorIsVisible: false
        }, () => console.log('The new state is', this.state));
    }
}