import React from 'react';

export class Row extends React.Component{

    constructor (props) {
        super(props);
        this.style = { 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: props.alignItems || 'center',
            width: props.width || '100%',
            backgroundColor: props.backgroundColor,
            padding: props.padding,
            placeContent: props.placeContent || 'center space-between',
            margin: props.margin
        };
    }

    render(){
        return (
            <div 
                id={this.props.id}
                className="row" 
                style={this.style}
                onClick={this.props.onClick}
            >
                { this.props.children }
            </div>
        );
    }
}