import React from 'react';
import { CoverageMap } from 'istanbul-lib-coverage';

export class Icon extends React.Component{

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
            <img style={ this.style } src={this.props.src}/>
        );
    }
}