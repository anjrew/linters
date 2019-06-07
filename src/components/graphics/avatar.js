import React from 'react';

export class Avatar extends React.Component{
                    
    constructor (props) {
        super(props);
        this.style = props.style ? props.style : { 
            backgroundColor: props.backgroundColor ||  'white',
            padding: props.padding || '5px',
            margin: props.margin || '5px',
            height: props.height || '100px',
            width: props.width || '100px',
            borderRadius: props.borderRadius || '50%',
            objectFit: 'cover'
        };
    }
                    
    render(){
        return (
            <img 
                style={this.style} 
                src={this.props.imageUrl || this.props.pic_url ||'/assets/images/nerd-avatar.png'} 
                alt={this.props.description} 
                onClick={this.props.onClick}/>
        );
    }
}