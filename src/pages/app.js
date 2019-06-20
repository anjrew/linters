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
import { Icon } from '../components/graphics/icon';
import { NavBarButton } from '../components/buttons/nav-bar-button';

// PAGES
import { FindPeople } from '../pages/find_people';
import { Profile } from '../components/modules/profile';
import { OtherProfile } from '../pages/other_profile';
import UsersOnline from '../pages/users_online';
import Friends from '../pages/friends';
import Chat from '../pages/chat';
import PrivateChat from '../pages/private_chat';

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
                imageUrl: "/assets/images/love-avatar.jpg"
            },
            privateChatUser: null,
            locations:{
                home: 'next',
                friends: 'next',
                findUsers: 'next',
                otherUser: 'next',
                users: 'next',
                chat: 'next',
                usersOnline: 'next',
                privateChat: 'next',
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
                                    timeout={300} 
                                    classNames="fade" 
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

                                <Row id="header" borderBottomStyle='groove' justifyContent='flex-start'>

                                    <Logo height={ '100px' } width={ "100px" }/>

                                    <NavBarButton 
                                        id='users-link-css'
                                        in={this.state.locations.users != 'on' && this.state.locations.users != 'next'}
                                        renderNext={ ()=> this.renderNext(history) }
                                        iconSrc={ 'assets/icons/chat.png' }
                                        makeNextToRender={ () => this.makeNextToRender('/users') }
                                        label='Find users'
                                    />

                                    <NavBarButton 
                                        id='home-css'
                                        in={this.state.locations.home != 'on' && this.state.locations.home != 'next'}
                                        renderNext={ ()=> this.renderNext(history) }
                                        iconSrc={ 'assets/icons/profile.png' }
                                        makeNextToRender={ () => this.makeNextToRender('/') }
                                        label='My profile'
                                    />

                                    <NavBarButton 
                                        id={'friends-css'}
                                        in={this.state.locations.friends != 'on' && this.state.locations.friends != 'next'}
                                        renderNext={ ()=> this.renderNext(history) }
                                        iconSrc={ 'assets/icons/friends.png' }
                                        makeNextToRender={ () => this.makeNextToRender('/friends') }
                                        label='Friends'
                                    />

                                    <NavBarButton 
                                        id={'chat-link-css'}
                                        in={this.state.locations.chat != 'on' && this.state.locations.chat != 'next'}
                                        renderNext={ ()=> this.renderNext(history) }
                                        iconSrc={ 'assets/icons/chat.png' }
                                        makeNextToRender={ () => this.makeNextToRender('/chat') }
                                        label='Chat'
                                    />

                                    <NavBarButton 
                                        id={'online-link-css'}
                                        in={this.state.locations.usersOnline != 'on' && this.state.locations.usersOnline != 'next'}
                                        renderNext={ ()=> this.renderNext(history) }
                                        iconSrc={ 'assets/icons/online-users.png' }
                                        makeNextToRender={ () => this.makeNextToRender('/users-online') }
                                        label='Users online'
                                    />

                                    <NavBarButton 
                                        id={'provate-chat-css'}
                                        in={this.state.locations.privateChat != 'on' && this.state.locations.privateChat != 'next'}
                                        renderNext={ ()=> this.renderNext(history) }
                                        iconSrc={ 'assets/icons/private-chat.png' }
                                        makeNextToRender={ () => this.makeNextToRender('/private-chat') }
                                        label='Private chat'
                                    />

                                    <Column 
                                        width={'unset'}
                                        classNames={'grow-on-hover'}
                                        onClick={ () => this.setState({ showApp: false }) }
                                    >
                                        <Icon src={'assets/icons/log-out.png'}/>
                                        <button 
                                            className='link-button'
                                            style={{ margin: '5px' }}
                                        >Log-out</button>
                                    </Column>

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
                                            <OverLappedChildren width='80%'>             

                                                <Route path={ "/other-user/:id"} render={(props) => {
                                                    return (
                                                        <OtherProfile 
                                                            key={props.match.url}
                                                            match={props.match}
                                                            history={props.history}
                                                        />
                                                    );
                                                }}/> 

                                                <Route exact path={'/private-chat/:id'} render={(props) => {
                                                    return (
                                                        <PrivateChat activeChat={props.match}/>
                                                    );
                                                }}/> 

                                                <Route exact path={'/private-chat/'} render={() => {
                                                    return (
                                                        <PrivateChat/>
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
                                                        <Friends goToChat={ (id) => {
                                                            this.setState({ privateChatUser: id }); 
                                                            this.makeNextToRender(`/private-chat`);
                                                        	}
                                                        }/>
                                                    );
                                                }}/> 

                                                <Route exact path={'/users-online'} render={() => {
                                                    return (
                                                        <UsersOnline/>
                                                    );
                                                }}/>

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
                imageUrl: res.data.pic_url || "/assets/images/love-avatar.jpg"
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
            case '/users-online':
                this.setState({
                    locations: {
                        ...locations,
                        usersOnline: 'on'
                    }
                });
                break;

				
            default:
                if  ( location.includes('other-user') ){
                    this.setState({
                        locations: {
                            ...locations,
                            otherUser: 'on'
                        }
                    });
                }
                if( location.includes( 'private-chat' )){
                    this.setState({
                        locations: {
                            ...locations,
                            privateChat: 'on'
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
        console.log('Make next to render', location);
        console.log(location.substring('private-chat'));
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
            case '/users-online':
                this.setState({
                    locations: {
                        ...locations,
                        usersOnline: 'next'
                    }
                });
                break;
				
            default:
                console.log('in here');
                if  (location.includes('other-user')){
                    console.log('in other user');
                    locations.otherUser = 'next';
                    this.setState({
                        locations: locations
                    });
                }
                if( location.includes('private-chat')){
                    console.log('set state');
                    this.setState({
                        locations: {
                            ...locations,
                            privateChat: 'next'
                        }
                    });
                } 
        }
    }

    renderNext(history){
        var locations = this.state.locations;
        
        for (const location in locations) {
            const value = locations[location];
            if (value == 'next') {
                Object.keys(this.state.locations).map((location)=>{
                    locations[location] = '';
                });
                locations[location] = 'on';
                console.log('The location in render next is', location);
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
                    case 'usersOnline':
                        history.push('/users-online');
                        break;
                    case 'privateChat':
                        var renderUrl = this.state.privateChatUser ? `/private-chat/${this.state.privateChatUser}` : '/private-chat';
                        history.push(renderUrl);
                        break;	
                    default	:
                        if( location == 'privateChat'){
                            history.push('/private-chat');
                        } else {
                            history.push('/');
                        }
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

