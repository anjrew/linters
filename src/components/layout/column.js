import React from 'react';

export class Column extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            padding: props.padding,
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: props.alignItems || 'center',
            alignSelf: props.alignSelf || 'center',
            flexWrap: 'wrap',
            alignContent: props.alignContent || 'center',
            width: props.width || '100%',
            border: props.border,
            borderRadius: props.borderRadius,
            margin: props.margin,
            backgroundColor: props.backgroundColor,
            placeContent: props.placeContent || 'center center',
            boxShadow: props.boxShadow
        };
    }
    
    render(){
        return (
            <div className="column" style={this.style} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

