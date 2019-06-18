

import React from 'react';
import { CoverageMap } from 'istanbul-lib-coverage';
import { CSSTransition } from "react-transition-group";
import { Column } from '../layout/column';
import { Icon } from '../graphics/icon';


export class NavBarButton extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            height: props.height || '50px',
            width: props.height || '50px',
            objectFit: CoverageMap,
            margin: props.margin || '5px',
        };
    }

    render(){
        return (
            <CSSTransition
                key={this.props.key}
                in={this.props.in}
                timeout={{ enter: 500, exit: 500 }}
                classNames="scale"
                // onExit={ this.props.renderNext}
                onExited={ this.props.renderNext}
                unmountOnExit>
                <Column 
                    width={'unset'} 
                    onClick={ this.props.makeNextToRender }
                >
                    <Icon src={this.props.iconSrc}/>
                    <button 
                        className='link-button'
                        style={{ margin: '5px' }}
                    >{this.props.label}</button>
                </Column>
            </CSSTransition>
        );
    }
}



