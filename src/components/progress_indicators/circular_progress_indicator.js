import React from 'react';

export class CircularProgressIndicator extends React.Component{

    render(){
        return (
            <div className="lds-ring"  src='/assets/images/nerd-logo.png'>
                <div></div><div></div><div></div><div></div>
            </div>
        );
    }
}