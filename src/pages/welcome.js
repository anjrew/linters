import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactCardFlip from 'react-card-flip';


// Components
import { Column } from '../components/layout/column';
import { HashRouter, Route,} from 'react-router-dom';
import { Registration } from '../pages/registration';
import { Login } from '../pages/login';
import { Container } from '../components/boxes/container';

export class Welcome extends React.Component{

    constructor() {
        super();
        this.state = {
            isFlipped: true,
            visable: false,
            mainElementTop: 0,
            loggingIn: false
        };
        this.mainElement = React.createRef();
        this.title = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(history) {
        this.state.isFlipped ? history.push('/register') : history.push('/login');
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    componentDidMount(){
        const initaialRoute = window.location.hash;
        const register = initaialRoute.indexOf('register')  >= 0;
        this.setState({
            visable: true,
            isFlipped: !register,
            heightSet: false
        });
    }
	
    componentDidUpdate(){
        if (!this.state.heightSet) {
            const windowHeight = window.innerHeight;
            console.log('The main title is' , this.mainElement.current);
            const mainElementHeight = this.title.current.clientHeight;
            const mainElementTop = (windowHeight/ 2) - mainElementHeight;
            this.setState({
                mainElementTop: mainElementTop + 'px',
                heightSet: true
            });
        }
    }

    render(){
        return (
            <React.Fragment>
                <CSSTransition 
                    in={this.state.visable} 
                    timeout={300} 
                    classNames="fade" 
                    unmountOnExit>
                    <img 
                        src= '/assets/images/verdy.jpg' 
                        style={{
                            position: "fixed",
                            width: '100vw',
                            height: '100vh',
                            zIndex: "-2",
                            top: '0px',
                            left: '0px'
                        }}        
                    />
                </CSSTransition>

                <CSSTransition 
                    in={this.state.visable} 
                    timeout={300} classNames="fade" 
                    unmountOnExit>
                    <Container 
                        padding="40px"
                        position="fixed"
                        width='100vw'
                        height='100vh'
                        backgroundColor= 'rgba(255,255,255,0.90)'
                        zIndex="-1"
                        top='0px'>
                    </Container>
                </CSSTransition>

                <CSSTransition
                    key='Welcome'
                    timeout= {450}
                    classNames="fade"
                    in={this.state.visable}
                    onExited={()=> location.replace('/')}
                    unmountOnExit
                > 
                
                    <Column 
                        position={ 'absolute' } 
                        top={ this.state.mainElementTop }
                        referance={ this.mainElement }
                    >

                        <div
                            ref={ this.title } 
                        >
                            <h4>Welcome to</h4>
                            <h1 
                                
                                style={
                                    {fontSize: '100px'}
                                }>Laissez-faire</h1>
                            <h3>The Free Love Network</h3>
                        </div>
							
                        <HashRouter>
                            <Route render= {({location, history}) => {
                                console.log(location);
                                return(

                                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                                        <Registration
                                            key="front"
                                            onClick={() => this.handleClick(history)}/>
                                    
                                        <Login 
                                            key="back"
                                            onClick={ () => this.handleClick(history)}
                                            onLogin={() => {
                                                this.setState({
                                                    visable: false,
                                                    loggingIn: true
                                                });
                                            }}/>
                                    </ReactCardFlip>
                                );  
                            }} />
                        </HashRouter>
                    </Column>
                </CSSTransition>
            </React.Fragment>
        );
    }
}