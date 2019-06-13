
import React from 'react';

export class OverLappedChildren extends React.Component{

    constructor (props) {
        super(props);
        this.children = props.children;
        this.style = {
            position: "absolute",
            transform: props.transform || "translateX(-50%)",
            width: props.width,
        };
    }
    render(){
        return (
            <div style={this.style} className={'overLappedChildren'}>
                {this.children}
            </div>
        );
    }
}