import React from 'react';

export class Container extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            display: props.display || 'flex',
            flexDirection: props.flexDirection || 'column',
            justifyContent: props.justifyContent || 'center',
            alignItems: props.alignItems || 'center',
            alignContent: props.alignContent || 'center',
            alignSelf: props.alignSelf || 'center',
            borderRadius: props.borderRadius,
            borderWidth: props.borderWidth,
            borderColor: props.borderColor,
            borderStyle: props.borderStyle,
            height: props.height,
            width: props.width,
            padding: props.padding, 
            margin: props.margin,
            boxShadow: props.boxShadow && "1px 0px 3px 1px rgba(0,0,0,0.75)"
        };
    }
    render(){
        return (
            <div style={this.style}>
                {this.props.children}
            </div>
        );
    }
}