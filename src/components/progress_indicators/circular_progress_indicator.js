import React from 'react';

export class CircularProgressIndicator extends React.Component{

    render(){
        console.log('Rendering Circular progress indicator ', this);
        return (
            <div className="lds-ring"  src='/assets/images/nerd-logo.png'>
                <div></div><div></div><div></div><div></div>
            </div>
        );
    }
}