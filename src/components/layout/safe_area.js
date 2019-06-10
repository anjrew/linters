import React from 'react';

export class SafeArea extends React.Component{

    constructor (props) {
        super(props);
        this.style = {
            padding: props.padding || '20px',
            alignItems: 'center',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
        };
    }
    render(){
        return (
            <div style={this.style} className="safe-area">
                {this.props.children}
            </div>
        );
    }
}