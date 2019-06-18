import React from 'react';

export class Container extends React.Component{

    constructor (props) {
        super(props);
        console.log('Container props are ', props);
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
            maxWidth: props.maxWidth,
            margin: props.margin,
            boxShadow: props.boxShadow && "1px 0px 3px 1px rgba(0,0,0,0.75)",
            backgroundColor: props.backgroundColor,
            position: props.position,
            opacity: props.opacity,
            top: props.top,
            zIndex: props.zIndex,
        };
        console.log('Container style is ', this.style);
    }

    render(){
        return (
            <div id={this.props.id} style={this.style}>
                {this.props.children}
            </div>
        );
    }
}