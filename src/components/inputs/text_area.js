
import React from 'react';

export class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            padding: props.padding || '20px',
            borderRadius: props.borderRadius || '10px',
            width: props.width
        };
    }

    render(){
        return (
            <textarea
                style={this.style}
                type='text'
                name= {this.props.name}
                value={this.props.value}
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete || 'true'}
                onChange={e => this.props.handleChange(e)}
            />
        );
    }
}