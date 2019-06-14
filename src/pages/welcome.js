import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactCardFlip from 'react-card-flip';


// Components
import { Logo } from '../components/graphics/logo';
import { SafeArea } from '../components/layout/safe_area';
import { Column } from '../components/layout/column';
import { HashRouter, Route,} from 'react-router-dom';
import { Registration } from '../pages/registration';
import { Login } from '../pages/login';

export class Welcome extends React.Component{

    constructor() {
        super();
        this.state = {
            isFlipped: true,
            visable: false
        };
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
            isFlipped: !register
        });
    }

    render(){
        return (
            <CSSTransition
                key='Welcome'
                timeout= {450}
                classNames="fade"
                in={this.state.visable}
                unmountOnExit
            > 
                <SafeArea>
                    <Column>
                        <h2>Welcome to the Nerd Network</h2>
                        <Logo margin={'30px'}/>
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
                                            onLogin={() => this.setState({visable: false})}/>
                                    </ReactCardFlip>
                                );  
                            }} />
                        </HashRouter>
                    </Column>
                </SafeArea>
            </CSSTransition>

        );
    }
}