import React from 'react';

export class Padding extends React.Component{

    constructor (props) {
        super(props);
        this.children = props.children;
        this.style = {
            padding: props.padding
        };
    }

    render(){
        return (
            <div style={this.style}>
                {this.children}
            </div>
        );
    }
}