import React from 'react';
import { CoverageMap } from 'istanbul-lib-coverage';

export class Logo extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            height: props.height || '200px',
            width: props.height || '200px',
            objectFit: CoverageMap,
            margin: props.margin || '5px',
        };
    }

    render(){
        return (
            <img style={ this.style }  src='/assets/images/heart.jpg'/>
        );
    }
}