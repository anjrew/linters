import React from 'react';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { UserProfile } from '../data/user_profile';
import { Link } from 'react-router-dom';

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
import { FindPeople } from '../components/modules/find_people';
import { Profile } from '../components/modules/profile';
import { OtherProfile } from '../pages/other_profile';
import Friends from '../pages/friends';

export class App extends React.Component{

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
            <BrowserRouter>
                <Route render= {({location}) => {

                    if (location.pathname == '/users' && this.state.showProfileLink && !this.state.animatingMenu) {
                        this.setState({showProfileLink: true,  showFindPeopleLink: false });
                    } 
                    else if (location.pathname == '/' && this.state.showProfileLink && !this.state.animatingMenu){
                        this.setState({showFindPeopleLink: true, showProfileLink: false, });
                    }

                    return(
                        <Column>
                            <CSSTransition in={this.state.uploaderVisible} timeout={300} classNames="fade" unmountOnExit>
                                <Container 
                                    padding="40px"
                                    position="fixed"
                                    width='100vw'
                                    height='100vh'
                                    backgroundColor= 'rgba(0,0,0,0.50)'
                                    zIndex="800">
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
                                    in={location.pathname != '/users' }
                                    timeout={{ enter: 300, exit: 300 }}
                                    classNames="scale"
                                    onEnter={ ()=> this.setState({ animatingMenu: true })}
                                    onEntered={ () => this.setState({ animatingMenu: false })}
                                    // onExited={ ()=> this.setState({ animatingMenu: false })}
                                    unmountOnExit>
                                    <Link className='link-button' to={'/users'}>Find users</Link>
                                </CSSTransition>

                                <CSSTransition
                                    key={'home-css'}
                                    in={location.pathname != '/'}
                                    timeout={{ enter: 300, exit: 300 }}
                                    classNames="scale"
                                    onEnter={ ()=> this.setState({ animatingMenu: true })}
                                    onExited={ ()=> this.setState({ animatingMenu: false })}
                                    unmountOnExit>
                                    <Link className='link-button' to={'/'}>My profile</Link>
                                </CSSTransition>

                                <CSSTransition
                                    key={'friends-css'}
                                    in={location.pathname != '/friends'}
                                    timeout={{ enter: 300, exit: 300 }}
                                    classNames="scale"
                                    onEnter={ ()=> this.setState({ animatingMenu: true })}
                                    onExited={ ()=> this.setState({ animatingMenu: false })}
                                    unmountOnExit>
                                    <Link className='link-button' to={'/friends'}>Friends</Link>
                                </CSSTransition>

                                           
                                <a className='link-button' href='/api/logout'>Logout</a>

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
                user:userProfile
            });
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
}