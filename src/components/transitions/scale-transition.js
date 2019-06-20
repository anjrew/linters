import React from 'react';
import { CSSTransition } from 'react-transition-group';


export class ScaleTransition extends React.Component{

    render(){
        return (
            <CSSTransition
                in={this.props.in}
                timeout= {450}
                classNames="scale"
                onEnter={this.props.onEnter}
                onExited={this.props.onExited}
                unmountOnExit
            > 
                {this.props.children}
            </CSSTransition>
        );
    }
}