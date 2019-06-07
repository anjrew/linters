
import React from 'react';

export class OverLappedChildren extends React.Component{

    constructor (props) {
        super(props);
        this.children = props.children;
        this.style = {
            position: "absolute",
            transform: "translateX(-50%)"
        };
    }
    render(){
        return (
            <div style={this.style} className={'Column'}>
                {this.children}
            </div>
        );
    }
}