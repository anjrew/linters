import React from 'react';

export class TextField extends React.Component{
    constructor (props) {
        super(props);
        this.inputType = props.inputType;
        this.databaseId = props.id;
        this.id = props.uniqueId;
        this.label = props.label;
        this.placeholder = props.placeholder;
        this.value =props.value;
        this.required = props.required;
        this.handleChange = props.handleChange;    }

    render(){
        return (
            <div className="text-field">
                <h3>{this.label}</h3>
                <input
                    type={this.inputType} 
                    name={this.databaseId} 
                    id={this.id}
                    placeholder={this.placeholder} 
                    value={this.value} 
                    autoComplete="true"
                    required = {this.required}
                    onChange={e => this.handleChange(e)}/>
            </div>
        );
    }
}