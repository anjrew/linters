import React from 'react';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { UserProfile } from '../data/user_profile';

// Components
import { Logo } from '../components/graphics/logo';
import { SafeArea } from '../components/layout/safe_area';
import { Column } from '../components/layout/column';
import { Row } from '../components/layout/row';
import { Avatar } from '../components/graphics/avatar';
import { Uploader } from '../components/modules/Uploader';
import { OverLappedChildren} from '../components/layout/overlapped_children';
import { ErrorMessage } from '../components/text/error_message';
import { Container } from '../components/boxes/container';

// PAGES
import { FindPeople } from '../pages/find_people';
import { Profile } from '../components/modules/profile';
import { OtherProfile } from '../pages/other_profile';
import Friends from '../pages/friends';
import Chat from '../pages/chat';

export default class App extends React.Component{

    constructor(){
        super();
        this.state = {
            uploading: false,
            error: null,
            uploaderVisible: false,
            bioEditorIsVisible: false,
            animatingMenu: false,
            showProfileLink: true,
            showFindPeopleLink: false,
            showApp: false,
            user: {
                bio: null,
                profile_creation_date: null,
                email: null,
                first: null,
                last: null,
                imageUrl: "/assets/images/nerd-avatar.png"
            },
            locations:{
                home: 'next',
                friends: 'next',
                findUsers: 'next',
                otherUser: 'next',
                users: 'next',
                chat: 'next'
            }
        };
        this.renderNext = this.renderNext.bind(this);
        this.setLocationState = this.setLocationState.bind(this);		
        this.dismissLoader = this.dismissLoader.bind(this);
        this.avatarClicked = this.avatarClicked.bind(this);
        this.uploadClicked = this.uploadClicked.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.setBio = this.setBio.bind(this);
        this.logout = this.logout.bind(this);
    }
	

    render(){
        return (
            <CSSTransition 
                in={this.state.showApp} 
                timeout={300} 
                classNames="fade"
                onExited={() => this.state.showApp == false && this.logout()} 
                unmountOnExit>

                <BrowserRouter>
                    <Route render= {({location , history }) => {

                        return(
                            <Column>
                                <CSSTransition 
                                    in={this.state.uploaderVisible} 
                                    timeout={300} classNames="fade" 
                                    unmountOnExit>
                                    <Container 
                                        padding="40px"
                                        position="fixed"
                                        width='100vw'
                                        height='100vh'
                                        backgroundColor= 'rgba(0,0,0,0.50)'
                                        zIndex="800"
                                        top='0px'>
                                    </Container>
                                </CSSTransition>


                                <CSSTransition in={this.state.uploaderVisible} timeout={300} classNames="scale" unmountOnExit>
                                    <Uploader 
                                        uploading={ () => this.setState({ uploading: true }, () => console.log('The state is ',this.state))}
                                        dismissLoader={ this.dismissLoader } 
                                        changeImage={this.changeImage}
                                    />
                                </CSSTransition>

                                <Row id="header" backgroundColor={ 'red' } justifyContent='flex-start'>

                                    <Logo height={ '100px' } width={ "100px" }/>

                                    <CSSTransition
                                        key={'users-link-css'}
                                        in={this.state.locations.users != 'on' && this.state.locations.users != 'next'}
                                        timeout={{ enter: 300, exit: 300 }}
                                        classNames="scale"
                                        onEnter={ () => console.log('users link is entering')}
                                        onExited={ ()=> this.renderNext(history)}
                                        unmountOnExit>
                                        <button 
                                            className='link-button' 
                                            onClick={ () => this.makeNextToRender('/users')}
                                        >Find users</button>
                                    </CSSTransition>

                                    <CSSTransition
                                        key={'home-css'}
                                        in={this.state.locations.home != 'on' && this.state.locations.home != 'next'}
                                        timeout={{ enter: 300, exit: 300 }}
                                        classNames="scale"
                                        onExited={ ()=> this.renderNext(history)}
                                        unmountOnExit>
                                        <button 
                                            className='link-button' 
                                            onClick={ () => this.makeNextToRender('/') }
                                        >My profile</button>
                                    </CSSTransition>

                                    <CSSTransition
                                        key={'friends-css'}
                                        in={this.state.locations.friends != 'on' && this.state.locations.friends != 'next'}
                                        timeout={{ enter: 300, exit: 300 }}
                                        classNames="scale"
                                        onExited={ ()=> this.renderNext(history)}
                                        unmountOnExit>
                                        <button 
                                            className='link-button' 
                                            onClick={ () => this.makeNextToRender('/friends')}
                                        >Friends</button>
                                    </CSSTransition>

                                    <CSSTransition
                                        key={'chat-link-css'}
                                        in={this.state.locations.chat != 'on' && this.state.locations.chat != 'next'}
                                        timeout={{ enter: 300, exit: 300 }}
                                        classNames="scale"
                                        onExited={ ()=> this.renderNext(history)}
                                        unmountOnExit>
                                        <button 
                                            className='link-button' 
                                            onClick={ () => this.makeNextToRender('/chat')}
                                        >Chat</button>
                                    </CSSTransition>
                                    
                                    <button 
                                        className='link-button' 
                                        onClick={ () => this.setState({ showApp: false }) }
                                    >Logout</button>

                                    <Avatar backgroundColor={ 'white' } onClick={ this.avatarClicked } imageUrl={this.state.user.imageUrl}/>
                                </Row>

                                <CSSTransition in={!!this.state.error} timeout={300} classNames="scale" unmountOnExit>
                                    <ErrorMessage>{this.state.error}</ErrorMessage>
                                </CSSTransition>

                                <SafeArea>
                    
                                    <TransitionGroup>
                                        <CSSTransition
                                            key={location.pathname}
                                            timeout={{ enter: 300, exit: 300 }}
                                            classNames="fade"
                                        >
                                            <OverLappedChildren>             

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

                                                    <Route exact path={routes.home} render={() => {
                                                        return (
                                                            <Profile 
                                                                bioEditorIsVisible={ this.state.bioEditorIsVisible}
                                                                uploadClicked={this.avatarClicked}
                                                                user={this.state.user}
                                                                setBio={this.setBio}
                                                            />
                                                        );
                                                    }}/>  

                                                    <Route exact path={'/users'} render={() => {
                                                        return (
                                                            <FindPeople/>
                                                        );
                                                    }}/>

                                                    <Route exact path={'/chat'} render={() => {
                                                        return (
                                                            <Chat />
                                                        );
                                                    }}/>

                                                    <Route exact path={'/friends'} render={() => {
                                                        return (
                                                            <Friends/>
                                                        );
                                                    }}/>  

                                                </Switch>
                                            </OverLappedChildren>            
                                        </CSSTransition>
                                    </TransitionGroup>

                                </SafeArea>
                            </Column>
                        );}} />
                </BrowserRouter>
            </CSSTransition>
        );
    }

    componentDidMount() {
        axios.get(routes.user).then(res => {
            const userProfile =  new UserProfile({
                id: res.data.id,
                bio: res.data.bio,
                profile_creation_date: res.data.created_at,
                email: res.data.email,
                first: res.data.first,
                last: res.data.last,
                imageUrl: res.data.pic_url || "/assets/images/nerd-avatar.png"
            });
            this.setState({
                user: userProfile,
                showApp: true
            });
        });
        this.setLocationState(window.location.pathname);
    }
	
    setLocationState(location){
        var locations = {};
        Object.keys(this.state.locations).map((location)=>{
            locations[location] = '';
        });
        switch (location) {
            case '/friends':
                this.setState({
                    locations: {
                        ...locations,
                        friends: 'on'
                    }
                });
                break;
            case `/users`:
                this.setState({
                    locations: {
                        ...locations,
                        users: 'on'
                    }
                });
                break;
            case '/':
                this.setState({
                    locations: {
                        ...locations,
                        home: 'on'
                    }
                });
                break;
            case '/chat':
                this.setState({
                    locations: {
                        ...locations,
                        chat: 'on'
                    }
                });
                break;
				
            default:
                if  (location.substring('other-user')){
                    this.setState({
                        locations: {
                            ...locations,
                            otherUser: 'on'
                        }
                    });
                } else {
                    this.setState({
                        locations: {
                            ...locations,
                            home: 'on'
                        }
                    });
                }
                break;
        }
    }
	
    makeNextToRender(location){	  
        var locations = this.state.locations;
        Object.keys(this.state.locations).map((location)=>{
            locations[location] = '';
        });
        switch (location) {
            case '/friends':
                locations.friends = 'next';
                this.setState({
                    locations: locations
                });
                break;
            case '/users':
                locations.users = 'next';
                this.setState({
                    locations: locations
                });
                break;
            case '/':
                locations.home = 'next';
                this.setState({
                    locations: locations
                });
                break;
				
            case '/chat':
                locations.chat = 'next';
                this.setState({
                    locations: locations
                });
                break;
				
            default:
                if  (location.substring('other-user')){
                    locations.otherUser = 'next';
                    this.setState({
                        locations: locations
                    });
                } 
        }
    }

    renderNext(history){
        var locations = this.state.locations;
        for (const location in locations) {
            const value = locations[location];
            if (value == 'next') {
                locations[location] = 'on';
                switch (location) {
                    case 'friends':
                        history.push('/friends');
                        break;
                    case 'users':
                        history.push('/users');
                        break;
                    case 'home':
                        history.push('/');
                        break;
                    case 'chat':
                        history.push('/chat');
                        break;	
                    default	:
                        history.push('/');
                        break;
                }		
            }
        }

        this.setState({
            locations: locations
        });
    }

    dismissLoader(){
        this.setState({
            uploaderVisible: false,
            uploading: false
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
        console.log('Setting user ', user);
        this.setState({
            user: user ,
            bioEditorIsVisible: false
        });
    }
	
    logout(){
        axios.get('/api/logout').then(() =>{ 
            console.log('The window location is', window.location);
            location.replace('/welcome');
        }).catch((e) =>{
            this.setState({
                error: e
            });
        });
    }
}

