import React from 'react';

export default class TextField extends React.Component{
    constructor (props) {
        super(props);
    }

    render(){
        return (
            <div className="text-field">
                <h3>{this.label}</h3>
                <input
                    type={this.props.inputType} 
                    name={this.props.databaseId} 
                    id={this.props.id}
                    placeholder={this.props.placeholder} 
                    value={this.props.value} 
                    autoComplete="true"
                    required = {this.props.required}
                    onChange={e => this.props.handleChange(e)}/>
            </div>
        );
    }
}