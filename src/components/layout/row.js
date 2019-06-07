import React from 'react';

export class Row extends React.Component{

    constructor (props) {
        super(props);
        this.style = { 
            display: 'flex', 
            flexDirection: 'row',
            alignItems: props.alignItems || 'center',
            alignContent: props.alignContent || 'center',
            justifyContent: props.justifyContent || 'space-between',
            width: props.width || '100%',
            backgroundColor: props.backgroundColor,
            padding: props.padding,
            placeContent: props.placeContent || 'center',
            funkyChicken: '100px'
        };
    
    }

    render(){
        console.log(this.style);
        return (
            <div className="row" style={this.style}>
                { this.props.children }
            </div>
        );
    }
}