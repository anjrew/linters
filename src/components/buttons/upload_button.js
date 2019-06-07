import React from 'react';

export class UploadButton extends React.Component{

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
            padding: '8px 20px',
            borderRadius: '8px',
            fontSize: '20px',
            fontWeight: 'bold',
        },
        this.input = {
            fontSize: '100px',
            position: 'absolute',
            left: '0',
            top: '0',
            opacity: '0'
        };
    }

    render(){
        return (
            <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input 
                    id="upload-photo"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={e => this.props.handleChange(e)}
                />
            </div>
        );
    }
}