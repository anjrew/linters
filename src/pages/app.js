import React from 'react';
import axios from '../react_utils/axios';
import routes from '../react_utils/react_routes';
import { BrowserRouter, Switch, Route , Redirect} from "react-router-dom";
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
import { Profile } from '../components/modules/profile';
import { OtherProfile } from '../pages/other_profile';
import { FindPeople } from '../components/modules/find_people';
import { OverLappedChildren} from '../components/layout/overlapped_children';
import { CircularProgressIndicator } from '../components/progress_indicators/circular_progress_indicator';
import { ErrorMessage } from '../components/text/error_message';


export class App extends React.Component{

    constructor(){
        super();
        this.state = {
            error: null,
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
            <BrowserRouter>
                <Route render= {({location}) => {
                    return(
                        <Column>
                            <Row id="header" backgroundColor={ 'red' } justifyContent='flex-start'>
                                <Logo height={ '100px' } width={ "100px" }/>
                                <Link className='link-button' to={'/users'}>Find users</Link>
                                <Link className='link-button' to={'/'}>My profile</Link>
                                <a className='link-button' href='/api/logout'>Logout</a>

                                <Avatar backgroundColor={ 'white' } onClick={ this.avatarClicked } imageUrl={this.state.user.imageUrl}/>
                            </Row>

                            <CSSTransition in={!!this.state.error} timeout={300} classNames="scale" unmountOnExit>
                                <ErrorMessage> </ErrorMessage>
                            </CSSTransition>

                            <SafeArea>
                    
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.pathname}
                                        timeout={{ enter: 300, exit: 300 }}
                                        classNames="fade"
                                        onEnter={() => console.log('In onEnter app')}
                                        onEntering={() => console.log('In onEntering app')}
                                        onEntered={() => console.log('In onEntered app')}
                                        onExit={() => console.log('In onExit app')}
                                        onExiting={() => console.log('In onExiting app')}
                                        onExited={() => console.log('In onExited app')}
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

                                            </Switch>
                                        </OverLappedChildren>            
                                    </CSSTransition>
                                </TransitionGroup>
                          

                                <CSSTransition in={this.state.uploaderVisible} timeout={300} classNames="scale" unmountOnExit>
                                    <Uploader 
                                        dismissLoader={ this.dismissLoader } 
                                        changeImage={this.changeImage}
                                    />
                                </CSSTransition>

                            </SafeArea>
                        </Column>
                    );}} />
            </BrowserRouter>

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