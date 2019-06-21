
import React from 'react';

export class OverLappedChildren extends React.Component{

    constructor (props) {
        super(props);
        this.children = props.children;
    }
    render(){
        return (
            <div style={{
                position: "absolute",
                transform: this.props.transform || "translateX(-50%)",
                width: this.props.width,
            }} className={'overLappedChildren'}>
                {this.children}
            </div>
        );
    }
}