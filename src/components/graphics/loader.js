import React from 'react';
import { Container } from '../boxes/container';
import { CircularProgressIndicator } from '../progress_indicators/circular_progress_indicator';

export class Loader extends React.Component{
                    
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
            <Container 
                padding="40px"
                position="fixed"
                width='100vw'
                height='100vh'
                backgroundColor= 'rgba(0,0,0,0.20)'
                zIndex="999">
                <CircularProgressIndicator/> 
            </Container>
        );
    }
}