import React from 'react';

export class BrowseButton extends React.Component{

    constructor (props) {
        super(props);
        this.handleClick = props.handleClick;
        this.label = props.label;

        this.wrapper = {
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-block'
        },
        this.button = {
            border: '2px solid gray',
            color: 'gray',
            backgroundColor: 'white',
            padding: '3px 10px',
            borderRadius: '8px',
            fontSize: '20px',
            fontWeight: 'bold',

        },
        this.input = {
            fontSize: '30px',
            position: 'absolute',
            left: '0',
            top: '0',
            opacity: '0'
        };
    }

    render(){
        return (
            <div style={this.wrapper} className='Upload button'>
                <button className='link-button'>Browse</button>
                <input 
                    id="upload-photo"
                    style={this.input}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={e => this.props.onChange(e)}
                />
            </div>
        );
    }
}