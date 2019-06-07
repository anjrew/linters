import React from 'react';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { BrowserRouter, Switch, Route} from "react-router-dom";
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
        return (
            <CenteredColumn>
                
                <Row id="header" backgroundColor={ 'red' }>
                    <Logo height={ '100px' } width={ "100px" }/>
                    <Avatar backgroundColor={ 'white' } onClick={ this.avatarClicked } imageUrl={this.state.user.imageUrl}/>
                </Row>

                <SafeArea>
                    <BrowserRouter>
                        <Route render= {({location}) => {
                            return(
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.pathname}
                                        timeout={{ enter: 300, exit: 300 }}
                                    >
                                        <Switch location={location}>

                                            <Route path={ "/other-user/:id"} render={(props) => {
                                                return (
                                                    <OtherProfile 
                                                        key={props.match.url}
                                                        match={props.match}
                                                        history={props.history}
                                                    />
                                                );
                                            }}/> 

                                            <Route exact path={routes.home} render={(props) => {
                                                return (
                                                    <Profile 
                                                        bioEditorIsVisible={ this.state.bioEditorIsVisible}
                                                        uploadClicked={this.avatarClicked}
                                                        user={this.state.user}
                                                        setBio={this.setBio}
                                                    />
                                                );
                                            }}/>                                            

                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            );}} />
                    </BrowserRouter>


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
            const userProfile =  new UserProfile({
                bio: res.data.bio,
                profile_creation_date: res.data.created_at,
                email: res.data.email,
                first: res.data.first,
                last: res.data.last,
                imageUrl: res.data.pic_url || "/assets/images/nerd-avatar.png"
            });
            this.setState({
                user:userProfile
            });
        });
    }

    dismissLoader(){
        this.setState({
            uploaderVisible: false
        });
    }

    avatarClicked(){
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
        let user = this.state.user;
        user.imageUrl = imageUrl;
        this.setState({
            user: user
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
        let user = this.state.user;
        user.bio = bio;
        this.setState({
            user: user ,
            bioEditorIsVisible: false
        });
    }
}