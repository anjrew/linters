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
        this.scrollInitial= null;
        this.canScroll = false;
        this.mainElement = React.createRef();
        this.title = React.createRef();
        this.elemRef = React.createRef();
        this.backgroundRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleClick(history) {
        this.canScroll = true;
        this.state.isFlipped ? history.push('/register') : history.push('/login');
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    componentDidMount(){
        this.elemRef.current.scrollTop = 0+ 'px';
        window.addEventListener('scroll', this.handleScroll);        
        const initaialRoute = window.location.hash;
        const register = initaialRoute.indexOf('register')  >= 0;
        this.setState({
            visable: true,
            isFlipped: !register,
            heightSet: false
        });
    }
	
    componentDidUpdate(){
        const currentTop = this.backgroundRef.current.offsetTop;
        this.elemRef.current.scrollTop = 0+ 'px';

        this.backgroundRef.current.style.top = currentTop +'px';
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
        if (this.canScroll) {
            this.canScroll = false;
            this.scrollToBottom();
        }
    }
	
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    render(){
        return (
            <div ref={this.elemRef}>
                <CSSTransition 
                    in={this.state.visable} 
                    timeout={300} 
                    classNames="fade"
                    unmountOnExit>
                    <img 
                        ref={this.backgroundRef}
                        src= '/assets/images/verdy.jpg' 
                        style={{
                            position: "fixed",
                            width: '100vw',
                            height: '130vh',
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
                        <div ref={ this.title } >
                            <h4>Welcome to</h4>
                            <h1 style={
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
            </div>
        );
    }
	
    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
	  }
	
    scrollToBottom() {
        if (this.elemRef && this.elemRef.current){
            this.elemRef.current.scrollTop =
            this.elemRef.current.scrollHeight +
            this.elemRef.current.offsetHeight;
        }
    }
	
    handleScroll(e){
        const currentTop = this.backgroundRef.current.offsetTop;
        if ( !this.scrollInitial ){
            this.backgroundRef.current.style.top = currentTop + 30;
            this.scrollInitial = e.target.scrollingElement.scrollTop;
        }else {
            const scrollTop = e.target.scrollingElement.scrollTop;
            const newBackgroundBottom = scrollTop - this.scrollInitial;
            var newTop;
            if (newBackgroundBottom > 0) {
                newTop = currentTop - newBackgroundBottom;
            } else {
                newTop = currentTop + newBackgroundBottom;
                newTop = -newTop;
            }
            if (currentTop == 0 ){
                this.backgroundRef.current.style.top = currentTop + 30;
                this.scrollInitial = e.target.scrollingElement.scrollTop;
            } 
            if (newTop <= 1){ 
                this.backgroundRef.current.style.top = newTop/2 +'px';
            }
        }
    }
}