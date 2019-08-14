import React from 'react';

export default class TextField extends React.Component{
    constructor (props) {
        super(props);
    }

    render(){
        const props = this.props;
        return (
            <div className="text-field">
                <h3>{props.label}</h3>
                <input
                    type={this.props.inputType} 
                    name={props.id} 
                    id={props.id}
                    placeholder={this.props.placeholder} 
                    value={this.props.value} 
                    autoComplete="true"
                    required = {this.props.required}
                    onChange={e => this.props.handleChange(e)}/>
            </div>
        );
    }
}