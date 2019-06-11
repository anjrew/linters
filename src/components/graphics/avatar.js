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
            minHeight: props.height || '100px',
            minWidth: props.width || '100px',
            borderRadius: props.borderRadius || '50%',
            borderColor: props.borderColor,
            borderStyle: props.borderStyle,
            objectFit: 'cover',
            overflow: 'hidden'
        };
    }
                    
    render(){
        return (
            <img 
                key={this.props.imageUrl || this.props.pic_url ||'/assets/images/nerd-avatar.png'}
                className='avatar'
                style={this.style}
                src={this.props.imageUrl || this.props.pic_url ||'/assets/images/nerd-avatar.png'} 
                alt={this.props.description} 
                onClick={this.props.onClick}/>
        );
    }
}