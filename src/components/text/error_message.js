import React from 'react';


export class ErrorMessage extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            color: "red",
            padding: "20px"
        };
    }

    render(){
        return (

            <h3 style={this.style}>{this.props.children}</h3>

        );
    }
}