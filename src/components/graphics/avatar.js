import React from 'react';
import Image from 'react-shimmer';

export class Avatar extends React.Component{
                    
    constructor (props) {
        super(props);
        this.style = props.style ? props.style : { 
            backgroundColor: props.backgroundColor ||  'white',
            padding: props.padding || '5px',
            margin: props.margin || '5px',
            height: props.height || '60px',
            width: props.width || '60px',
            minHeight: props.height || '60px',
            minWidth: props.width || '60px',
            borderRadius: props.borderRadius || '50%',
            borderColor: props.borderColor,
            borderStyle: props.borderStyle || 'groove',
            boxShadow: props.boxShadow,
            objectFit: 'cover',
            overflow: 'hidden',
        };
    }
                    
    render(){
        const shimmerWidth = this.props.width ? Number(this.props.width.slice(0,-2)) * 1 : 100 ;
        const shimmerheight = this.props.height? Number(this.props.height.slice(0,-2)) * 1: 100 ;

        return (
            <Image 
                key={this.props.imageUrl || this.props.pic_url ||'/assets/images/love-avatar.jpg'}
                className='avatar'
                width={shimmerWidth} 
                height={shimmerheight}
                style={this.style}
                src={this.props.imageUrl || this.props.pic_url ||'/assets/images/love-avatar.jpg'} 
                alt={this.props.description} 
                onClick={this.props.onClick}/>
        );
    }

    componentWillUnmount(){
        this.style = null;
    }
}