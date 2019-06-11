import React from 'react';
import Routes from '../react_utils/react_routes';
import { CSSTransition, TransitionGroup,} from 'react-transition-group';
import ReactCardFlip from 'react-card-flip';


// Components
import { Logo } from '../components/graphics/logo';
import { SafeArea } from '../components/layout/safe_area';
import { Column } from '../components/layout/column';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Registration } from '../pages/registration';
import { Login } from '../pages/login';
import { OverLappedChildren } from '../components/layout/overlapped_children';

export class Welcome extends React.Component{

    constructor() {
        super();
        this.state = {
            isFlipped: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render(){
        return (
            <SafeArea>
                <Column>
                    <h2>Welcome to the Nerd Network</h2>
                    <Logo margin={'30px'}/>
                    <HashRouter>
                        <Route render= {({location}) => {
                            console.log(location);
                            return(

                                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                                    <Registration 
                                        key="front"
                                        onClick={this.handleClick}/>
        
                            
                                    <Login 
                                        key="back"
                                        onClick={this.handleClick}/>
                                </ReactCardFlip>

                                // <TransitionGroup>
                                //     <CSSTransition
                                //         key={location.pathname}
                                //         timeout= {450}
                                //         classNames="fade"
                                //     >   
                                //         <OverLappedChildren>             
                                //             <Switch location={location}>
                                //                 <Route exact path={ Routes.home } component={ Registration }/>
                                //                 <Route path={ Routes.login } component={ Login }/>
                                //             </Switch>
                                //         </OverLappedChildren>             
                                //     </CSSTransition>
                                // </TransitionGroup>
                            );  
                        }} />
                    </HashRouter>
                </Column>
            </SafeArea>
        );
    }
}