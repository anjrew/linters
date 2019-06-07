import React from 'react';

export class CenteredColumn extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            padding: props.padding,
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            flexWrap: 'wrap',
            alignContent: 'center',
            width: props.width
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

