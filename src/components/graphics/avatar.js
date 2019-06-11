import React from 'react';
import Image from 'react-shimmer';

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
        const shimmerWidth = this.props.width ? Number(this.props.width.slice(0,-2)) * 1 : 100 ;
        const shimmerheight = this.props.height? Number(this.props.height.slice(0,-2)) * 1: 100 ;

        return (
            <Image 
                key={this.props.imageUrl || this.props.pic_url ||'/assets/images/nerd-avatar.png'}
                className='avatar'
                width={shimmerWidth} 
                height={shimmerheight}
                style={this.style}
                src={this.props.imageUrl || this.props.pic_url ||'/assets/images/nerd-avatar.png'} 
                alt={this.props.description} 
                onClick={this.props.onClick}/>
        );
    }

    componentWillUnmount(){
        this.style = null;
    }
}