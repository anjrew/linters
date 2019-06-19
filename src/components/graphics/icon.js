import React from 'react';
import { CoverageMap } from 'istanbul-lib-coverage';

export class Icon extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            height: props.height || '30px',
            width: props.height || '30px',
            objectFit: CoverageMap,
            margin: props.margin || '5px',
        };
    }

    render(){
        return (
            <img style={ this.style } src={ this.props.src }/>
        );
    }
}